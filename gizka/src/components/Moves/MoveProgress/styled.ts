import styled from 'styled-components';

export const MoveProgress = styled.div`
  align-items: center;
  display: flex;
  font-weight: bold;
  justify-content: space-between;

  svg {
    fill: var(--move);
    height: 30px;
    width: 30px;
  }
`;

export const Score = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--move);
  font-size: 0.95rem;
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
  width: ${({ width }) => width * 2}px;
  background: var(--${({ color }) => color});
  box-shadow: 0 0 5px var(--${({ color }) => color});
`;

export const Chances = styled.div`
  font-size: 0.9rem;
  color: var(--light);
`;

export const Success = styled.span`
  color: var(--success);
`;

export const Mixed = styled.span`
  color: var(--mixed);
`;

export const Failure = styled.span`
  color: var(--failure);
`;
