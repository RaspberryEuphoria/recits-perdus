import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import DefaultAvatarSrc from '@/public/images/default_avatar.png';
import { TextColor } from '@/utils/constants';
import { convertHexadecimalColorToHsl } from '@/utils/scenario/helpers';

import * as Styled from './styled';

type DetailedPictureProps = {
  title: string;
  subTitle?: string;
  textColor?: TextColor;
  imageSrc?: string;
  imageLinkHref?: string;
  subTitleLinkHref?: string;
  displayPill?: boolean;
  hideBorder?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const RenderWithLinkAsNecessary = (props: { href?: string; children: React.ReactNode }) => {
  if (props.href) {
    return <Link href={props.href}>{props.children}</Link>;
  }

  return props.children;
};

export function DetailedPicture({
  title,
  subTitle,
  textColor,
  imageSrc,
  imageLinkHref,
  subTitleLinkHref,
  hideBorder,
  displayPill,
  handleClick,
}: DetailedPictureProps) {
  const [src, setSrc] = useState<string>(imageSrc || DefaultAvatarSrc.src);

  const color = textColor || TextColor.Default;
  const lightColor = convertHexadecimalColorToHsl(color, 0.1);

  return (
    <Styled.Container color={color} hideBorder={hideBorder}>
      <Styled.Title color={color} colorAtLightOpacity={lightColor}>
        {title}
      </Styled.Title>

      <RenderWithLinkAsNecessary href={imageLinkHref}>
        <Styled.DetailedPicture
          colorAtLightOpacity={lightColor}
          color={color}
          onClick={handleClick}
          withEffectOnHover={Boolean(handleClick || imageLinkHref)}
        >
          <Image
            src={src}
            alt={title}
            width={200}
            height={230}
            quality={100}
            onError={() => setSrc(DefaultAvatarSrc.src)}
          />
        </Styled.DetailedPicture>
      </RenderWithLinkAsNecessary>

      {subTitle && (
        <RenderWithLinkAsNecessary href={subTitleLinkHref}>
          <Styled.SubTitle
            color={color}
            colorAtLightOpacity={lightColor}
            withEffectOnHover={Boolean(subTitleLinkHref)}
          >
            {subTitle}
            {displayPill && <Styled.Pill color={color}>!</Styled.Pill>}
          </Styled.SubTitle>
        </RenderWithLinkAsNecessary>
      )}
    </Styled.Container>
  );
}
