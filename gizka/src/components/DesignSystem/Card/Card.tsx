import * as Styled from './styled';

type CardProps = {
  title: string;
  subTitle?: string;
  description?: string;
  icon?: React.ReactNode;
  backgroundUrl?: string;
  href?: string;
  onClick?: () => void;
};

export function Card(props: CardProps) {
  const { title, subTitle, description, icon, backgroundUrl, href = '', onClick } = props;

  return (
    <Styled.Card background={backgroundUrl} href={href} onClick={onClick}>
      <Styled.Title>{title}</Styled.Title>
      {subTitle && <Styled.SubTitle>{subTitle}</Styled.SubTitle>}
      {description && <Styled.Description>{description}</Styled.Description>}
      {icon && <Styled.Icon>{icon}</Styled.Icon>}
    </Styled.Card>
  );
}
