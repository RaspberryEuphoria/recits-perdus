import styled from 'styled-components';

import { Media, TextColor } from '@/utils/constants';

export const Container = styled.div<{ color: string; hideBorder?: boolean }>`
  border: 1px solid ${({ color }) => color};
  ${({ hideBorder }) => hideBorder && 'border-right: none;'}
  display: flex;
  flex-direction: column;
  width: 200px;

  a {
    text-decoration: none;
    flex: 1 1;
  }
`;

export const DetailedPicture = styled.div<{
  color: string;
  colorAtLightOpacity: string;
  withEffectOnHover?: boolean;
}>`
  display: flex;
  flex-direction: column;
  background: ${({ colorAtLightOpacity }) => colorAtLightOpacity};
  background-size: auto, auto;
  border-top: 1px solid ${({ color }) => color};
  box-shadow: 0px 0px 10px 0px ${({ colorAtLightOpacity }) => colorAtLightOpacity},
    inset 0px 0px 10px 0px ${({ colorAtLightOpacity }) => colorAtLightOpacity};
  transition: transform 0.2s ease-in-out;

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  ${({ withEffectOnHover, color }) =>
    withEffectOnHover &&
    `
      &:hover {
        box-shadow: 0px 0px 10px 0px ${color},
          inset 0px 0px 10px 0px ${color};
        cursor: pointer;
      }
    `}
`;

export const Title = styled.div<{ color: string; colorAtLightOpacity: string }>`
  width: 100%;
  background-color: ${({ colorAtLightOpacity }) => colorAtLightOpacity};
  color: ${({ color }) => color};
  padding: var(--space-05);
  text-align: center;
  font-weight: 900;
  font-family: 'Exo 2';
  font-size: 1.3rem;
  text-transform: uppercase;
  text-align: right;

  @media (max-width: ${Media.lg}) {
    font-size: 1rem;
  }
`;

export const Pill = styled.div<{ color: TextColor }>`
  background: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  color: var(--dark);
  border-bottom: 0;
  border-right: 0;
  bottom: 0;
  height: 15px;
  position: absolute;
  right: 0;
  width: 15px;
`;

export const SubTitle = styled(Title)<{ withEffectOnHover?: boolean; color: TextColor }>`
  align-items: center;
  background: var(--dark-05);
  border-top: 1px solid ${({ color }) => color};
  color: var(--light-alt);
  display: flex;
  justify-content: center;
  font-family: 'Philosopher';
  font-size: 1rem;
  height: 100%;
  padding: var(--space-1) var(--space-05);
  position: relative;
  text-align: center;
  text-transform: none;
  overflow: hidden;

  @media (max-width: ${Media.lg}) {
    font-size: 0.8rem;
  }

  ${({ withEffectOnHover, color }) =>
    withEffectOnHover &&
    `
      &:hover {
        box-shadow: 0px 0px 10px 0px ${color},
          inset 0px 0px 10px 0px ${color};
        color: ${color};
      }
    `}
`;
