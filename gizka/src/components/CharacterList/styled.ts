import styled from 'styled-components';

export const CharacterList = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
  padding: 5rem;
  margin: auto;
`;

export const Character = styled.div<{ color: string; colorAtLightOpacity: string }>`
  display: flex;
  flex-direction: column;
  width: 204px; // 200 + border
  /* background: var(--light-08); */
  /* border: 2px solid var(--light); */
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
  }
`;

export const CharacterName = styled.div<{ color: string }>`
  width: 100%;
  margin: 1rem 0;
  color: var(--light);
  text-align: center;
  font-weight: bold;
  font-family: 'HKGrotesk-Black';
  font-size: 1.5rem;
  text-transform: uppercase;
`;
