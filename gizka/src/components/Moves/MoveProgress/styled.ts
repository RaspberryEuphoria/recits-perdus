import styled from 'styled-components';

export const MoveProgress = styled.div`
  align-items: center;
  /* display: flex; */
  font-weight: bold;
  color: var(--move);

  svg {
    fill: var(--move);
    height: 30px;
    width: 30px;
  }
`;

export const Steps = styled.div`
  gap: 0;
`;

export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
`;

export const Progress = styled.div<{ width: number; color: string }>`
  height: 1px;
  width: ${({ width }) => width}px;
  background: var(--${({ color }) => color});
  box-shadow: 0 0 5px var(--${({ color }) => color});
  margin-bottom: var(--space-05);
`;
