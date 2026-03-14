import { ForwardedRef, forwardRef, useMemo, useState } from 'react';

import { Button } from '@/components/DesignSystem/Button';
import { Character } from '@/utils/types/character';
import { Post } from '@/utils/types/scenario';

import { DialogPost } from '../DialogPost';
import * as Styled from './styled';

type DialogThreadProps = {
  characters: Record<string, Character>;
  currentUserId: number | null;
  dialogs: Post[];
  handlePostEdit?: (post: { id: number; content: string }) => void;
  introductionText: string;
  isEditAllowed: boolean;
};

const DIALOGS_PER_PAGE = 5;

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

    const [numberOfDialogsToShow, setNumberOfDialogsToShow] = useState(DIALOGS_PER_PAGE);
    const lastDialogs = useMemo(
      () => dialogs.filter((_, index) => index >= dialogs.length - numberOfDialogsToShow),
      [dialogs, numberOfDialogsToShow],
    );

    const showMore = () => {
      setNumberOfDialogsToShow((prev) => prev + DIALOGS_PER_PAGE);
    };

    return (
      <Styled.DialogThread ref={ref}>
        <DialogPost
          id={0}
          content={introductionText}
          characters={characters}
          isEditable={false}
          handlePostEdit={handlePostEdit}
        />
        {lastDialogs.length < dialogs.length && (
          <Button onClick={showMore} variant="small">
            Afficher plus de messages... ({numberOfDialogsToShow}/{dialogs.length})
          </Button>
        )}
        {lastDialogs.map((dialog) => (
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
