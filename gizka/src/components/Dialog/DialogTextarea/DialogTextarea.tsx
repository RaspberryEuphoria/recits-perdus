import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { Button } from '@/components/DesignSystem/Button';
import { Moves } from '@/components/Moves';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { Character } from '@/utils/types/character';
import { Post } from '@/utils/types/scenario';

import * as Styled from './styled';

type DialogTextareaProps = {
  nextPoster: Character;
  content: string;
  onContentChange: (content: string) => void;
  onTextareaSubmit: () => void;
};

export type Move = {
  id: string;
  meta?: Record<string, string | number | boolean>;
};

const MAX_LENGTH = 500;

let socket: Socket;

export function DialogTextarea({
  nextPoster: initialNextPoster,
  content: initialContent,
  onContentChange,
  onTextareaSubmit,
}: DialogTextareaProps) {
  const router = useRouter();
  const { id: scenarioId } = router.query;

  const [content, setContent] = useState<string>(initialContent);
  const [currentMove, setCurrentMove] = useState<Move | null>(null);
  const [nextPoster, setNextPoster] = useState<Character>(initialNextPoster);

  const currentLength = content?.length || 0;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.substring(0, MAX_LENGTH));
  };

  const addPost = async () => {
    if (!content) return;

    const dialog = {
      characterId: nextPoster.id,
      content: content,
      action: {
        move: currentMove,
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

  const isMoveValid = currentMove ? currentMove?.meta?.isValid : true;
  const hasText = content;
  const isFormDisabled = !isMoveValid || !hasText || currentLength > MAX_LENGTH;

  useEffect(() => {
    const socketInitializer = async () => {
      await httpBffClient.get('/socket');
      socket = io();
    };

    if (!socket) {
      socketInitializer();
    } else if (socket.disconnected) {
      socket.connect();
    }

    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
      }
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

        <Styled.Help>
          2. <em>(Optionnel)</em> Choisissez une Tactique afin de progresser dans le scénario.
        </Styled.Help>

        <Moves onMovePicked={onMovePicked} />

        <Styled.Help>
          3. Envoyez votre message et résolvez votre Tactique éventuelle. Que la Force vous !
        </Styled.Help>

        <Styled.TextareaBar>
          <Button onClick={addPost} disabled={isFormDisabled}>
            C&apos;est parti !
          </Button>
          {currentLength > 0 && (
            <Styled.Counter isOverLimit={currentLength === MAX_LENGTH}>
              {currentLength}/{MAX_LENGTH}
            </Styled.Counter>
          )}
        </Styled.TextareaBar>
      </Styled.GameSection>
    </>
  );
}
