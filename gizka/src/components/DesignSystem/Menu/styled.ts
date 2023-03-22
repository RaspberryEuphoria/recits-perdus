import styled from 'styled-components';

export const Menu = styled.nav`
  display: flex;
  gap: 2.5rem;
  padding: 2rem;
  flex-flow: wrap;
  width: auto;
  align-items: flex-start;
`;

export const Label = styled.header`
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--light);
  text-transform: uppercase;
  font-size: 1.5rem;
`;

export const Link = styled.div`
  position: relative;
  flex-basis: 100%;
  align-self: stretch;
  max-width: calc(33% - 1.5rem);
  padding: 1rem;
  background: var(--dark-08);
  /* box-shadow: 0 0 5px var(--flashy), inset 0 0 3px var(--flashy); */

  a {
    color: var(--light);
    text-decoration: none;
  }

  &:hover {
    box-shadow: 0 0 5px var(--flashy), inset 0 0 5px var(--flashy);

    & ${Label} {
      /* border-bottom: 2px solid var(--flashy); */
    }
  }
`;

export const Description = styled.p`
  padding-top: 0.5rem;
  font-size: 1.2rem;
`;
