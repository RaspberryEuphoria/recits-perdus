import { Move } from '@/components/Dialog/DialogTextarea/DialogTextarea';
import { Moves } from '@/utils/types/scenario';

import { FaireFaceAuDanger } from './FaireFaceAuDanger';
import { PrendreUnAvantage } from './PrendreUnAvantage';
import { ProdiguerDesSoins } from './ProdiguerDesSoins';
import { RecolterDesInformations } from './RecolterDesInformations';

export type MoveCardProps = {
  id: Moves;
  onPick: (move: Move | null) => void;
  onClose: () => void;
  children: React.ReactNode;
};

export function MoveCard(props: MoveCardProps) {
  const Component = GetComponent(props.id);
  if (!Component) return null;

  return <Component {...props} />;
}

const GetComponent = (id: Moves) => {
  switch (id) {
    case Moves.FAIRE_FACE_AU_DANGER:
      return FaireFaceAuDanger;
    case Moves.PRENDRE_UN_AVANTAGE:
      return PrendreUnAvantage;
    case Moves.RECOLTER_DES_INFORMATIONS:
      return RecolterDesInformations;
    case Moves.PRODIGUER_DES_SOINS:
      return ProdiguerDesSoins;
    default:
      return null;
  }
};
