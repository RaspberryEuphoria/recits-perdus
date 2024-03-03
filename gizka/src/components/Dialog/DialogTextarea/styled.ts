import styled from 'styled-components';

type TextareaProps = {
  isOpen: boolean;
};

type CounterProps = {
  isOverLimit: boolean;
};

export const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--dark-08);
  z-index: 10;
`;

export const GameSection = styled.div`
  background: var(--primary);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  align-items: flex-start;
  width: 50vw;
  height: 100vw;
  overflow: auto;
  border: 1px solid var(--flashy);
  border-top: 0;
  border-bottom: 0;
  padding: 50px;
  font-family: 'Roboto';
`;

export const Slots = styled.div`
  position: relative;
  display: flex;
  gap: var(--space-1);

  &::after {
    content: '';
    position: absolute;
  }
`;

export const Help = styled.div`
  color: var(--dice);

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

export const Textarea = styled.textarea<TextareaProps>`
  width: 100%;
  min-height: 5rem;
  padding: 1rem;
  background: var(--dark);
  border: none;
  border-top: 1px solid var(--flashy);
  outline: none;
  color: currentColor;
  font-size: 1.4rem;
  font-family: 'Kontrapunkt-Light';
  resize: none;
  transition: position ease-in 0.5s;
  z-index: 100;

  ${(props) => {
    if (props.isOpen) {
      return `
        width: 100%;
        height: 15vw;
        border: 1px solid var(--light);
        border-radius: var(--rounded);
        font-family: 'Roboto';
      `;
    } else {
      return `
        position: sticky;
        bottom: 0;
        align-self: flex-start;

        &:hover {
          &::placeholder {
            text-shadow: 0 0 0.5rem var(--flashy);
          }
        }`;
    }
  }}
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
