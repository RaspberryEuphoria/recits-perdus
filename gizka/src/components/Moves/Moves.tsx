import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';

import { Checkbox } from '@/components/DesignSystem/Checkbox';
import { Prompt } from '@/components/DesignSystem/Prompt';
import { Text } from '@/components/DesignSystem/Text';
import { Move } from '@/components/Dialog/DialogTextarea/DialogTextarea';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import { Character } from '@/utils/types/character';
import { Moves as MoveId } from '@/utils/types/scenario';

import { MoveCard } from './MoveCard';
import * as Styled from './styled';

export type MovesProps = {
  onMovePicked: (move: Move | null) => void;
  onBurnCheck: (hasMomentumBurn: boolean) => void;
  character: Character;
  characters: Character[];
};

const categories = [
  {
    key: 'adventure',
    moves: [
      { id: MoveId.FAIRE_FACE_AU_DANGER, isDisabled: false },
      { id: MoveId.PRENDRE_UN_AVANTAGE, isDisabled: false },
      { id: MoveId.PRODIGUER_DES_SOINS, isDisabled: false },
      { id: MoveId.RAVITAILLER, isDisabled: false },
      { id: MoveId.MONTER_LE_CAMP, isDisabled: true },
      { id: MoveId.VOYAGER, isDisabled: true },
      { id: MoveId.ATTEINDRE_SA_DESTINATION, isDisabled: true },
    ],
  },
  {
    key: 'social',
    moves: [
      { id: MoveId.RECOLTER_DES_INFORMATIONS, isDisabled: false },
      { id: MoveId.MARCHANDER, isDisabled: false },
      { id: MoveId.CONTRAINDRE, isDisabled: false },
    ],
  },
];

export function Moves({ onMovePicked, onBurnCheck, character, characters }: MovesProps) {
  const t = useTranslations('moves');
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
        <Text size="sm">
          Si vous avez assez de ferveur, elle sera automatiquement consommée pour annuler un échec
          lorsque c&apos;est possible. En cas de succès, vous conservez votre ferveur.
        </Text>
      </MoveCard>
    );
  }

  return (
    <Fragment>
      {categories.map((category) => (
        <Fragment key={category.key}>
          <Styled.Category forwardedAs="h2" size="md">
            {t(`categories.${category.key}`)}
          </Styled.Category>
          <Styled.MovesList>
            {category.moves.map((move) => (
              <Styled.MoveItem
                key={move.id}
                onClick={() => !move.isDisabled && openMoveCard(move.id)}
                isDisabled={move.isDisabled}
              >
                {t(`${move.id}.name`)} {move.isDisabled && '(WiP)'}
              </Styled.MoveItem>
            ))}
          </Styled.MovesList>
        </Fragment>
      ))}
    </Fragment>
  );
}
