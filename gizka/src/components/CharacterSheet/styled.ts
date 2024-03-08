import styled from 'styled-components';

export const BackButton = styled.div`
  align-items: center;
  color: var(--flashy);
  cursor: pointer;
  display: flex;

  svg {
    height: 25px;
    transform: rotate(90deg);
    width: 25px;
  }
`;

export const CharacterSheet = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-1);
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: end;
`;

export const Character = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const CharacterAvatar = styled.div<{ color: string; colorAtLightOpacity: string }>`
  align-self: flex-start;
  background: url('/images/dialog_background.png'),
    ${({ colorAtLightOpacity }) => colorAtLightOpacity};
  background-size: auto, auto;
  border: 1px solid ${({ color }) => color};
  border-right: 0;
  box-shadow: 0px 0px 10px 0px ${({ colorAtLightOpacity }) => colorAtLightOpacity},
    inset 0px 0px 10px 0px ${({ colorAtLightOpacity }) => colorAtLightOpacity};
  transition: transform 0.2s ease-in-out;

  img {
    display: block;
    border-radius: 2px 2px 0 0;
    max-width: 100%;
    height: auto;
  }
`;

export const CharacterData = styled.div<{ color: string }>`
  background: var(--dark-08);
  border: 1px solid ${({ color }) => color};
  flex: 1;
  padding: var(--space-1);
`;

export const CharacterName = styled.h1<{ color: string }>`
  width: 100%;
  color: ${({ color }) => color};
  text-align: right;
  font-weight: 900;
  font-family: 'Exo 2';
  font-size: 2rem;
  text-transform: uppercase;
`;

export const Title = styled.h1<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 1.5rem;
  margin-bottom: var(--space-05);
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  padding: var(--space-05);
`;

export const Skills = styled.ul``;

export const Skill = styled.li<{ color: string }>`
  border-bottom: 1px solid ${({ color }) => color};
  gap: var(--space-05);
  padding: var(--space-05) 0;

  p {
    font-size: 0.9rem;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

export const Block = styled.div<{ color: string }>`
  background: var(--dark-08);
  border: 1px solid ${({ color }) => color};
  padding: var(--space-1);
  position: relative;

  &::before {
    background: ${({ color }) => color};
    content: '';
    position: absolute;
    right: var(--space-2);
    height: var(--space-1);
    top: 0;
    transform: translate(0, -100%);
    width: 1px;
  }
`;
