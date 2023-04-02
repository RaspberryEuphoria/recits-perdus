import Link from 'next/link';

import * as Styled from './styled';

export function NavBar({
  links,
}: {
  links: Array<{ label: string; href: string; description: string }>;
}) {
  return (
    <Styled.NavBar>
      {links.map((link) => (
        <Styled.Link key={link.label}>
          <Link href={link.href}>{link.label}</Link>
          <Styled.Description>{link.description}</Styled.Description>
        </Styled.Link>
      ))}
    </Styled.NavBar>
  );
}
