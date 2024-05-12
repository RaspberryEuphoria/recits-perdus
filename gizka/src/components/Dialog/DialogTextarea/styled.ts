import Image from 'next/image';
import styled from 'styled-components';

import HoloEffect from '@/public/images/holo_effect.png';

type CounterProps = {
  isOverLimit: boolean;
};

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

export const GameSection = styled.div`
  align-items: flex-start;
  border-top: 0;
  border-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  overflow: auto;
  padding: var(--space-1);
`;

export const Help = styled.div`
  color: var(--flashy-alt);

  p {
    color: var(--light);
    margin: var(--space-05) 0 0 var(--space-1);
    font-size: 0.8rem;
  }
`;

export const SkillList = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;

  &::after {
    content: '';
    flex: auto;
  }
`;

export const Skill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background: var(--flashy);
`;

export const Preview = styled.p<{ color: string }>`
  background: var(--secondary);
  border-radius: var(--rounded);
  font-size: 1.4rem;
  line-height: 2rem;
  min-height: 350px;
  min-width: 100%;
  padding: 1rem;
  text-shadow: 0 0 3px var(--primary), 1px 1px 3px var(--primary);
  white-space: pre-line;

  & strong {
    color: ${({ color }) => color};
  }

  & bold {
    font-weight: bold;
  }
`;

export const Textarea = styled.textarea`
  background: var(--dark);
  border: 1px solid var(--light);
  border-radius: var(--rounded);
  outline: none;
  color: currentColor;
  font-size: 1.4rem;
  font-family: 'Roboto';
  height: 350px;
  padding: 1rem;
  resize: none;
  transition: position ease-in 0.5s;
  width: 100%;

  &:focus {
    border-color: var(--flashy);
  }
`;

export const TextareaBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-1);
`;

export const Counter = styled.div<CounterProps>`
  align-items: end;
  color: ${(props) => (props.isOverLimit ? 'var(--error)' : 'currentColor')};
  display: flex;
  justify-content: end;
  width: 100%;
`;

export const Errors = styled.ul`
  background: var(--dark-05);
  border-radius: var(--rounded);
  border: 1px solid var(--error);
  color: var(--error);
  font-weight: bold;
  padding: var(--space-1);
  width: 100%;
`;

export const Error = styled.li`
  margin-bottom: var(--space-05);

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const DialogIllustrationContainer = styled.div`
  border: 1px solid var(--flashy);
  border-radius: var(--rounded);
  box-shadow: 0 0 10px var(--flashy), inset 0 0 10px var(--flashy);
  position: relative;

  &::after {
    background-image: url(${HoloEffect.src});
    content: '';
    display: block;
    height: 100%;
    left: 0;
    opacity: 0.1;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

export const DialogIllustration = styled(Image)`
  border-radius: var(--rounded);
  display: block;
  filter: grayscale(30%);
  height: auto;
  width: 100%;
`;
