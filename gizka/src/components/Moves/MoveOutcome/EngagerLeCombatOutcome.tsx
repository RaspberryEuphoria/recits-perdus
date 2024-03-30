import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { ChallengeDie } from '@/components/Moves/ChallengeDie';
import { DiceType, MoveResult } from '@/utils/types/scenario';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

export function EngagerLeCombatOutcome(props: MoveOutcomeProps) {
  const t = useTranslations('moves');
  const { character, move } = props;
  const {
    dices,
    skillValue,
    skill: { name: skillName },
  } = move;

  const [actionDie] = useMemo(() => dices.filter((dice) => dice.type === DiceType.ACTION), [dices]);
  const challengeDices = useMemo(
    () => dices.filter((dice) => dice.type === DiceType.CHALLENGE),
    [dices],
  );

  const score = actionDie.value + skillValue;

  return (
    <Styled.MoveOutcome>
      <p>
        <Styled.CharacterName color={character.textColor}>
          {character.firstName}
        </Styled.CharacterName>{' '}
        {t(`${move.moveId}.action`)}
        <Keyword stat="move">{t(`${move.moveId}.name`)}</Keyword> !
      </p>
      <Styled.MoveResult>
        <Styled.MoveScore
          title={`Dé d'action (${actionDie.value}) + attribut ${skillName} (${skillValue})`}
          color={character.textColor}
        >
          {score}
        </Styled.MoveScore>
        {challengeDices.map((dice) => (
          <ChallengeDie key={dice.id} score={score} value={dice.value} isBurned={dice.isBurned} />
        ))}
      </Styled.MoveResult>
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

function Success({ character, move }: MoveOutcomeProps) {
  const t = useTranslations('moves');
  const meta = JSON.parse(move.meta);
  const skill = meta.skillId;

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.strong-${skill}`)} (<Keyword stat="momentum">+2</Keyword>{' '}
      {t('stats.momentum')})
    </p>
  );
}

function Mixed({ character, move }: MoveOutcomeProps) {
  const t = useTranslations('moves');
  const meta = JSON.parse(move.meta);
  const skill = meta.skillId;

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.weak-${skill}`)} (<Keyword stat="momentum">+1</Keyword>{' '}
      {t('stats.momentum')})
    </p>
  );
}

function Failure({ character, move }: MoveOutcomeProps) {
  const t = useTranslations('moves');
  const meta = JSON.parse(move.meta);
  const skill = meta.skillId;

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.miss-${skill}`)}
    </p>
  );
}
