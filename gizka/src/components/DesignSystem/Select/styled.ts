import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Select = styled.select`
  appearance: none;
  background: var(--dark);
  border-radius: var(--rounded);
  border: 1px solid var(--light);
  color: var(--light);
  display: block;
  font-family: 'Roboto';
  font-size: 1.4rem;
  height: 2.8rem;
  padding: 0.5rem;
  width: 100%;
`;

export const Caret = styled.div`
  position: absolute;
  top: 50%;
  right: 5px;
  color: var(--light);
  width: 25px;
  height: 25px;
  transform: translateY(-50%);

  svg {
    width: 25px;
    height: 25px;
  }
`;

export const Option = styled.option`
  font-family: 'Roboto';
  border: 1px solid red;
`;
