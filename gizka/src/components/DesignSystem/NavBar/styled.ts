import styled from 'styled-components';

import SystemImage from '@/public/images/system.png';
import { Media } from '@/utils/constants';

export const NavBar = styled.nav`
  display: flex;
  gap: var(--space-2);
  justify-content: center;
  text-transform: uppercase;
  font-family: 'Exo 2', sans-serif;
  font-weight: 900;

  @media (max-width: ${Media.md}) {
    flex-direction: column;
    gap: var(--space-05);
  }
`;

export const Link = styled.div<{ isDisabled: boolean; isActive?: boolean }>`
  background: none;
  position: relative;
  font-size: 1.5rem;
  padding: var(--space-1) 0;

  ${({ isDisabled }) => isDisabled && `display: none;`}

  svg {
    width: 25px;
    height: 25px;
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    color: var(--light);
    gap: 0.5rem;
    text-decoration: none;
    transition: color 0.3s ease-out;
  }

  &::after {
    content: '';
    background: url('${SystemImage.src}') no-repeat center;
    width: 211px;
    height: 170px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease-out;
    animation: rotate 5s linear infinite;
  }

  &:hover {
    a {
      color: var(--flashy);
      text-shadow: 0 0 5px var(--flashy-05);
    }

    &::after {
      opacity: 0.3;
    }
  }

  ${({ isActive }) =>
    isActive &&
    `
      color: var(--flashy-alt);
    `}

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;
