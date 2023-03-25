import { Post } from '../../post/entities/post';

enum ScenarioStatus {
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  LOCKED = 'LOCKED',
}

type Scenario = {
  id: number;
  title: string;
  safeTitle: string;
  posts: Post[];
  status: ScenarioStatus;
  era: string;
  location: string;
  thumbnail: string;
};

type CreateScenarioDto = {
  title: string;
  safeTitle: string;
  status: ScenarioStatus;
};

export { CreateScenarioDto, Scenario, ScenarioStatus };
