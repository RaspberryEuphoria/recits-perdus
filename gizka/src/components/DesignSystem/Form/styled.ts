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
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem;
`;

export const Label = styled.label`
  display: block;
  width: 100%;
  font-weight: bold;
  font-size: 1.4rem;
  font-style: italic;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  height: 2.8rem;
  padding: 0.5rem;
  border-radius: 0;
  border: none;
  font-size: 1.4rem;
`;
