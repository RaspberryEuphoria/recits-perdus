import styled from 'styled-components';

import { Media } from '@/utils/constants';

export const CharacterAvatar = styled.div<{ color: string; colorAtLightOpacity: string }>`
  display: flex;
  flex-direction: column;
  background: ${({ colorAtLightOpacity }) => colorAtLightOpacity};
  background-size: auto, auto;
  border: 1px solid ${({ color }) => color};
  box-shadow: 0px 0px 10px 0px ${({ colorAtLightOpacity }) => colorAtLightOpacity},
    inset 0px 0px 10px 0px ${({ colorAtLightOpacity }) => colorAtLightOpacity};
  transition: transform 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 10px 0px ${({ color }) => color},
      inset 0px 0px 10px 0px ${({ color }) => color};
    cursor: pointer;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

export const CharacterName = styled.div`
  width: 100%;
  margin: 1rem 0;
  color: var(--light);
  text-align: center;
  font-weight: 900;
  font-family: 'Exo 2';
  font-size: 1.5rem;
  text-transform: uppercase;

  @media (max-width: ${Media.lg}) {
    font-size: 1rem;
  }
`;
