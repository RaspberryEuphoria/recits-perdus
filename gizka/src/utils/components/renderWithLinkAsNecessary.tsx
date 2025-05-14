import Link from 'next/link';

export const RenderWithLinkAsNecessary = (props: {
  href?: string;
  target?: string;
  children: React.ReactNode;
}) => {
  if (props.href) {
    return (
      <Link href={props.href} target={props.target}>
        {props.children}
      </Link>
    );
  }

  return props.children;
};
