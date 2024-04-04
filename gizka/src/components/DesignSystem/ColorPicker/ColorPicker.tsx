import { TextColor } from '@/utils/constants';

import * as Styled from './styled';

export type SelectOption = {
  value: TextColor;
  label: string;
  isDisabled?: boolean;
};

export type SelectProps = {
  name: string;
  id: string;
  defaultValue?: string | number;
  options: Array<SelectOption>;
  type: 'color-picker';
};

export function ColorPicker(props: SelectProps) {
  return (
    <Styled.ColorPicker {...props}>
      {props.options.map((option) => (
        <Styled.Option key={option.value} color={option.value}>
          <input type="radio" id={option.value} name={props.name} value={option.value} hidden />
          <Styled.Color htmlFor={option.value}>{option.label}</Styled.Color>
        </Styled.Option>
      ))}
    </Styled.ColorPicker>
  );
}
