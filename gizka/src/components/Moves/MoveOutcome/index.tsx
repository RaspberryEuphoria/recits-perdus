import { Character } from '@/utils/types/character';
import { Move, Moves } from '@/utils/types/scenario';

import { FaireFaceAuDangerOutcome } from './FaireFaceAuDangerOutcome';
import { PayerLePrixOutcome } from './PayerLePrixOutcome';
import { RecolterDesInformationsOutcome } from './RecolterDesInformationsOutcome';

export type MoveOutcomeProps = {
  move: Move;
  character: Character;
};

export function MoveOutcome(props: MoveOutcomeProps) {
  switch (props.move.moveId) {
    case Moves.FAIRE_FACE_AU_DANGER:
      return <FaireFaceAuDangerOutcome {...props} />;
    case Moves.PRENDRE_UN_AVANTAGE:
      return <FaireFaceAuDangerOutcome {...props} />;
    case Moves.RECOLTER_DES_INFORMATIONS:
      return <RecolterDesInformationsOutcome {...props} />;
    case Moves.PAYER_LE_PRIX:
      return <PayerLePrixOutcome {...props} />;
    default:
      return null;
  }
}
