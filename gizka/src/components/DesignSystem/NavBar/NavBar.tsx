'use client';

import Link from 'next/link';

import * as Styled from './styled';

export function NavBar({
  links,
}: {
  links: Array<{
    label: string;
    href: string;
    isDisabled: boolean;
    isBlank?: boolean;
  }>;
}) {
  return (
    <Styled.NavBar>
      {links.map((link) => (
        <Styled.Link key={link.label} isDisabled={link.isDisabled}>
          <Link href={link.href} target={link.isBlank ? '_blank' : '_self'}>
            {link.label}
          </Link>
        </Styled.Link>
      ))}
    </Styled.NavBar>
  );
}
