import Image from 'next/image';
import React, { useState } from 'react';

import DefaultAvatarSrc from '@/public/images/default_avatar.png';
import { TextColor } from '@/utils/constants';
import { convertHexadecimalColorToHsl } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';

import * as Styled from './styled';

type CharacterAvatarProps = {
  character: Character;
  withName?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export function CharacterAvatar({
  character: { textColor, avatar, firstName },
  handleClick,
}: CharacterAvatarProps) {
  const [avatarSrc, setAvatarSrc] = useState<string>(
    `${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/users/avatars/${avatar}`,
  );

  return (
    <Styled.CharacterAvatar
      colorAtLightOpacity={convertHexadecimalColorToHsl(textColor || TextColor.Default, 0.2)}
      color={textColor || TextColor.Default}
      onClick={handleClick}
    >
      <Image
        src={avatarSrc}
        alt={`Avatar de ${firstName}`}
        width={200}
        height={230}
        quality={100}
        onError={() => setAvatarSrc(DefaultAvatarSrc.src)}
      />
      <Styled.CharacterName>{firstName}</Styled.CharacterName>
    </Styled.CharacterAvatar>
  );
}
