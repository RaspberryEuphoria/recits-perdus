import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';

import { Checkbox } from '@/components/DesignSystem/Checkbox';
import { Prompt } from '@/components/DesignSystem/Prompt';
import { Text } from '@/components/DesignSystem/Text';
import { Move } from '@/components/Dialog/DialogTextarea/DialogTextarea';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import ActionLibreIcon from '@/public/images/icons/move_action_libre.svg';
import AttaquerIcon from '@/public/images/icons/move_attaquer.svg';
import ContraindreIcon from '@/public/images/icons/move_contraindre.svg';
import EngagerLeCombatIcon from '@/public/images/icons/move_engager_le_combat.svg';
import FaireFaceAuDangerIcon from '@/public/images/icons/move_faire_face_au_danger.svg';
import MarchanderIcon from '@/public/images/icons/move_marchander.svg';
import MettreFinAuCombatIcon from '@/public/images/icons/move_mettre_fin_au_combat.svg';
import PrendreUnAvantageIcon from '@/public/images/icons/move_prendre_un_avantage.svg';
import ProdiguerDesSoinsIcon from '@/public/images/icons/move_prodiguer_des_soins.svg';
import RavitaillerIcon from '@/public/images/icons/move_ravitailler.svg';
import RecolterDesInformationsIcon from '@/public/images/icons/move_recolter_des_informations.svg';
import RiposterIcon from '@/public/images/icons/move_riposter.svg';
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
      { id: MoveId.FAIRE_FACE_AU_DANGER, isDisabled: false, icon: <FaireFaceAuDangerIcon /> },
      { id: MoveId.PRENDRE_UN_AVANTAGE, isDisabled: false, icon: <PrendreUnAvantageIcon /> },
      { id: MoveId.PRODIGUER_DES_SOINS, isDisabled: false, icon: <ProdiguerDesSoinsIcon /> },
      { id: MoveId.RAVITAILLER, isDisabled: false, icon: <RavitaillerIcon /> },
      { id: MoveId.ACTION_LIBRE, isDisabled: false, icon: <ActionLibreIcon /> },
      // { id: MoveId.MONTER_LE_CAMP, isDisabled: true },
      // { id: MoveId.VOYAGER, isDisabled: true },
      // { id: MoveId.ATTEINDRE_SA_DESTINATION, isDisabled: true },
    ],
  },
  {
    key: 'social',
    moves: [
      {
        id: MoveId.RECOLTER_DES_INFORMATIONS,
        isDisabled: false,
        icon: <RecolterDesInformationsIcon />,
      },
      { id: MoveId.MARCHANDER, isDisabled: false, icon: <MarchanderIcon /> },
      { id: MoveId.CONTRAINDRE, isDisabled: false, icon: <ContraindreIcon /> },
    ],
  },
  {
    key: 'fight',
    moves: [
      { id: MoveId.ENGAGER_LE_COMBAT, isDisabled: false, icon: <EngagerLeCombatIcon /> },
      { id: MoveId.ATTAQUER, isDisabled: false, icon: <AttaquerIcon /> },
      { id: MoveId.RIPOSTER, isDisabled: false, icon: <RiposterIcon /> },
      { id: MoveId.METTRE_FIN_AU_COMBAT, isDisabled: false, icon: <MettreFinAuCombatIcon /> },
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
                {move.icon && <Styled.MoveIcon>{move.icon}</Styled.MoveIcon>} {t(`${move.id}.name`)}{' '}
                {move.isDisabled && '(WiP)'}
              </Styled.MoveItem>
            ))}
          </Styled.MovesList>
        </Fragment>
      ))}
    </Fragment>
  );
}
