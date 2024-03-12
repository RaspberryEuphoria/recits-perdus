import Image from 'next/image';
import React from 'react';

import { TextColor } from '@/utils/constants';
import { convertHexadecimalColorToHsl } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';

import * as Styled from './styled';

type CharacterAvatarProps = {
  character: Character;
  handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export function CharacterAvatar({
  character: { textColor, avatar, firstName },
  handleClick,
}: CharacterAvatarProps) {
  return (
    <Styled.CharacterAvatar
      colorAtLightOpacity={convertHexadecimalColorToHsl(textColor, 0.2)}
      color={textColor || TextColor.Default}
      onClick={handleClick}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/users/avatars/${avatar}`}
        alt="[Avatar manquant]"
        width={200}
        height={230}
        quality={100}
      />
      <Styled.CharacterName>{firstName}</Styled.CharacterName>
    </Styled.CharacterAvatar>
  );
}
