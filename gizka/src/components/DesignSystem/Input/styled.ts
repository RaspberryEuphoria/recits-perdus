import styled from 'styled-components';

export const Input = styled.input`
  background: var(--dark);
  border: 1px solid var(--light);
  border-radius: var(--rounded);
  color: var(--light);
  display: block;
  width: 100%;
  height: 2.8rem;
  padding: 0.5rem;
  font-size: 1.4rem;

  &:focus {
    outline: none;
    border-color: var(--flashy);
  }
`;

export const Textarea = styled.textarea`
  background: var(--dark);
  border-radius: var(--rounded);
  border: 1px solid var(--light);
  color: var(--light);
  display: block;
  font-family: 'Oxanium';
  font-size: 1.4rem;
  height: 10rem;
  padding: 0.5rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--flashy);
  }
`;
