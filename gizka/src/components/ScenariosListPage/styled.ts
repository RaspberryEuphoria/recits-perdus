import styled from 'styled-components';

export const ScenariosList = styled.section`
  padding: 2.5rem;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  flex-grow: 1;
  flex: 1 1 0px;
  gap: 1rem;
`;

export const Scenario = styled.li<{ background: string }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 25%;
  gap: 0.2rem;
  max-width: 80%;
  height: 10rem;
  padding: 1rem;
  background-image: url('/images/scenarios/thumbnails/${(props) => props.background}.png'),
    url('/images/dialog_background.png'),
    linear-gradient(43deg, var(--flashy-02) 0%, var(--flashy-08) 46%, var(--flashy-05) 100%);
  background-size: cover, auto, auto, auto;
  box-shadow: 0px 0px 10px 0px var(--flashy-05), inset 0px 0px 10px 0px var(--flashy-05);
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: var(--primary) 1px 0 10px;

  &:hover {
    box-shadow: 0px 0px 10px 0px var(--flashy), inset 0px 0px 10px 0px var(--flashy);
  }
`;

export const ScenarioLabel = styled.span`
  font-family: 'Kontrapunkt-Bold';
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.2rem;
  text-align: center;
`;

export const ScenarioDescription = styled.span`
  font-family: 'Kontrapunkt-Light';
  font-weight: normal;
  font-size: 1rem;
  color: var(--dice);
`;
