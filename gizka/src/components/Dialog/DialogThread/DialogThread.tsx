import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'Socket.IO-client';

import { httpBffClient, isHttpError } from '@/services/http-client';
import { Character } from '@/utils/types/character';
import { Post } from '@/utils/types/scenario';
import { User } from '@/utils/types/user';

import { DialogPost } from '../DialogPost';
import { DialogTextarea } from '../DialogTextarea';
import { Move } from '../DialogTextarea/DialogTextarea';
import * as Styled from './styled';

const MAX_LENGTH = 500;

type DialogThreadProps = {
  currentUser: User | null;
  initialDialogs: Post[];
  introductionText: string;
  nextPoster: Character;
  nextPostIsGameMaster: boolean;
  characters: Record<string, Character>;
};

let socket: Socket;

export function DialogThread({
  initialDialogs,
  currentUser,
  introductionText,
  nextPoster: initialNextPoster,
  nextPostIsGameMaster,
  characters,
}: DialogThreadProps) {
  const router = useRouter();

  const { id: scenarioId } = router.query;
  const [dialogs, setDialogs] = useState<Post[]>(initialDialogs);
  const [currentDialog, setCurrentDialog] = useState<string>();
  const [currentMove, setCurrentMove] = useState<Move | null>();
  const [nextPoster, setNextPoster] = useState<Character>(initialNextPoster);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentDialog(e.target.value.substring(0, MAX_LENGTH));
  };

  const handleMoveChange = (move: Move | null) => {
    setCurrentMove(move);
  };

  const addPost = async () => {
    if (!currentDialog || !currentUser) return;

    const newDialog = {
      characterId: nextPoster.id,
      content: currentDialog,
      move: currentMove,
    };

    const id = (scenarioId as string).split('-')[0];
    const dialog = await httpBffClient.post<Post>(`/scenario/${id}/post`, newDialog);

    if (isHttpError(dialog)) {
      throw new Error(`There was an error while adding a new dialog: ${dialog.message}`);
    }
    socket.emit('post-new-dialog', dialog);

    if (textareaRef?.current) {
      textareaRef.current.value = '';
    }

    setCurrentDialog('');

    if (dialog.nextPoster) {
      setNextPoster(dialog.nextPoster);
    }
  };

  const socketInitializer = async () => {
    await httpBffClient.get('/socket');

    socket = io();
    socket.on('receive-new-dialog', (newDialog) => {
      setDialogs((dialogs) => [...dialogs, newDialog]);

      if (newDialog.nextPoster) {
        setNextPoster(newDialog.nextPoster);
      }

      socket.off('receive-new-dialog');
    });
  };

  useEffect(() => {
    if (!socket) socketInitializer();

    return () => {
      // if (socket) socket.disconnect();
    };
  }, []);

  return (
    <Styled.Wrapper>
      <Styled.DialogThread>
        <DialogPost content={introductionText} />
        {dialogs.map((dialog) => (
          <DialogPost key={dialog.id} {...dialog} character={characters[dialog.characterId]} />
        ))}
      </Styled.DialogThread>
      {currentUser && (
        <DialogTextarea
          currentUserId={currentUser.id}
          nextPoster={nextPoster}
          handleTextareaChange={handleTextareaChange}
          handleMoveChange={handleMoveChange}
          handlePost={addPost}
          innerRef={textareaRef}
          value={currentDialog}
          asGameMaster={nextPostIsGameMaster}
        />
      )}
    </Styled.Wrapper>
  );
}
