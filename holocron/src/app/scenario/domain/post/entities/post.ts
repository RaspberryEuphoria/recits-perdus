import { Dice } from './dice';
import { MoveIntent } from './move';

type Post = {
  id: number;
  content: string;
  // scenario: Scenario;
  scenarioId: number;
  // character: Character;
  characterId: number;
  isGameMaster: boolean;
  turn: number;

  dices?: Array<Dice>;
  createdAt: Date;
  updatedAt: Date;
  // skill?: Skill;
};

interface Asset {
  afterResolveChallengeDices: (dices: Dice[]) => Dice[];
  afterActionMove: () => void;
}

type CreatePostDto = {
  content: string;
  scenarioId: number;
  characterId: number;
  action?: {
    move: MoveIntent;
  };
};

type UpdatePostDto = {
  id: number;
  content: string;
};

type Crop = {
  x: number;
  y: number;
  width: number;
  height: number;
};
type UpdatePostIllustrationDto = { id: number; base64Image: string; crop: Crop };

export { Asset, CreatePostDto, Dice, Post, UpdatePostDto, UpdatePostIllustrationDto };
