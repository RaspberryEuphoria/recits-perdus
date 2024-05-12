'use client';

import { useTranslations } from 'next-intl';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { AvatarModal } from '@/components/AvatarModal';
import { Button } from '@/components/DesignSystem/Button';
import { Row } from '@/components/DesignSystem/Row';
import { MovesProps } from '@/components/Moves/Moves';
import DownArrowIcon from '@/public/images/icons/down_arrow.svg';
import ThumbnailIcon from '@/public/images/icons/thumbnail.svg';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { formatPostContent } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';
import { Moves as MoveId, Post, SkillId, Stat } from '@/utils/types/scenario';

import * as Styled from './styled';

type DialogTextareaProps = {
  scenarioId: string;
  nextPoster: Character;
  content: string;
  postId: number | null;
  maxLength: number;
  onContentChange: (content: string) => void;
  onTextareaSubmit: () => void;
  renderMoves: (
    onMovePicked: (move: Move | null) => void,
    onBurnCheck: (hasMomentumBurn: boolean) => void,
  ) => ReactElement<MovesProps>;
};

export type Move = {
  id: MoveId;
  meta?: Record<string, string | number | boolean | SkillId | Stat | undefined>;
};

type Illustration = {
  crop: { x: number; y: number; width: number; height: number };
  base64Image: string;
};

enum Mode {
  NEW = 'new',
  EDIT = 'edit',
}
let socket: Socket;

