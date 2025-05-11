import Link from 'next/link';
import styled from 'styled-components';

export const ScenariosList = styled.section`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
`;

export const ScenarioLabel = styled.span`
  font-family: 'Philosopher';
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.2rem;
`;

export const MiniAvatar = styled.div<{ color: string }>`
  position: absolute;
  bottom: 0px;
  left: 0px;

  width: 40px;
  height: 40px;

  img {
    border-radius: 0 var(--rounded) var(--rounded) 0;
    border: 1px solid var(--flashy);
    border-left: 0;
    border-bottom: 0;
  }
`;

export const ScenarioDescription = styled.span`
  font-family: 'Philosopher';
  font-weight: normal;
  color: var(--flashy-alt);
  font-size: 0.9rem;
`;

export const CharactersList = styled.span`
  margin-top: 1rem;
  font-family: 'Philosopher';
  font-weight: normal;
  width: calc(100% - 40px * 2); // Let some space for the avatar
`;

export const CharactersCount = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--dark-08);
  text-shadow: var(--light) 1px 0 10px;
`;

export const Scenario = styled(Link)<{ background: string }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 0 0 30%;
  padding: 1rem;
  background-image: ${(props) =>
      props.background && `url('/images/scenarios/thumbnails/${props.background}.png'),`}
    linear-gradient(43deg, var(--flashy-02) 0%, var(--flashy-08) 46%, var(--flashy-05) 100%);
  background-size: cover, auto, auto, auto;
  box-shadow: 0px 0px 10px 0px var(--flashy-05), inset 0px 0px 10px 0px var(--flashy-05);
  border: 1px solid var(--flashy);
  border-radius: var(--rounded);
  color: var(--light);
  font-weight: bold;
  text-shadow: var(--primary) 1px 0 10px;
  text-decoration: none;
  text-align: center;
  overflow: hidden;

  &:hover {
    box-shadow: 0px 0px 10px 0px var(--flashy), inset 0px 0px 10px 0px var(--flashy);

    ${ScenarioLabel}, ${CharactersList} {
      color: var(--light);
    }
  }

  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }
`;

export const Filters = styled.div`
  h1 {
    font-size: 1.5rem;
    margin-bottom: var(--space-1);

    strong {
      color: var(--flashy);
    }
  }

  h2 {
    font-size: 1.2rem;
    margin: var(--space-05) 0;
  }
`;

export const TextInput = styled.input`
  background: var(--secondary);
  border: none;
  border-radius: var(--rounded);
  height: 2rem;
  padding: var(--space-1);
  width: 200px;

  &:hover,
  &:focus {
    outline: none;
  }
`;
