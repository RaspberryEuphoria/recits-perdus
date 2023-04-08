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

export const Description = styled.p`
  position: absolute;
  top: 50%;
  right: 5rem;
  max-width: 25rem;
  padding: 0 1.5rem;
  border-right: 2px solid var(--flashy);
  text-transform: none;
  transform: translateY(-50%);
  text-align: right;
  font-size: 1.2rem;
`;

export const Link = styled.div`
  position: relative;
  gap: 2rem;
  text-transform: uppercase;
  font-size: 1.5rem;

  a {
    position: relative;
    color: var(--light);
    text-decoration: none;
  }

  &:hover {
    & ${Description} {
      display: inline-block;
    }

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

  &:first-of-type {
    & ${Description} {
      /* display: inline-block; */
    }
  }

  & ${Description} {
    display: none;
  }
`;