export function DialogTextarea({
  scenarioId,
  nextPoster: initialNextPoster,
  content: initialContent,
  postId,
  maxLength,
  onContentChange,
  onTextareaSubmit,
  renderMoves,
}: DialogTextareaProps) {
  const t = useTranslations('scenarios');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [nextPoster, setNextPoster] = useState<Character>(initialNextPoster);
  const [content, setContent] = useState<string>(initialContent);
  const [currentMove, setCurrentMove] = useState<Move | null>(null);
  const [hasMomentumBurn, sethasMomentumBurn] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isIllustrationModalOpen, setIsIllustrationModalOpen] = useState(false);
  const [illustration, setIllustration] = useState<Illustration | null>(null);
  const [illustrationPreview, setIllustrationPreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const mode = postId ? Mode.EDIT : Mode.NEW;
  const currentLength = content?.length || 0;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.substring(0, maxLength));
  };

  const computeFormErrors = useCallback(() => {
    const isMoveValid = currentMove ? currentMove?.meta?.isValid : true;
    const errors = [];

    if (!isMoveValid) errors.push('invalid-move');
    if (currentLength > maxLength) errors.push('too-long');
    if (!currentLength) errors.push('empty');

    setFormErrors(errors);
  }, [currentLength, currentMove, maxLength]);

  const submit = () => {
    if (formErrors.length) return;

    setHasSubmitted(true);

    if (mode === Mode.NEW) {
      addPost();
    } else {
      editPost();
    }
  };

  const addPost = async () => {
    if (!content) return;

    const move = currentMove
      ? {
          ...currentMove,
          meta: { ...currentMove.meta, hasMomentumBurn },
        }
      : null;

    const dialog = {
      characterId: nextPoster.id,
      content,
      illustration,
      action: {
        move,
      },
    };

    const id = (scenarioId as string).split('-')[0];
    const newDialog = await httpBffClient.post<Post>(`/scenario/${id}/post`, dialog);

    if (isHttpError(newDialog)) {
      console.error(`There was an error while adding a new dialog: ${newDialog.message}`);
      return;
    }

    socket.emit('post-new-dialog', newDialog);

    if (dialog.action.move) socket.emit('post-new-move');
    if (newDialog.nextPoster) setNextPoster(newDialog.nextPoster);

    onTextareaSubmit();
  };

  const editPost = async () => {
    if (!content || !postId) return;

    const dialog = {
      content: content,
    };

    const id = (scenarioId as string).split('-')[0];
    const updatedDialog = await httpBffClient.put<Post>(`/scenario/${id}/post/${postId}`, dialog);

    if (isHttpError(updatedDialog)) {
      throw new Error(
        `There was an error while updating the dialog ${postId}: ${updatedDialog.message}`,
      );
    }

    socket.emit('edit-dialog', updatedDialog);

    onTextareaSubmit();
  };

  const onMovePicked = (move: Move | null) => {
    setCurrentMove(move);
  };

  const onBurnCheck = (hasMomentumBurn: boolean) => {
    sethasMomentumBurn(hasMomentumBurn);
  };

  const openIllustrationModal = () => {
    setIsIllustrationModalOpen(true);
  };

  const closeIllustrationModal = () => {
    setIsIllustrationModalOpen(false);
  };

  const saveIllustration = async (
    crop: { x: number; y: number; width: number; height: number },
    base64Image: string,
  ) => {
    setIllustration({ crop, base64Image });

    const illustrationPreview = await httpBffClient.post<{ croppedImage: string }>(`/image-crop`, {
      crop,
      base64Image,
      targetWidth: 680,
      targetHeight: 230,
    });

    if (!isHttpError(illustrationPreview)) {
      setIllustrationPreview(illustrationPreview.croppedImage);
    }
  };

  const moves = renderMoves(onMovePicked, onBurnCheck);

  const socketInitializer = async () => {
    await httpBffClient.get('/init-socket');

    socket = io(`${process.env.NEXT_PUBLIC_BFF_PREFIX_URL}`, {
      path: '/api/socket',
      transports: ['polling'],
      withCredentials: true,
    });
  };

  useEffect(() => {
    socketInitializer();
    textareaRef.current?.focus();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const handleTextareaBlur = () => {
    onContentChange(content);
    computeFormErrors();
  };

  const togglePreview = () => {
    setShowPreview((prev) => !prev);
  };

  useEffect(() => {
    computeFormErrors();
  }, [currentMove, computeFormErrors]);

  return (
    <>
      <AvatarModal
        isOpen={isIllustrationModalOpen}
        closeAvatarModal={closeIllustrationModal}
        onAvatarSave={saveIllustration}
        targetWidth={680}
        targetHeight={230}
        initialImage={illustrationPreview}
      />

      {mode === Mode.EDIT && (
        <Row>
          <Styled.BackButton onClick={onTextareaSubmit}>
            <DownArrowIcon /> {t(`en-cours.textarea.edit.cancel-button.label`)}
          </Styled.BackButton>
        </Row>
      )}

      <Styled.GameSection>
        <Styled.Help>
          {t(`en-cours.textarea.${mode}.help.what-to-do.title`)}
          <p>{t(`en-cours.textarea.${mode}.help.what-to-do.subtitle`)}</p>
        </Styled.Help>

        <Styled.TextareaBar>
          <Button onClick={togglePreview} variant="small" outline>
            {t(`en-cours.textarea.${showPreview ? 'hide' : 'show'}-preview-button.label`)}
          </Button>

          {mode === Mode.NEW && (
            <Button onClick={openIllustrationModal} variant="small" outline={!illustration}>
              <ThumbnailIcon />
              {t('en-cours.textarea.new.illustration-button.label')}
            </Button>
          )}
        </Styled.TextareaBar>

        {showPreview ? (
          <>
            <Styled.Preview
              dangerouslySetInnerHTML={{ __html: formatPostContent(content) }}
              color={initialNextPoster.textColor}
            />
            {illustrationPreview && (
              <Styled.DialogIllustrationContainer>
                <Styled.DialogIllustration
                  src={illustrationPreview}
                  alt="Illustration"
                  width={680}
                  height={230}
                  quality={100}
                />
              </Styled.DialogIllustrationContainer>
            )}
          </>
        ) : (
          <Styled.Textarea
            ref={textareaRef}
            placeholder=""
            onChange={handleTextareaChange}
            value={content}
            onBlur={handleTextareaBlur}
          ></Styled.Textarea>
        )}

        <Styled.TextareaBar>
          <Styled.Counter isOverLimit={currentLength === maxLength}>
            {currentLength}/{maxLength}
          </Styled.Counter>
        </Styled.TextareaBar>

        {mode === Mode.NEW && (
          <>
            <Styled.Help>{t(`en-cours.textarea.${mode}.help.moves.title`)}</Styled.Help>
            {moves}
          </>
        )}

        {hasSubmitted && formErrors.length > 0 && (
          <Styled.Errors>
            {formErrors.map((error) => (
              <Styled.Error key={error}>{t(`en-cours.textarea.errors.${error}`)}</Styled.Error>
            ))}
          </Styled.Errors>
        )}

        <Styled.Help>{currentMove ? 4 : 3}. Que la Force vous !</Styled.Help>

        <Styled.TextareaBar>
          <Button
            onClick={submit}
            disabled={Boolean(hasSubmitted || formErrors.length > 0)}
            tabIndex={-1}
          >
            {t(`en-cours.textarea.${mode}.submit-button.label`)}
          </Button>
        </Styled.TextareaBar>
      </Styled.GameSection>
    </>
  );
}
