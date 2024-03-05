import Image from 'next/image';
import styled from 'styled-components';

export const DialogPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 4rem 0;
  line-height: 2rem;
  font-size: 1.4rem;
  font-family: 'Oxanium';

  &:first-of-type {
    margin-top: 0;
    text-align: center;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const DialogInfos = styled.div`
  display: flex;
  align-items: center;
  margin-left: -1rem;
  gap: 0.5rem;
`;

export const DialogPostAuthor = styled.span`
  display: block;
  font-style: italic;
`;

export const DialogAvatar = styled(Image)<{ color: string }>`
  border: 1px solid ${({ color }) => color};
  width: 40px;
  height: 46px;
`;

export const DialogPostContent = styled.p<{ color: string }>`
  text-shadow: 0 0 3px var(--primary), 1px 1px 3px var(--primary);

  & strong {
    color: ${({ color }) => color};
  }

  & bold {
    font-weight: bold;
  }
`;

export const CharacterName = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: bold;
`;

export const DialogMove = styled.div`
  background: var(--secondary);
  border-radius: var(--rounded);
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  padding: var(--space-05) var(--space-1);
`;
