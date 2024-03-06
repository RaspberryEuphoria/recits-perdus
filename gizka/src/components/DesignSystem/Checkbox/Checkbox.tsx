import * as Styled from './styled';

type CheckboxProps = {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox(props: CheckboxProps) {
  return (
    <Styled.Container htmlFor={props.id}>
      <Styled.Checkbox {...props} type="checkbox" />
      <Styled.Checkmark />
    </Styled.Container>
  );
}
