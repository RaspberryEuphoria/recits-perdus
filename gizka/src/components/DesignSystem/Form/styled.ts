import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const FormRow = styled.div<{ marginY?: number }>`
  display: flex;
  width: 100%;
  margin: ${(props) => (props.marginY ? `${props.marginY}rem 0` : '0')};
  margin-bottom: 1rem;
  align-items: center;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: var(--flashy-alt);
  display: block;
  font-weight: bold;
  font-size: 1.4rem;
  font-style: italic;
`;
