import styled from 'styled-components';

export const Home = styled.div<{ fullwidth?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${({ fullwidth }) => (fullwidth ? '100%' : '65%')};
  height: 100%;
  margin: 0 auto;
`;

export const Separator = styled.div`
  position: relative;
  width: 100%;
  margin: 2rem 0;
  text-align: center;

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    display: block;
    width: 25%;
    height: 1px;
    background-color: var(--flashy);
    transform: translateY(-50%);
  }

  &::before {
    left: 60%;
  }

  &::after {
    right: 60%;
  }
`;
