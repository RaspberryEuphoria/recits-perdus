import { Scenario } from '../../scenario/entities/scenario';

type Post = {
  id: number;
  content: string;
  scenario: Scenario;
  scenarioId: number;
  // character: Character;
  characterId: number;
};

type CreatePostDto = {
  content: string;
  scenarioId: number;
  characterId: number;
};

export { CreatePostDto, Post };
