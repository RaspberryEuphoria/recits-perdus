import * as Styled from './styled';

export type InputProps = {
  name: string;
  id: string;
  defaultValue?: string | number;
  type: 'text' | 'email' | 'password' | 'number';
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
};

export function Input(props: InputProps) {
  return <Styled.Input {...props} />;
}
