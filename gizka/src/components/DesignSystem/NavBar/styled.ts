import styled from 'styled-components';

export const NavBar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
  margin: auto 2.5rem;
  padding: 2.5rem;
  justify-content: center;
`;

export const Link = styled.div<{ isDisabled: boolean }>`
  position: relative;
  gap: 2rem;
  font-size: 1.5rem;

  ${({ isDisabled }) => isDisabled && `display: none;`}

  a {
    color: var(--light);
    text-decoration: none;
  }

  &:hover {
    a {
      color: var(--flashy);

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -30px;
        width: 15px;
        height: 15px;
        background-color: var(--dark);
        border: 2px solid var(--flashy);
        border-radius: 50%;
        transform: translateY(-50%);
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: -25px;
        width: 9px;
        height: 9px;
        background-color: var(--flashy);
        border-radius: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;
