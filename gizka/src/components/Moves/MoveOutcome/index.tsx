import { Character } from '@/utils/types/character';
import { MoveResult, Skill } from '@/utils/types/scenario';

import { FaireFaceAuDangerOutcome } from './FaireFaceAuDangerOutcome';

export type MoveOutcomeProps = {
  id: string;
  result: MoveResult;
  character: Character;
  skillName: Skill;
};

export function MoveOutcome(props: MoveOutcomeProps) {
  switch (props.id) {
    case 'FAIRE_FACE_AU_DANGER':
      return <FaireFaceAuDangerOutcome {...props} />;
    default:
      return null;
  }
}
