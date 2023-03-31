import { Character } from './character';

enum ScenarioStatus {
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  LOCKED = 'LOCKED',
}

export type Post = {
  id: number;
  content: string;
  scenario: Scenario;
  scenarioId: number;
  character: Character;
  characterId: number;
};

type Scenario = {
  id: number;
  title: string;
  safeTitle: string;
  status: ScenarioStatus;
  era: string;
  location: string;
  thumbnail: string;
  introduction: string;

  posts: Post[];
  characters: Character[];
};

export { ScenarioStatus, type Scenario };
