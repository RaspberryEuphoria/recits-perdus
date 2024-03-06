import { useState } from 'react';

import { Move } from '../Dialog/DialogTextarea/DialogTextarea';
import { MoveCard } from './MoveCard';
import * as Styled from './styled';

type MovesProps = {
  onMovePicked: (move: Move | null) => void;
};

const moves = [
  { id: 'FAIRE_FACE_AU_DANGER', name: 'Faire Face au Danger' },
  { id: 'PRENDRE_UN_AVANTAGE', name: 'Prendre Un Avantage' },
  { id: 'RECOLTER_DES_INFORMATIONS', name: 'Récolter des Informations' },
  { id: 'PRODIGUER_DES_SOINS', name: 'Prodiguer des Soins' },
  { id: 'RAVITAILLER', name: 'Ravitailler' },
  { id: 'MONTER_LE_CAMP', name: 'Monter le Camp' },
];

export function Moves({ onMovePicked }: MovesProps) {
  const [selectedMoveId, setSelectedMoveId] = useState<string | null>(null);

  const openMoveCard = (id: string) => {
    setSelectedMoveId(id);
  };

  const closeMoveCard = () => {
    setSelectedMoveId(null);
    onMovePicked(null);
  };

  if (selectedMoveId) {
    return <MoveCard id={selectedMoveId} onPick={onMovePicked} onClose={closeMoveCard} />;
  }

  return (
    <Styled.MovesList>
      {moves.map((move) => (
        <Styled.MoveItem key={move.id} onClick={() => openMoveCard(move.id)}>
          {move.name}
        </Styled.MoveItem>
      ))}
    </Styled.MovesList>
  );
}
