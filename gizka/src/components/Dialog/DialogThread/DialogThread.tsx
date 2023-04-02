import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'Socket.IO-client';

import { httpBffClient } from '@/services/http-client';
import { Character } from '@/utils/types/character';
import { Post } from '@/utils/types/scenario';
import { User } from '@/utils/types/user';

import { DialogPost } from '../DialogPost';
import { DialogTextarea } from '../DialogTextarea';
import * as Styled from './styled';

const MAX_LENGTH = 500;

type DialogThreadProps = {
  currentUser: User | null;
  initialDialogs: Post[];
  introductionText: string;
  nextPoster: Character;
  characters: Record<string, Character>;
};

let socket: Socket;

export function DialogThread({
  initialDialogs,
  currentUser,
  introductionText,
  nextPoster,
  characters,
}: DialogThreadProps) {
  const router = useRouter();

  const { id: scenarioId } = router.query;
  const [dialogs, setDialogs] = useState<Post[]>(initialDialogs);
  const [currentDialog, setCurrentDialog] = useState<string>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentDialog(e.target.value.substring(0, MAX_LENGTH));
  };

  const addPost = async () => {
    if (!currentDialog || !currentUser) return;

    const newDialog = {
      characterId: nextPoster.id,
      content: currentDialog,
    };

    const id = (scenarioId as string).split('-')[0];
    const dialog = await httpBffClient.post(`/scenario/${id}/post`, newDialog);
    socket.emit('post-new-dialog', dialog);

    if (textareaRef?.current) {
      textareaRef.current.value = '';
    }

    setCurrentDialog('');
  };

  const socketInitializer = async () => {
    await httpBffClient.get('/socket');

    socket = io();
    socket.on('receive-new-dialog', (newDialog) => {
      setDialogs((dialogs) => [...dialogs, newDialog]);
      socket.off('receive-new-dialog');
    });
  };

  useEffect(() => {
    if (!socket) socketInitializer();
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
          handleChange={handleChange}
          handlePost={addPost}
          innerRef={textareaRef}
          value={currentDialog}
        />
      )}
    </Styled.Wrapper>
  );
}
