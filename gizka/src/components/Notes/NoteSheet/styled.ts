import styled from 'styled-components';

import { Avatar } from '@/components/DesignSystem/Avatar/styled';

export const Note = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 100%;

  ${Avatar} {
    border-right: 0;

    &:hover {
      box-shadow: none;
      cursor: default;
    }
  }
`;

export const AvatarWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  background: var(--dark-08);
  border: 1px solid var(--flashy);
  flex: 1;
  padding: var(--space-1);
`;

export const Name = styled.h1`
  color: var(--flashy);
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

export const Title = styled.h1`
  color: var(--flashy);
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

export const Item = styled.li`
  border-bottom: 1px solid var(--flashy);
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

export const Block = styled.div`
  background: var(--dark-08);
  border: 1px solid var(--flashy);
  padding: var(--space-1);
  position: relative;
  white-space: pre-line;

  &::before {
    background: var(--flashy);
    content: '';
    position: absolute;
    right: var(--space-2);
    height: var(--space-1);
    top: 0;
    transform: translate(0, -100%);
    width: 1px;
  }
`;
