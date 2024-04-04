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
  font-family: 'Roboto';

  &:focus {
    outline: none;
    border-color: var(--flashy);
  }
`;
