import { Fragment } from 'react';

import { Button } from '@/components/DesignSystem/Button';

import * as Styled from './styled';

export function Form({
  onSubmit,
  inputs,
  submitButtonLabel,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inputs: Array<{ name: string; label: string; type: 'text' | 'email' | 'password' }>;
  submitButtonLabel: string;
}) {
  return (
    <Styled.Form onSubmit={onSubmit}>
      {inputs.map((input) => (
        <Fragment key={input.label}>
          <Styled.FormRow key={`${input.label}`}>
            <Styled.Label htmlFor={input.name}>{input.label}</Styled.Label>
          </Styled.FormRow>
          <Styled.FormRow key={`${input.name}`}>
            <Styled.Input name={input.name} id={input.name} type={input.type} />
          </Styled.FormRow>
        </Fragment>
      ))}
      <Styled.FormRow marginY={1.5}>
        <Button width="100%">{submitButtonLabel}</Button>
      </Styled.FormRow>
    </Styled.Form>
  );
}
