import { useTranslations } from 'next-intl';

import { Dices } from '@/components/DesignSystem/Dices';
import { Keyword } from '@/components/DesignSystem/Keyword';
import { movesNames } from '@/utils/scenario/helpers';
import { DiceType, MoveResult } from '@/utils/types/scenario';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

export function FaireFaceAuDangerOutcome(props: MoveOutcomeProps) {
  const { character, move } = props;
  const {
    dices,
    skillValue,
    skill: { name: skillName },
  } = move;

  const [actionDie] = dices.filter((dice) => dice.type === DiceType.ACTION);
  const challengeDices = dices.filter((dice) => dice.type === DiceType.CHALLENGE);
  const score = actionDie.value + skillValue;

  if (!actionDie) {
    return <p>Oups ! Il y a un problème avec les dés !</p>;
  }

  return (
    <Styled.MoveOutcome>
      <Styled.MoveTitle>
        <Styled.CharacterName color={character.textColor}>
          {character.firstName}
        </Styled.CharacterName>
        &nbsp;se prépare à&nbsp;
        <Keyword stat="move">{movesNames(move.moveId)}</Keyword>&nbsp;!
      </Styled.MoveTitle>

      <Dices
        score={{ value: score, color: character.textColor }}
        actionDie={{ value: actionDie.value }}
        challengeDices={challengeDices}
        skill={{ name: skillName, value: skillValue }}
      />

      <Outcome {...props} />
    </Styled.MoveOutcome>
  );
}

const Outcome = (props: MoveOutcomeProps) => {
  switch (props.move.moveResult) {
    case MoveResult.SUCCESS:
      return <Success {...props} />;
    case MoveResult.MIXED:
      return <Mixed {...props} />;
    case MoveResult.FAILURE:
      return <Failure {...props} />;
    default:
      return null;
  }
};

function Success({ character }: MoveOutcomeProps) {
  const t = useTranslations('moves');

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t('outcomes.success-aftermath')} (<Keyword stat="momentum">+1</Keyword> {t('stats.momentum')}
      )
    </p>
  );
}

function Mixed({ character, move }: MoveOutcomeProps) {
  const meta = JSON.parse(move.meta);
  const stat = meta.danger.toLowerCase();
  const t = useTranslations('moves');

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t('outcomes.mixed-aftermath')} (<Keyword stat={stat}>-1</Keyword> {t(`stats.${stat}`)})
    </p>
  );
}

function Failure({ character, move }: MoveOutcomeProps) {
  const t = useTranslations('moves');
  const meta = JSON.parse(move.meta);
  const stat = meta.danger.toLowerCase();

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t('outcomes.failure-aftermath')} (<Keyword stat={stat}>-1</Keyword> {t(`stats.${stat}`)})
    </p>
  );
}
