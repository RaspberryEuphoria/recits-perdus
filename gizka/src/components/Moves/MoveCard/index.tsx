import { Move } from '@/components/Dialog/DialogTextarea/DialogTextarea';
import { Moves } from '@/utils/types/scenario';

import { FaireFaceAuDanger } from './FaireFaceAuDanger';
import { PrendreUnAvantage } from './PrendreUnAvantage';
import { RecolterDesInformations } from './RecolterDesInformations';

export type MoveCardProps = {
  id: string;
  onPick: (move: Move | null) => void;
  onClose: () => void;
};

export function MoveCard(props: MoveCardProps) {
  switch (props.id) {
    case Moves.FAIRE_FACE_AU_DANGER:
      return <FaireFaceAuDanger {...props} />;
    case Moves.PRENDRE_UN_AVANTAGE:
      return <PrendreUnAvantage {...props} />;
    case Moves.RECOLTER_DES_INFORMATIONS:
      return <RecolterDesInformations {...props} />;
    default:
      return null;
  }
}
