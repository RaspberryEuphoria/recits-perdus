import { Fragment } from 'react';

import { ColorPicker } from '@/components/DesignSystem/ColorPicker';
import type { InputProps } from '@/components/DesignSystem/Input';
import { Input } from '@/components/DesignSystem/Input';
import type { SelectProps } from '@/components/DesignSystem/Select';
import { Select } from '@/components/DesignSystem/Select';
import { Textarea } from '@/components/DesignSystem/Textarea';

import * as Styled from './styled';

type Input = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'color-picker';
  options?: SelectProps['options'];
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
  help?: string;
  mandatory: boolean;
};

export function Form({
  onSubmit,
  inputs,
  submitButton,
  children,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inputs: Array<Input>;
  submitButton: React.ReactNode;
  children?: React.ReactNode;
}) {
  const onInput = (event: React.FormEvent<HTMLInputElement>, input: Input) => {
    if (typeof input.onInput === 'function') {
      input.onInput(event);
    }
  };

  return (
    <Styled.Form onSubmit={onSubmit}>
      {inputs.map((input) => (
        <Fragment key={input.label}>
          <Styled.FormRow key={`${input.label}`}>
            <Styled.Label htmlFor={input.name}>
              {input.label} {input.mandatory && <Styled.Mandatory>(requis)</Styled.Mandatory>}
            </Styled.Label>
            {input.help && <Styled.Help dangerouslySetInnerHTML={{ __html: input.help }} />}
          </Styled.FormRow>
          <Styled.FormRow key={`${input.name}`}>
            {input.type === 'textarea' && (
              <Textarea
                name={input.name}
                id={input.name}
                type={input.type}
                defaultValue={input.defaultValue}
              />
            )}
            {input.type === 'select' && (
              <Select
                name={input.name}
                type={input.type}
                options={(input as SelectProps).options}
                defaultValue={input.defaultValue}
              />
            )}
            {input.type === 'color-picker' && (
              <ColorPicker
                name={input.name}
                type={input.type}
                options={(input as SelectProps).options}
                defaultValue={input.defaultValue}
              />
            )}
            {['text', 'number', 'email', 'password'].includes(input.type) && (
              <Input
                name={input.name}
                id={input.name}
                type={input.type as InputProps['type']}
                onInput={(e) => onInput(e, input)}
                defaultValue={input.defaultValue}
              />
            )}
          </Styled.FormRow>
        </Fragment>
      ))}
      {children}
      <Styled.FormRow marginY={1.5}>{submitButton}</Styled.FormRow>
    </Styled.Form>
  );
}
