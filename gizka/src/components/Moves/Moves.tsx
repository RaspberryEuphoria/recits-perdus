import { useState } from 'react';

import MomentumIcon from '@/public/images/icons/momentum.svg';
import { Character } from '@/utils/types/character';
import { Moves as MoveId } from '@/utils/types/scenario';

import { Checkbox } from '../DesignSystem/Checkbox';
import { Prompt } from '../DesignSystem/Prompt';
import { Move } from '../Dialog/DialogTextarea/DialogTextarea';
import { MoveCard } from './MoveCard';
import * as Styled from './styled';

export type MovesProps = {
  onMovePicked: (move: Move | null) => void;
  onBurnCheck: (hasMomentumBurn: boolean) => void;
  character: Character;
  characters: Character[];
};

const moves = [
  { id: MoveId.FAIRE_FACE_AU_DANGER, name: 'Faire Face au Danger', isDisabled: false },
  { id: MoveId.PRENDRE_UN_AVANTAGE, name: 'Prendre Un Avantage', isDisabled: false },
  { id: MoveId.RECOLTER_DES_INFORMATIONS, name: 'Récolter des Informations', isDisabled: false },
  { id: MoveId.PRODIGUER_DES_SOINS, name: 'Prodiguer des Soins', isDisabled: false },
  { id: MoveId.RAVITAILLER, name: 'Ravitailler', isDisabled: false },
  { id: MoveId.MARCHANDER, name: 'Marchander', isDisabled: false },
  { id: MoveId.MONTER_LE_CAMP, name: 'Monter le Camp', isDisabled: true },
  { id: MoveId.VOYAGER, name: 'Voyager', isDisabled: true },
  { id: MoveId.ATTEINDRE_SA_DESTINATION, name: 'Atteindre sa Destination', isDisabled: true },
  { id: MoveId.CONTRAINDRE, name: 'Contraindre', isDisabled: false },
];

export function Moves({ onMovePicked, onBurnCheck, character, characters }: MovesProps) {
  const [selectedMoveId, setSelectedMoveId] = useState<MoveId | null>(null);

  const openMoveCard = (id: MoveId) => {
    setSelectedMoveId(id);
  };

  const closeMoveCard = () => {
    setSelectedMoveId(null);
    onMovePicked(null);
  };

  const handleBurnCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBurnCheck(e.target.checked);
  };

  if (selectedMoveId) {
    return (
      <MoveCard
        id={selectedMoveId}
        onPick={onMovePicked}
        onClose={closeMoveCard}
        character={character}
        characters={characters}
      >
        <Prompt stat="momentum">
          <MomentumIcon />
          <label htmlFor="burn">Brûler de la ferveur ?</label>{' '}
          <Checkbox id="burn" onChange={handleBurnCheck} />
        </Prompt>
        <Styled.Paragraph>
          Si vous avez assez de ferveur, elle sera automatiquement consommée pour annuler un échec
          lorsque c&apos;est possible. En cas de succès, vous conservez votre ferveur.
        </Styled.Paragraph>
      </MoveCard>
    );
  }

  return (
    <Styled.MovesList>
      {moves.map((move) => (
        <Styled.MoveItem
          key={move.id}
          onClick={() => !move.isDisabled && openMoveCard(move.id)}
          isDisabled={move.isDisabled}
        >
          {move.name} {move.isDisabled && '(WiP)'}
        </Styled.MoveItem>
      ))}
    </Styled.MovesList>
  );
}
