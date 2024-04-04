import * as Styled from './styled';

export type SelectOption = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

export type SelectProps = {
  name: string;
  defaultValue?: string | number;
  options: Array<SelectOption>;
  type: 'select';
};

export function Select(props: SelectProps) {
  return (
    <Styled.Select {...props}>
      <Styled.Option value={''}></Styled.Option>
      {props.options.map((option) => (
        <Styled.Option key={option.value} value={option.value} disabled={option.isDisabled}>
          {option.label}
        </Styled.Option>
      ))}
    </Styled.Select>
  );
}
