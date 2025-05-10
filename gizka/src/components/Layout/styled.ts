import styled from 'styled-components';

import DialogBackground from '@/public/images/dialog_background.png';
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
  font-size: 0.8rem;
  justify-content: space-between;
  min-height: 4rem;
  padding: 0 var(--space-1);
  padding-top: 8px; /* to compensate for the border */
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

export const AsideSection = styled.aside<{ fullwidth?: boolean }>`
  background: url('${DialogBackground.src}'), var(--dark-08);
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

  ${(props) =>
    props.fullwidth &&
    `
      flex: 90%;
      margin: 0 auto;
      max-width: 90%;
      min-width: 1000px;
      width: 90%;
  `}
`;

export const Nav = styled.nav<{ justifyCenter?: boolean; noPadding?: boolean }>`
  align-items: center;
  justify-content: space-between;
  background: var(--dark-08);
  border-bottom: 1px solid var(--flashy);
  display: flex;
  font-size: 0.8rem;
  font-weight: bold;
  top: 0;
  left: 0;
  padding: var(--space-1);
  position: sticky;

  ${(props) =>
    props.justifyCenter &&
    `
      justify-content: center;
  `}

  ${(props) =>
    props.noPadding &&
    `
      padding: 0;
  `}
`;

export const Tabs = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100%;
  margin: 0 auto;

  @media (max-width: ${Media.md}) {
    flex-direction: column;
  }
`;

export const Tab = styled.button<{ isOpen: boolean; isDisabled: boolean }>`
  background: none;
  color: var(--light);
  border: none;
  padding: var(--space-1) var(--space-2);
  position: relative;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Philosopher';
  text-transform: uppercase;
  transition: border 0.2s ease-in, box-shadow 0.2s ease-in;

  &:hover {
    cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
    text-shadow: 0 0 5px var(--flashy-alt);

    &::before {
      box-shadow: 0 0 5px var(--flashy-05);
    }

    &::after {
      background-color: var(--flashy);
      width: 9px;
      height: 9px;
    }
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -19px;
    left: 50%;
    width: 15px;
    height: 15px;
    background-color: var(--dark);
    border: 2px solid var(--flashy);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -9px;
    left: 50%;
    width: 9px;
    height: 0;
    background-color: var(--dark);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.3s ease-out, height 0.1s ease-out;
  }

  ${(props) =>
    props.isOpen &&
    `
      border: none;
      box-shadow: none;
      color: var(--flashy-alt);
      pointer-events: none;
      text-shadow: none;

      &::before {
        box-shadow: 0 0 15px var(--flashy-05);
      }

      &::after {
        background-color: var(--flashy);
        width: 9px;
        height: 9px;
      }
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

  @media (max-width: ${Media.md}) {
    &::before,
    &::after {
      display: none;
    }
  }
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
