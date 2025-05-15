import { Character } from '@/utils/types/character';
import { Move, Moves } from '@/utils/types/scenario';

import { ActionLibreOutcome } from './ActionLibreOutcome';
import { AttaquerOutcome } from './AttaquerOutcome';
import { ContraindreOutcome } from './ContraindreOutcome';
import { EngagerLeCombatOutcome } from './EngagerLeCombatOutcome';
import { FaireFaceAuDangerOutcome } from './FaireFaceAuDangerOutcome';
import { MarchanderOutcome } from './MarchanderOutcome';
import { MettreFinAuCombatOutcome } from './MettreFinAuCombatOutcome';
import { PayerLePrixOutcome } from './PayerLePrixOutcome';
import { PrendreUnAvantageOutcome } from './PrendreUnAvantageOutcome';
import { ProdiguerDesSoinsOutcome } from './ProdiguerDesSoinsOutcome';
import { RavitaillerOutcome } from './RavitaillerOutcome';
import { RecolterDesInformationsOutcome } from './RecolterDesInformationsOutcome';
import { RiposterOutcome } from './RiposterOutcome';
import * as Styled from './styled';

export type MoveOutcomeProps = {
  move: Move;
  character: Character;
  characters: Record<string, Character>;
};

export function MoveOutcome(props: MoveOutcomeProps) {
  switch (props.move.moveId) {
    case Moves.FAIRE_FACE_AU_DANGER:
      return (
        <Styled.Container result={props.move.moveResult}>
          <FaireFaceAuDangerOutcome {...props} />
        </Styled.Container>
      );
    case Moves.PRENDRE_UN_AVANTAGE:
      return (
        <Styled.Container result={props.move.moveResult}>
          <PrendreUnAvantageOutcome {...props} />
        </Styled.Container>
      );
    case Moves.RECOLTER_DES_INFORMATIONS:
      return (
        <Styled.Container result={props.move.moveResult}>
          <RecolterDesInformationsOutcome {...props} />
        </Styled.Container>
      );
    case Moves.PAYER_LE_PRIX:
      return (
        <Styled.Container result={props.move.moveResult}>
          <PayerLePrixOutcome {...props} />
        </Styled.Container>
      );
    case Moves.RAVITAILLER:
      return (
        <Styled.Container result={props.move.moveResult}>
          <RavitaillerOutcome {...props} />
        </Styled.Container>
      );
    case Moves.MARCHANDER:
      return (
        <Styled.Container result={props.move.moveResult}>
          <MarchanderOutcome {...props} />
        </Styled.Container>
      );
    case Moves.CONTRAINDRE:
      return (
        <Styled.Container result={props.move.moveResult}>
          <ContraindreOutcome {...props} />
        </Styled.Container>
      );
    case Moves.PRODIGUER_DES_SOINS:
      return (
        <Styled.Container result={props.move.moveResult}>
          <ProdiguerDesSoinsOutcome {...props} />
        </Styled.Container>
      );
    case Moves.ENGAGER_LE_COMBAT:
      return (
        <Styled.Container result={props.move.moveResult}>
          <EngagerLeCombatOutcome {...props} />
        </Styled.Container>
      );
    case Moves.ATTAQUER:
      return (
        <Styled.Container result={props.move.moveResult}>
          <AttaquerOutcome {...props} />
        </Styled.Container>
      );
    case Moves.RIPOSTER:
      return (
        <Styled.Container result={props.move.moveResult}>
          <RiposterOutcome {...props} />
        </Styled.Container>
      );
    case Moves.METTRE_FIN_AU_COMBAT:
      return (
        <Styled.Container result={props.move.moveResult}>
          <MettreFinAuCombatOutcome {...props} />
        </Styled.Container>
      );
    case Moves.ACTION_LIBRE:
      return (
        <Styled.Container result={props.move.moveResult}>
          <ActionLibreOutcome {...props} />
        </Styled.Container>
      );
    default:
      return null;
  }
}
