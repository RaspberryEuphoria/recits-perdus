import styled from 'styled-components';

import { CharacterAvatar } from '@/components/CharacterAvatar/styled';

export const BackButton = styled.div`
  align-items: center;
  color: var(--flashy);
  cursor: pointer;
  display: flex;
  position: relative;

  svg {
    height: 25px;
    transform: rotate(90deg);
    width: 25px;
  }
`;

export const CharacterSheet = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 100%;

  ${CharacterAvatar} {
    border-right: 0;

    &:hover {
      box-shadow: none;
      cursor: default;
    }
  }
`;

export const Character = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const CharacterData = styled.div<{ color: string }>`
  background: var(--dark-08);
  border: 1px solid ${({ color }) => color};
  flex: 1;
  padding: var(--space-1);
`;

export const CharacterName = styled.h1<{ color: string }>`
  width: 100%;
  color: ${({ color }) => color};
  text-align: right;
  font-weight: 900;
  font-family: 'Exo 2';
  font-size: 2rem;
  text-transform: uppercase;
`;

export const Title = styled.h1<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 1.5rem;
  margin-bottom: var(--space-05);
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  padding: var(--space-05);
`;

export const Skills = styled.ul``;

export const Skill = styled.li<{ color: string }>`
  border-bottom: 1px solid ${({ color }) => color};
  gap: var(--space-05);
  padding: var(--space-05) 0;

  p {
    font-size: 0.9rem;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

export const Block = styled.div<{ color: string }>`
  background: var(--dark-08);
  border: 1px solid ${({ color }) => color};
  padding: var(--space-1);
  position: relative;

  &::before {
    background: ${({ color }) => color};
    content: '';
    position: absolute;
    right: var(--space-2);
    height: var(--space-1);
    top: 0;
    transform: translate(0, -100%);
    width: 1px;
  }
`;
