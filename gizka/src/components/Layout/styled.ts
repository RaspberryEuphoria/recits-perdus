import styled from 'styled-components';

export const Nav = styled.nav`
  align-items: center;
  justify-content: space-between;
  background: var(--dark-08);
  border-bottom: 1px solid var(--flashy);
  display: flex;
  font-size: 0.8rem;
  font-weight: bold;
  top: 0;
  left: 0;
  position: sticky;

  a {
    color: var(--flashy-alt);
    text-decoration: none;
  }
`;

export const Bradcrumb = styled.div`
  align-items: center;
  display: flex;
  margin: var(--space-1);
`;

export const BradcrumbSeparator = styled.span`
  color: var(--light);
  width: 20px;
  height: 20px;

  svg {
    width: 20px;
    height: 20px;
    transform: rotate(-90deg);
  }
`;

export const Tabs = styled.div`
  height: 100%;
`;

export const Tab = styled.button<{ isOpen: boolean; isDisabled: boolean }>`
  background: none;
  color: var(--light);
  border: none;
  height: 100%;
  padding: var(--space-05) var(--space-2);
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Oxanium';
  text-transform: uppercase;

  ${(props) =>
    props.isOpen &&
    `
      background: linear-gradient(180deg, var(--flashy-05) 0%, var(--dark-05) 50%, var(--dark) 100%);
      color: var(--light);
      border: 1px solid var(--flashy);
      border-bottom: 0;
      border-top: 0;
      text-shadow: 0 0 5px var(--flashy);

      &:last-of-type {
        border-right: 0;
      }
    `}
  &:hover {
    cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
    text-shadow: 0 0 5px var(--flashy);
  }

  ${(props) =>
    props.isDisabled &&
    `
      background: var(--primary);
      color: var(--light-05);
      opacity: 0.5;
      pointer-events: none;
    `}
`;
