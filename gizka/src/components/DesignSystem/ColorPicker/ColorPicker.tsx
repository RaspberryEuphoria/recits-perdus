import { TextColor } from '@/utils/constants';

import * as Styled from './styled';

export type ColorOption = {
  value: string;
  isDisabled?: boolean;
};

export type ColorPickerProps = {
  name: string;
  defaultValue?: string | number;
  options: Array<ColorOption>;
  type: 'color-picker';
};

export function ColorPicker(props: ColorPickerProps) {
  return (
    <Styled.ColorPicker {...props}>
      {props.options.map((option) => (
        <Styled.Option key={option.value} color={option.value as TextColor}>
          <input type="radio" id={option.value} name={props.name} value={option.value} hidden />
          <Styled.Color htmlFor={option.value} />
        </Styled.Option>
      ))}
    </Styled.ColorPicker>
  );
}
