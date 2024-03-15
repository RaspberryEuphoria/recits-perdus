import { Character } from '@/utils/types/character';
import { Move, Moves } from '@/utils/types/scenario';

import { ContraindreOutcome } from './ContraindreOutcome';
import { FaireFaceAuDangerOutcome } from './FaireFaceAuDangerOutcome';
import { MarchanderOutcome } from './MarchanderOutcome';
import { PayerLePrixOutcome } from './PayerLePrixOutcome';
import { PrendreUnAvantageOutcome } from './PrendreUnAvantageOutcome';
import { ProdiguerDesSoinsOutcome } from './ProdiguerDesSoinsOutcome';
import { RavitaillerOutcome } from './RavitaillerOutcome';
import { RecolterDesInformationsOutcome } from './RecolterDesInformationsOutcome';

export type MoveOutcomeProps = {
  move: Move;
  character: Character;
  characters: Record<string, Character>;
};

export function MoveOutcome(props: MoveOutcomeProps) {
  switch (props.move.moveId) {
    case Moves.FAIRE_FACE_AU_DANGER:
      return <FaireFaceAuDangerOutcome {...props} />;
    case Moves.PRENDRE_UN_AVANTAGE:
      return <PrendreUnAvantageOutcome {...props} />;
    case Moves.RECOLTER_DES_INFORMATIONS:
      return <RecolterDesInformationsOutcome {...props} />;
    case Moves.PAYER_LE_PRIX:
      return <PayerLePrixOutcome {...props} />;
    case Moves.RAVITAILLER:
      return <RavitaillerOutcome {...props} />;
    case Moves.MARCHANDER:
      return <MarchanderOutcome {...props} />;
    case Moves.CONTRAINDRE:
      return <ContraindreOutcome {...props} />;
    case Moves.PRODIGUER_DES_SOINS:
      return <ProdiguerDesSoinsOutcome {...props} />;
    default:
      return null;
  }
}
