import styled from 'styled-components';

export const Holster = styled.div<{ isActive: boolean }>`
  position: fixed;
  top: 2.5rem;
  right: calc(35% + 5% - 1px); // aside width + margin - border
  display: flex;
  padding: 0.2rem;
  border: 1px solid var(--${(props) => (props.isActive ? 'dice' : 'light')});
  gap: 0.2rem;
`;

export const DialogThread = styled.div`
  position: relative;
  padding: var(--space-2);
  white-space: pre-line;
`;
