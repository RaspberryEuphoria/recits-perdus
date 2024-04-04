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
  color: ${({ color }) => color};
  font-family: 'Exo 2';
  font-size: 2rem;
  font-weight: 900;
  justify-content: flex-end;
  text-align: right;
  text-transform: uppercase;
  width: 100%;
`;

export const EditButton = styled.div`
  align-items: center;
  color: var(--flashy-alt);
  cursor: pointer;
  display: flex;
  font-family: 'Philosopher';
  font-size: 1rem;

  svg {
    width: 25px;
    height: 25px;
  }
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

export const List = styled.ul``;

export const Item = styled.li<{ color: string }>`
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

export const Label = styled.label`
  display: inline-block;
  margin-right: var(--space-1);
  width: 150px;
`;

export const Input = styled.input`
  background: var(--dark);
  border-radius: var(--rounded);
  border: 1px solid var(--flashy-alt);
  color: var(--light);
  height: 1.5rem;
  outline: none;
  padding: 0 var(--space-05);
`;

export const Block = styled.div<{ color: string }>`
  background: var(--dark-08);
  border: 1px solid ${({ color }) => color};
  padding: var(--space-1);
  position: relative;
  white-space: pre-line;

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
