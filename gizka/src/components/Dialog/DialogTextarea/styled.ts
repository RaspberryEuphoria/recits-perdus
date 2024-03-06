import styled from 'styled-components';

type CounterProps = {
  isOverLimit: boolean;
};

export const GameSection = styled.div`
  align-items: flex-start;
  border-top: 0;
  border-bottom: 0;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
  gap: var(--space-1);
  height: 100vw;
  overflow: auto;
  padding: var(--space-2);
  scrollbar-color: var(--flashy-05) var(--primary);
  scrollbar-width: thin;
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
  width: 100%;
  min-height: 5rem;
  padding: 1rem;
  background: var(--dark);
  border: none;
  border-top: 1px solid var(--flashy);
  outline: none;
  color: currentColor;
  font-size: 1.4rem;
  font-family: 'Oxanium';
  resize: none;
  transition: position ease-in 0.5s;
  min-height: 10rem;
  border: 1px solid var(--light);
  border-radius: var(--rounded);
  font-family: 'Roboto';

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

export const Counter = styled.span<CounterProps>`
  color: ${(props) => (props.isOverLimit ? 'var(--error)' : 'currentColor')};
`;
