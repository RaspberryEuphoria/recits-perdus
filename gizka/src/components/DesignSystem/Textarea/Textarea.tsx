import * as Styled from './styled';

export type TextAreaProps = {
  name: string;
  id: string;
  defaultValue?: string | number;
  type: 'textarea';
};

export function Textarea(props: TextAreaProps) {
  return <Styled.Textarea {...props} />;
}
