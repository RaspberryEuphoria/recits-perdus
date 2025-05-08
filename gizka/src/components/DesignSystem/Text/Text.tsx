import * as Styled from './styled';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TextProps = {
  size?: TextSize;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | React.ReactNode;
  children: React.ReactNode;
};

export function Text({ size = 'md', ...props }: TextProps) {
  return (
    <Styled.Text {...props} size={size}>
      {props.children}
    </Styled.Text>
  );
}
