import { Fragment } from 'react';

import { Button } from '@/components/DesignSystem/Button';

import * as Styled from './styled';

type Input = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number';
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
};

export function Form({
  onSubmit,
  inputs,
  submitButtonLabel,
  children,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inputs: Array<Input>;
  submitButtonLabel: string;
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
            <Styled.Label htmlFor={input.name}>{input.label}</Styled.Label>
          </Styled.FormRow>
          <Styled.FormRow key={`${input.name}`}>
            <Styled.Input
              name={input.name}
              id={input.name}
              type={input.type}
              onInput={(e) => onInput(e, input)}
            />
          </Styled.FormRow>
        </Fragment>
      ))}
      {children}
      <Styled.FormRow marginY={1.5}>
        <Button width="100%">{submitButtonLabel}</Button>
      </Styled.FormRow>
    </Styled.Form>
  );
}
