import styled from 'styled-components';

export const Mask = styled.div`
  background: var(--dark-08);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

export const Modal = styled.div`
  border-radius: var(--rounded);
  border: 1px solid var(--flashy-alt);
  display: flex;
  flex-direction: column;
  left: 50%;
  padding: var(--space-05);
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Content = styled.div`
  align-items: center;
  background: var(--secondary);
  border-radius: var(--rounded);
  flex-direction: column;
  padding: var(--space-1);
  display: flex;
`;
