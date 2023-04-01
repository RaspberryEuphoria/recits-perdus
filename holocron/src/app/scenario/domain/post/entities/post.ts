import { Scenario } from '../../scenario/entities/scenario';

type Post = {
  id: number;
  content: string;
  scenario: Scenario;
  scenarioId: number;
  // character: Character;
  characterId: number;
  isGameMaster: boolean;
};

type CreatePostDto = {
  content: string;
  scenarioId: number;
  characterId: number;
  isGameMaster: boolean;
};

export { CreatePostDto, Post };
