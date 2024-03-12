'use client';

import { ReactElement, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { Button } from '@/components/DesignSystem/Button';
import { MovesProps } from '@/components/Moves/Moves';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { Character } from '@/utils/types/character';
import { Moves as MoveId, Post, Skill, Stat } from '@/utils/types/scenario';

import * as Styled from './styled';

type DialogTextareaProps = {
  scenarioId: string;
  nextPoster: Character;
  content: string;
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

const MAX_LENGTH = 1000;

let socket: Socket;

export function DialogTextarea({
  scenarioId,
  nextPoster: initialNextPoster,
  content: initialContent,
  onContentChange,
  onTextareaSubmit,
  renderMoves,
}: DialogTextareaProps) {
  const [nextPoster, setNextPoster] = useState<Character>(initialNextPoster);
  const [content, setContent] = useState<string>(initialContent);
  const [currentMove, setCurrentMove] = useState<Move | null>(null);
  const [hasMomentumBurn, sethasMomentumBurn] = useState<boolean>(false);

  const currentLength = content?.length || 0;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.substring(0, MAX_LENGTH));
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

  const onMovePicked = (move: Move | null) => {
    setCurrentMove(move);
  };

  const onBurnCheck = (hasMomentumBurn: boolean) => {
    sethasMomentumBurn(hasMomentumBurn);
  };

  const moves = renderMoves(onMovePicked, onBurnCheck);

  const isMoveValid = currentMove ? currentMove?.meta?.isValid : true;
  const isFormDisabled = !isMoveValid || !content || currentLength > MAX_LENGTH;

  const socketInitializer = async () => {
    await httpBffClient.get('/socket');

    socket = io(`${process.env.NEXT_PUBLIC_BFF_PREFIX_URL}`, {
      path: '/api/socket',
      transports: ['polling'],
    });
  };

  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    onContentChange(content);
  }, [content, onContentChange]);

  return (
    <>
      <Styled.GameSection>
        <Styled.Help>
          1. Décrivez votre réaction aux derniers évènements, puis votre prochaine action.
          <p>
            Utilisez des &quot;guillemets&quot; pour vos dialogues, et des *astérisques* pour les
            PNJs.
          </p>
        </Styled.Help>

        <Styled.Textarea
          placeholder=""
          onChange={handleTextareaChange}
          value={content}
        ></Styled.Textarea>

        <Styled.Counter isOverLimit={currentLength === MAX_LENGTH}>
          {currentLength}/{MAX_LENGTH}
        </Styled.Counter>

        <Styled.Help>
          2. <em>(Optionnel)</em> Choisissez une action afin de progresser dans le scénario.
        </Styled.Help>

        {moves}

        <Styled.Help>
          {currentMove ? 4 : 3}. Envoyez votre message et résolvez votre action éventuelle. Que la
          Force vous !
        </Styled.Help>

        <Styled.TextareaBar>
          <Button onClick={addPost} disabled={isFormDisabled}>
            C&apos;est parti !
          </Button>
        </Styled.TextareaBar>
      </Styled.GameSection>
    </>
  );
}
