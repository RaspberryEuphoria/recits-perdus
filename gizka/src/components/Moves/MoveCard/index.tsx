import { Move } from '@/components/Dialog/DialogTextarea/DialogTextarea';
import { Character } from '@/utils/types/character';
import { Moves } from '@/utils/types/scenario';

import { ActionLibre } from './ActionLibre';
import { Attaquer } from './Attaquer';
import { Contraindre } from './Contraindre';
import { EngagerLeCombat } from './EngagerLeCombat';
import { FaireFaceAuDanger } from './FaireFaceAuDanger';
import { Marchander } from './Marchander';
import { MettreFinAuCombat } from './MettreFinAuCombat';
import { PrendreUnAvantage } from './PrendreUnAvantage';
import { ProdiguerDesSoins } from './ProdiguerDesSoins';
import { Ravitailler } from './Ravitailler';
import { RecolterDesInformations } from './RecolterDesInformations';
import { Riposter } from './Riposter';

export type MoveCardProps = {
  id: Moves;
  onPick: (move: Move | null) => void;
  onClose: () => void;
  character: Character;
  characters: Character[];
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
    case Moves.RAVITAILLER:
      return Ravitailler;
    case Moves.MARCHANDER:
      return Marchander;
    case Moves.CONTRAINDRE:
      return Contraindre;
    case Moves.ENGAGER_LE_COMBAT:
      return EngagerLeCombat;
    case Moves.ATTAQUER:
      return Attaquer;
    case Moves.RIPOSTER:
      return Riposter;
    case Moves.METTRE_FIN_AU_COMBAT:
      return MettreFinAuCombat;
    case Moves.ACTION_LIBRE:
      return ActionLibre;
    default:
      return null;
  }
};
