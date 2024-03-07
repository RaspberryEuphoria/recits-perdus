import { useState } from 'react';

import MomentumIcon from '@/public/images/icons/momentum.svg';

import { Checkbox } from '../DesignSystem/Checkbox';
import { Prompt } from '../DesignSystem/Prompt';
import { Move } from '../Dialog/DialogTextarea/DialogTextarea';
import { MoveCard } from './MoveCard';
import * as Styled from './styled';

type MovesProps = {
  onMovePicked: (move: Move | null) => void;
  onBurnCheck: (hasMomentumBurn: boolean) => void;
};

const moves = [
  { id: 'FAIRE_FACE_AU_DANGER', name: 'Faire Face au Danger', isDisabled: false },
  { id: 'PRENDRE_UN_AVANTAGE', name: 'Prendre Un Avantage', isDisabled: false },
  { id: 'RECOLTER_DES_INFORMATIONS', name: 'Récolter des Informations', isDisabled: false },
  { id: 'PRODIGUER_DES_SOINS', name: 'Prodiguer des Soins', isDisabled: true },
  { id: 'RAVITAILLER', name: 'Ravitailler', isDisabled: true },
  { id: 'MONTER_LE_CAMP', name: 'Monter le Camp', isDisabled: true },
  { id: 'VOYAGER', name: 'Voyager', isDisabled: true },
  { id: 'ATTEINDRE SA DESTINATION', name: 'Atteindre sa Destination', isDisabled: true },
  { id: 'PERSUADER', name: 'Persuader', isDisabled: true },
];

export function Moves({ onMovePicked, onBurnCheck }: MovesProps) {
  const [selectedMoveId, setSelectedMoveId] = useState<string | null>(null);

  const openMoveCard = (id: string) => {
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
      <MoveCard id={selectedMoveId} onPick={onMovePicked} onClose={closeMoveCard}>
        <Prompt stat="momentum">
          <MomentumIcon />
          <label htmlFor="burn">Brûler de l&apos;élan ?</label>{' '}
          <Checkbox id="burn" onChange={handleBurnCheck} />
        </Prompt>
        <Styled.Paragraph>
          Si vous avez assez d&apos;élan, il sera automatiquement consommé pour annuler un échec si
          c&apos;est possible. En cas de succès, vous conservez votre élan.
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
