import { TextColor } from '@/utils/constants';

import * as Styled from './styled';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextAlign = 'left' | 'center' | 'right';

export type TextProps = {
  id?: string;
  size?: TextSize;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | React.ReactNode;
  textAlign?: TextAlign;
  children: React.ReactNode;
  color?: TextColor;
  fontStyle?: 'italic';
};

export function Text({ size = 'md', ...props }: TextProps) {
  return (
    <Styled.Text {...props} size={size}>
      {props.children}
    </Styled.Text>
  );
}
