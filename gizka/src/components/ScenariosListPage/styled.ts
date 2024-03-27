import Link from 'next/link';
import styled from 'styled-components';

export const ScenariosList = styled.section`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
`;

export const Scenario = styled(Link)<{ background: string }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 0 0 30%;
  padding: 1rem;
  background-image: url('/images/scenarios/thumbnails/${(props) => props.background}.png'),
    linear-gradient(43deg, var(--flashy-02) 0%, var(--flashy-08) 46%, var(--flashy-05) 100%);
  background-size: cover, auto, auto, auto;
  box-shadow: 0px 0px 10px 0px var(--flashy-05), inset 0px 0px 10px 0px var(--flashy-05);
  border: 2px solid var(--flashy);
  border-radius: 2px;
  color: inherit;
  font-weight: bold;
  text-shadow: var(--primary) 1px 0 10px;
  text-decoration: none;
  text-align: center;

  &:hover {
    box-shadow: 0px 0px 10px 0px var(--flashy), inset 0px 0px 10px 0px var(--flashy);
  }

  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }
`;

export const ScenarioLabel = styled.span`
  font-family: 'Oxanium';
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.2rem;
`;

export const ScenarioDescription = styled.span`
  font-family: 'Oxanium';
  font-weight: normal;
  color: var(--flashy-alt);
  font-size: 0.9rem;
`;

export const CharactersList = styled.span`
  margin-top: 1rem;
  font-family: 'Oxanium';
  font-weight: normal;
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
