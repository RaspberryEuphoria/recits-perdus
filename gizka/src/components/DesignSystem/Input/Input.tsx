import * as Styled from './styled';

type InputProps = {
  name: string;
  id: string;
  type: 'text' | 'textarea' | 'email' | 'password' | 'number';
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
};

export function Input(props: InputProps) {
  if (props.type === 'textarea') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onInput: _, ...textareaProps } = props;
    return <Styled.Textarea {...textareaProps} />;
  }

  return <Styled.Input {...props} />;
}
