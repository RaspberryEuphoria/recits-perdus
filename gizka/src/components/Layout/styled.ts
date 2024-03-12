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
  align-items: center;
  display: flex;
  gap: var(--space-1);
  margin-right: var(--space-2);
  height: 100%;
`;

export const Tab = styled.button<{ isOpen: boolean; isDisabled: boolean }>`
  background: none;
  color: var(--light);
  border: 1px solid var(--light);
  border-radius: var(--rounded);
  box-shadow: 0 0 10px var(--light-05), inset 0 0 10px var(--light-05);
  /* border: none; */
  padding: 5px var(--space-2);
  position: relative;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Oxanium';
  text-transform: uppercase;
  transform: skew(35deg);
  transition: border 0.2s ease-in, box-shadow 0.2s ease-in;

  &:hover {
    border-color: var(--flashy-alt);
    box-shadow: 0 0 10px var(--flashy-alt-05), inset 0 0 10px var(--flashy-alt-05);
    cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
    text-shadow: 0 0 5px var(--flashy-alt);
  }

  ${(props) =>
    props.isOpen &&
    `
      box-shadow: 0 0 10px var(--flashy-alt-05), inset 0 0 10px var(--flashy-alt-05);
      color: var(--light);
      border-color: var(--flashy-alt);
      text-shadow: 0 0 5px var(--flashy-alt);
    `}

  ${(props) =>
    props.isDisabled &&
    `
      border-color: none;
      box-shadow: none;
      color: var(--light-05);
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const TabLabel = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) skew(-35deg);
`;

export const TabHiddenLabel = styled.span`
  opacity: 0;
`;
