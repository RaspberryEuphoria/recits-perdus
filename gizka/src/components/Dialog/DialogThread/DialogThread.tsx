import { ForwardedRef, forwardRef } from 'react';

import { Character } from '@/utils/types/character';
import { Post } from '@/utils/types/scenario';

import { DialogPost } from '../DialogPost';
import * as Styled from './styled';

type DialogThreadProps = {
  dialogs: Post[];
  introductionText: string;
  characters: Record<string, Character>;
};

const DialogThread = forwardRef(
  (
    { introductionText, characters, dialogs }: DialogThreadProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <Styled.DialogThread ref={ref}>
      <DialogPost content={introductionText} characters={characters} />
      {dialogs.map((dialog) => (
        <DialogPost
          key={dialog.id}
          {...dialog}
          character={characters[dialog.characterId]}
          characters={characters}
        />
      ))}
    </Styled.DialogThread>
  ),
);
DialogThread.displayName = 'DialogThread';

export { DialogThread };
