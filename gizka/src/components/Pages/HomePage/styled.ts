import Image from 'next/image';
import styled from 'styled-components';

import G4BY from '@/public/images/g4by.png';
import { Media } from '@/utils/constants';

export const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  justify-content: space-between;
  margin: auto var(--space-1);
  padding: var(--space-2);

  @media (min-width: ${Media.md}) {
    flex-direction: row;
    margin: auto var(--space-2);
  }
`;

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);

  @media (min-width: ${Media.md}) {
    max-width: 50%;
  }
`;

export const TextBlock = styled.div`
  background: var(--primary);
  border: 1px solid var(--flashy);
  padding: var(--space-1);
  z-index: 1;

  strong {
    color: var(--flashy-alt);
  }

  svg {
    color: var(--flashy);
    fill: var(--flashy);
    height: 25px;
    width: 25px;
  }

  &:first-of-type {
    position: relative;

    &::before {
      background-image: url(${G4BY.src});
      content: '';
      height: 98px;
      left: 15px;
      opacity: 0.9;
      position: absolute;
      top: -1px;
      transform: translateY(-100%);
      width: 103px;
      z-index: 0;
    }
  }
`;

export const Separator = styled.hr`
  color: var(--flashy-05);
`;

export const Title = styled.span`
  color: var(--flashy-alt);
  display: block;
  position: relative;
  text-shadow: var(--shadow);
  z-index: 100;
`;

export const Stat = styled.span``;

export const CharacterName = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: bold;
`;

export const Avatar = styled(Image)<{ color: string }>`
  border: 1px solid ${({ color }) => color};
  width: 40px;
  height: 46px;
`;

export const LastPost = styled.div`
  align-items: center;
  display: flex;
  gap: var(--space-05);
`;

export const PartnersWrapper = styled.div`
  padding-left: var(--space-1);
  padding-bottom: var(--space-1);
  padding: var(--space-2);
`;

export const Partners = styled.ul`
  display: flex;
  align-items: center;
  margin-top: var(--space-05);
`;

export const Partner = styled.li`
  img {
    border: 1px solid var(--flashy);
  }
`;
