'use client';

import { useTranslations } from 'next-intl';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { Button } from '@/components/DesignSystem/Button';
import { Row } from '@/components/DesignSystem/Row';
import { MovesProps } from '@/components/Moves/Moves';
import DownArrowIcon from '@/public/images/icons/down_arrow.svg';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { Character } from '@/utils/types/character';
import { Moves as MoveId, Post, Skill, Stat } from '@/utils/types/scenario';

import * as Styled from './styled';

type DialogTextareaProps = {
  scenarioId: string;
  nextPoster: Character;
  content: string;
  postId: number | null;
  onContentChange: (content: string) => void;
  onTextareaSubmit: () => void;
  renderMoves: (
    onMovePicked: (move: Move | null) => void,
    onBurnCheck: (hasMomentumBurn: boolean) => void,
  ) => ReactElement<MovesProps>;
};

export type Move = {
  id: MoveId;
  meta?: Record<string, string | number | boolean | Skill | Stat | undefined>;
};

enum Mode {
  NEW = 'new',
  EDIT = 'edit',
}

const MAX_LENGTH = 1000;

let socket: Socket;

export function DialogTextarea({
  scenarioId,
  nextPoster: initialNextPoster,
  content: initialContent,
  postId,
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

  const mode = postId ? Mode.EDIT : Mode.NEW;
  const currentLength = content?.length || 0;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.substring(0, MAX_LENGTH));
  };

  const getFormErrors = useCallback(() => {
    const isMoveValid = currentMove ? currentMove?.meta?.isValid : true;
    const errors = [];

    if (!isMoveValid) errors.push('invalid-move');
    if (currentLength > MAX_LENGTH) errors.push('too-long');
    if (!currentLength) errors.push('empty');

    return errors;
  }, [currentLength, currentMove]);

  const submit = () => {
    const errors = getFormErrors();

    setHasSubmitted(true);
    setFormErrors(errors);

    if (errors.length) return;

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
      content: content,
      action: {
        move,
      },
    };

    const id = (scenarioId as string).split('-')[0];
    const newDialog = await httpBffClient.post<Post>(`/scenario/${id}/post`, dialog);

    if (isHttpError(newDialog)) {
      throw new Error(`There was an error while adding a new dialog: ${newDialog.message}`);
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

  const moves = renderMoves(onMovePicked, onBurnCheck);

  const socketInitializer = async () => {
    await httpBffClient.get('/socket');

    socket = io(`${process.env.NEXT_PUBLIC_BFF_PREFIX_URL}`, {
      path: '/api/socket',
      transports: ['polling'],
    });
  };

  useEffect(() => {
    socketInitializer();
    textareaRef.current?.focus();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    onContentChange(content);
    setFormErrors(getFormErrors());
  }, [content, getFormErrors, onContentChange]);

  useEffect(() => {
    setFormErrors(getFormErrors());
  }, [currentMove, getFormErrors]);

  return (
    <>
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

        <Styled.Textarea
          ref={textareaRef}
          placeholder=""
          onChange={handleTextareaChange}
          value={content}
        ></Styled.Textarea>

        <Styled.Counter isOverLimit={currentLength === MAX_LENGTH}>
          {currentLength}/{MAX_LENGTH}
        </Styled.Counter>

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
          <Button onClick={submit} disabled={Boolean(hasSubmitted && formErrors.length > 0)}>
            {t(`en-cours.textarea.${mode}.submit-button.label`)}
          </Button>
        </Styled.TextareaBar>
      </Styled.GameSection>
    </>
  );
}
