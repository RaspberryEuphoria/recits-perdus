import { DataDialogs, Dialog } from '@/pages/api/dialog';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'Socket.IO-client';

import { DialogTextarea } from '../DialogTextarea';
import { DialogPost } from '../DialogPost';
import { httpBffClient } from '@/services/http-client';

import * as Styled from './styled';
import { DataDices } from '@/pages/api/dices';
import { User } from '@/utils/types/user';
import { useRouter } from 'next/router';
const MAX_LENGTH = 500;

type DialogThreadProps = {
  currentUser: User | null;
  dices: DataDices;
  initialDialogs: DataDialogs;
};

let socket: Socket;

export function DialogThread({ initialDialogs, currentUser, dices }: DialogThreadProps) {
  const router = useRouter();

  const { id: threadId } = router.query;
  const [dialogs, setDialogs] = useState<Dialog[]>(initialDialogs);
  const [currentDialog, setCurrentDialog] = useState<string>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentDialog(e.target.value.substring(0, MAX_LENGTH));
  };

  const addPost = async () => {
    if (!currentDialog || !currentUser) return;

    const newDialog = {
      threadId: parseInt(threadId as string), // @todo: replace autoincrements ids with uuids?
      characterId: 2,
      body: currentDialog,
    };

    const dialog = await httpBffClient.post(`/thread/${threadId}/post`, newDialog);
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
        <DialogPost content="Nos deux héros se retrouvent à la cantina..." />
        {dialogs.map((dialog) => (
          <DialogPost key={dialog.id} {...dialog} />
        ))}
      </Styled.DialogThread>
      {currentUser && (
        <DialogTextarea
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
