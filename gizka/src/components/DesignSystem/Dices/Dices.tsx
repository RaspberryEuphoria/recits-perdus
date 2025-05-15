import { useTranslations } from 'next-intl';

import { Row } from '@/components/DesignSystem/Row';
import { Tooltip } from '@/components/DesignSystem/Tooltip';
import { ChallengeDie } from '@/components/Moves/ChallengeDie';
import { TextColor } from '@/utils/constants';
import { Dice } from '@/utils/types/scenario';

import * as Styled from './styled';

type ActionDie = {
  value: number;
  bonus?: Array<{ label: string; value: number }>;
};

type Skill = {
  name: string;
  value: number;
};

type DicesProps = {
  score: {
    value: number;
    color: TextColor;
  };
  challengeDices: Dice[];
  actionDie?: ActionDie;
  skill?: {
    name: string;
    value: number;
  };
  scoreLabel?: string;
};

export function Dices(props: DicesProps) {
  const t = useTranslations('moves');

  const { score, scoreLabel, actionDie, challengeDices, skill } = props;

  return (
    <Styled.Dices>
      <Row gap="05" align="center">
        <Tooltip content={computeTooltipContent({ actionDie, skill })}>
          <Styled.DiceLabel>{scoreLabel || t('dices.result')}</Styled.DiceLabel>
        </Tooltip>
        <Styled.Score color={score.color}>{score.value}</Styled.Score>
      </Row>

      <Styled.VersusLabel>{t('dices.versus')}</Styled.VersusLabel>

      <Row gap="05" align="center">
        <Styled.DiceLabel>{t('dices.challenge')}</Styled.DiceLabel>
        <Styled.ChallengeDices>
          {challengeDices.map((dice) => (
            <ChallengeDie
              key={dice.id}
              score={score.value}
              value={dice.value}
              isBurned={dice.isBurned}
            />
          ))}
        </Styled.ChallengeDices>
      </Row>
    </Styled.Dices>
  );
}

function computeTooltipContent({ actionDie, skill }: { actionDie?: ActionDie; skill?: Skill }) {
  if (!actionDie) {
    return '';
  }

  if (!skill) {
    return `Dé d'action (${actionDie.value})`;
  }

  if (actionDie.bonus) {
    return `Dé d'action (${actionDie.value}, dont un bonus de ${actionDie.bonus
      .map((bonus) => bonus.value)
      .join('+')}) + ${skill.name} (${skill.value})`;
  }

  return `Dé d'action (${actionDie.value}) + ${skill.name} (${skill.value})`;
}
