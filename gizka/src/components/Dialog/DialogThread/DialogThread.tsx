import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'Socket.IO-client';

import { DialogTextarea } from '../DialogTextarea';
import { DialogPost } from '../DialogPost';
import { httpBffClient } from '@/services/http-client';

import * as Styled from './styled';
import { DataDices } from '@/pages/api/dices';
import { User } from '@/utils/types/user';
import { useRouter } from 'next/router';
import { Post } from '@/utils/types/scenario';
import { Character } from '@/utils/types/character';

const MAX_LENGTH = 500;

type DialogThreadProps = {
  currentUser: User | null;
  dices: DataDices;
  initialDialogs: Post[];
  introductionText: string;
  nextPoster: Character;
};

let socket: Socket;

export function DialogThread({
  initialDialogs,
  currentUser,
  dices,
  introductionText,
  nextPoster,
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
      scenarioId: parseInt(scenarioId as string),
      characterId: 2,
      body: currentDialog,
    };

    const dialog = await httpBffClient.post(`/scenario/${scenarioId}/post`, newDialog);
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
          <DialogPost key={dialog.id} {...dialog} />
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
          dices={dices}
        />
      )}
    </Styled.Wrapper>
  );
}
