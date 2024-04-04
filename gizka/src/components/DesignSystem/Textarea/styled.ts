import styled from 'styled-components';

export const Textarea = styled.textarea`
  background: var(--dark);
  border-radius: var(--rounded);
  border: 1px solid var(--light);
  color: var(--light);
  display: block;
  font-family: 'Roboto';
  font-size: 1.4rem;
  height: 10rem;
  padding: 0.5rem;
  resize: vertical;
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--flashy);
  }
`;
