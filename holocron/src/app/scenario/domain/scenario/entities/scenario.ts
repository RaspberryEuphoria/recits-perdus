import { TextColor } from '../../../../../constants';
import { Post } from '../../post/entities/post';

enum ScenarioStatus {
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  LOCKED = 'LOCKED',
}

// @todo replace by import from Prisma.Client instead
type Scenario = {
  id: number;
  title: string;
  safeTitle: string;
  posts: Post[];
  status: ScenarioStatus;
  era: string;
  location: string;
  thumbnail: string;
  introduction: string;
};

type CreateScenarioDto = Pick<
  Scenario,
  'title' | 'safeTitle' | 'status' | 'introduction' | 'era'
> & {
  characterId: number;
  textColor: TextColor;
};

export { CreateScenarioDto, Scenario, ScenarioStatus };
