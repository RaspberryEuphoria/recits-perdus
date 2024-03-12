import styled from 'styled-components';

import { Media } from '@/utils/constants';

export const Header = styled.header`
  display: flex;
  min-height: 7.5rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--flashy);
  position: relative;
  background: var(--primary);
  padding: 0 var(--space-1);

  strong {
    color: var(--flashy-alt);
  }

  &::after {
    background: var(--flashy);
    bottom: 8px;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
  }
`;

export const Footer = styled.footer`
  align-items: center;
  background: var(--primary);
  border-top: 1px solid var(--flashy);
  display: flex;
  font-size: 0.7rem;
  justify-content: space-between;
  min-height: 4rem;
  padding-top: 8px; /* to compensate for the border */
  padding: 0 var(--space-1);
  position: relative;

  &::after {
    background: var(--flashy);
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    top: 8px;
    width: 100%;
  }
`;

export const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 55%;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const AsideSection = styled.aside`
  background: url('../../public/images/dialog_background.png'), var(--dark-08);
  border-left: 1px solid var(--flashy);
  border-right: 1px solid var(--flashy);
  display: flex;
  flex-direction: column;
  flex: 0 0 40%;
  margin-right: 5%;
  min-width: 40%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 40%;
`;

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

export const Main = styled.main`
  background-repeat: no-repeat;
  background-size: cover;
  background: var(--primary);
  display: flex;
  height: 100%;
  justify-content: flex-end;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;

  @media (max-width: ${Media.md}) {
    overflow: initial;
    flex-direction: column;
    height: auto;

    ${Nav} {
      position: initial;
      flex-direction: column;
    }

    ${Tabs} {
      margin: var(--space-1);
    }

    ${Tab} {
      font-size: 1rem;
    }

    ${MainSection},${AsideSection} {
      flex: 1;
      margin: 0;
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      overflow: initial;
      height: auto;
      border: none;
    }

    ${AsideSection} {
      border-top: 1px solid var(--flashy);

      footer {
        position: initial;
      }
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  scrollbar-color: var(--flashy-05) var(--primary);
  scrollbar-width: thin;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: var(--space-1);
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
export const TabLabel = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) skew(-35deg);
`;

export const TabHiddenLabel = styled.span`
  opacity: 0;
`;
