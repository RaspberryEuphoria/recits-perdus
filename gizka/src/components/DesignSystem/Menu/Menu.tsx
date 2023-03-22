import Link from 'next/link';
import * as Styled from './styled';

export function Menu({
  links,
}: {
  links: Array<{ label: string; href: string; description: string }>;
}) {
  return (
    <Styled.Menu>
      {links.map((link) => (
        <Styled.Link key={link.label}>
          <Link href={link.href}>
            <Styled.Label>{link.label}</Styled.Label>
            <Styled.Description>{link.description}</Styled.Description>
          </Link>
        </Styled.Link>
      ))}
    </Styled.Menu>
  );
}
