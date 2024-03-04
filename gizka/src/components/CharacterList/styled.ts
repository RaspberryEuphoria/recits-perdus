import styled from 'styled-components';

export const CharacterList = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-1);
  margin: auto;
  width: 100%;
`;

export const CharacterSheet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  width: 204px; // 200 + border
  max-width: 20%;
`;

export const Character = styled.div<{ color: string; colorAtLightOpacity: string }>`
  display: flex;
  flex-direction: column;
  /* width: 204px; // 200 + border */
  width: 100%;
  background: url('/images/dialog_background.png'),
    ${({ colorAtLightOpacity }) => colorAtLightOpacity};
  background-size: auto, auto;
  border: 2px solid ${({ color }) => color};
  border-radius: 2px;
  box-shadow: 0px 0px 10px 0px ${({ colorAtLightOpacity }) => colorAtLightOpacity},
    inset 0px 0px 10px 0px ${({ colorAtLightOpacity }) => colorAtLightOpacity};
  transition: transform 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 10px 0px ${({ color }) => color},
      inset 0px 0px 10px 0px ${({ color }) => color};
  }

  &:hover {
    /* transform: scale(1.1); */
    cursor: pointer;
  }

  img {
    display: block;
    border-radius: 2px 2px 0 0;
    max-width: 100%;
    height: auto;
  }
`;

export const CharacterName = styled.div<{ color: string }>`
  width: 100%;
  margin: 1rem 0;
  color: var(--light);
  text-align: center;
  font-weight: 900;
  font-family: 'Exo 2';
  font-size: 1.5rem;
  text-transform: uppercase;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
`;

export const Stat = styled.div<{ color: string }>`
  align-items: center;
  display: flex;
  font-size: 1.5rem;
  flex-direction: row;
  gap: var(--space-05);

  strong {
    color: ${({ color }) => color};
  }

  svg {
    width: 25px;
    height: 25px;
    fill: ${({ color }) => color};
  }
`;
