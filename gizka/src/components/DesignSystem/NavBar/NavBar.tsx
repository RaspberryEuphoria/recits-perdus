'use client';

import { RenderWithLinkAsNecessary } from '@/utils/components/renderWithLinkAsNecessary';

import * as Styled from './styled';

export function NavBar({
  links,
}: {
  links: Array<{
    label: string;
    href: string;
    isDisabled: boolean;
    isActive?: boolean;
    isBlank?: boolean;
    logo?: JSX.Element;
  }>;
}) {
  return (
    <Styled.NavBar>
      {links.map((link) => (
        <Styled.Link key={link.label} isDisabled={link.isDisabled} isActive={link.isActive}>
          <RenderWithLinkAsNecessary
            href={link.isActive ? '' : link.href}
            target={link.isBlank ? '_blank' : '_self'}
          >
            {link.label}
            {link.logo}
          </RenderWithLinkAsNecessary>
        </Styled.Link>
      ))}
    </Styled.NavBar>
  );
}
