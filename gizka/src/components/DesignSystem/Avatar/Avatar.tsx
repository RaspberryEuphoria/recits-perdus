import Image from 'next/image';
import React, { useState } from 'react';

import DefaultAvatarSrc from '@/public/images/default_avatar.png';
import { TextColor } from '@/utils/constants';
import { convertHexadecimalColorToHsl } from '@/utils/scenario/helpers';

import * as Styled from './styled';

type AvatarProps = {
  textColor?: string;
  name?: string;
  avatarSrc?: string;
  handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export function Avatar({ textColor, avatarSrc, name, handleClick }: AvatarProps) {
  const [src, setSrc] = useState<string>(
    `${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/${avatarSrc}`,
  );

  return (
    <Styled.Avatar
      colorAtLightOpacity={convertHexadecimalColorToHsl(textColor || TextColor.Default, 0.2)}
      color={textColor || TextColor.Default}
      onClick={handleClick}
    >
      <Image
        src={src}
        alt={`Avatar de ${name}`}
        width={200}
        height={230}
        quality={100}
        onError={() => setSrc(DefaultAvatarSrc.src)}
      />
    </Styled.Avatar>
  );
}
