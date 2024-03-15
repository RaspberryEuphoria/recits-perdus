import styled from 'styled-components';

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
  font-family: 'Roboto';
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
  min-height: 200px;
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
  align-self: end;
  color: ${(props) => (props.isOverLimit ? 'var(--error)' : 'currentColor')};
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
