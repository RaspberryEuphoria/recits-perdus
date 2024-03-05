import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

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
  const [currentMove, setCurrentMove] = useState<Move | null>(null);
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

    const dialog = {
      characterId: nextPoster.id,
      content: currentDialog,
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

    console.log(dialog.action.move);

    if (dialog.action.move) socket.emit('post-new-move');
    if (newDialog.nextPoster) setNextPoster(newDialog.nextPoster);

    setCurrentDialog('');
    setCurrentMove(null);
    resetTextareaValue();
  };

  const socketInitializer = async () => {
    console.log('Dialog : socketInitializer');
    await httpBffClient.get('/socket');

    socket = io();
    socket.on('receive-new-dialog', async (newDialog) => {
      setDialogs((dialogs) => [...dialogs, newDialog]);

      console.log('newDialog');
      console.log(newDialog);

      if (newDialog.nextPoster) setNextPoster(newDialog.nextPoster);
      if (newDialog.move) socket.emit('post-new-move');

      socket.off('receive-new-dialog');
    });
  };

  const resetTextareaValue = () => {
    if (textareaRef?.current) textareaRef.current.value = '';
  };

  useEffect(() => {
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
          move={currentMove}
        />
      )}
    </Styled.Wrapper>
  );
}
