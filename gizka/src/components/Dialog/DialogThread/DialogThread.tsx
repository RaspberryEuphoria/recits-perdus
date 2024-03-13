import { ForwardedRef, forwardRef } from 'react';

import { Character } from '@/utils/types/character';
import { Post } from '@/utils/types/scenario';

import { DialogPost } from '../DialogPost';
import * as Styled from './styled';

type DialogThreadProps = {
  characters: Record<string, Character>;
  currentUserId: number | null;
  dialogs: Post[];
  handlePostEdit: (post: { id: number; content: string }) => void;
  introductionText: string;
  isEditAllowed: boolean;
};

const DialogThread = forwardRef(
  (
    {
      characters,
      currentUserId,
      dialogs,
      handlePostEdit,
      introductionText,
      isEditAllowed,
    }: DialogThreadProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const lastPostId = dialogs.at(-1)?.id;

    return (
      <Styled.DialogThread ref={ref}>
        <DialogPost
          id={0}
          content={introductionText}
          characters={characters}
          isEditable={false}
          handlePostEdit={handlePostEdit}
        />
        {dialogs.map((dialog) => (
          <DialogPost
            key={dialog.id}
            {...dialog}
            isEditable={
              isEditAllowed && dialog.id === lastPostId && currentUserId === dialog.character.userId
            }
            character={characters[dialog.characterId]}
            characters={characters}
            handlePostEdit={handlePostEdit}
          />
        ))}
      </Styled.DialogThread>
    );
  },
);
DialogThread.displayName = 'DialogThread';

export { DialogThread };
