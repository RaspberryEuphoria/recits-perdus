import { TextColor } from '@/utils/constants';

import * as Styled from './styled';

type BlockProps = {
  color?: TextColor;
  children: React.ReactNode;
};

export function Block(props: BlockProps) {
  return <Styled.Block color={props.color}>{props.children}</Styled.Block>;
}
