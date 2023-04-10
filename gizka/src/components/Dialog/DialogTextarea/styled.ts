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
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  align-items: flex-end;
  border: 50px solid transparent; // Prevent accidental click outside the modal
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

export const Slot = styled.div<{ isDiceDragged?: boolean; isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-1);
  box-shadow: 0 0 0 0.5em transparent;

  @keyframes pulse-d {
    0% {
      box-shadow: 0 0 0 0 var(--dice);
    }
  }

  ${(props) => {
    if (props.isDiceDragged) {
      return `
        animation: pulse-d 1s;
        animation-iteration-count: infinite;
    `;
    }
  }}
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
        width: 50vw;
        height: 15vw;
        border: 1px solid var(--light);
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
  width: 50vw;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-1);
`;

export const Counter = styled.span<CounterProps>`
  color: ${(props) => (props.isOverLimit ? 'var(--error)' : 'currentColor')};
`;
