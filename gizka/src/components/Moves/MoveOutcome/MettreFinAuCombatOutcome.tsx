import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { ChallengeDie } from '@/components/Moves/ChallengeDie';
import { DiceType, MoveResult } from '@/utils/types/scenario';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

export function MettreFinAuCombatOutcome(props: MoveOutcomeProps) {
  const t = useTranslations('moves');
  const { character, move } = props;
  const { dices } = move;

  const [actionDie] = useMemo(() => dices.filter((dice) => dice.type === DiceType.ACTION), [dices]);
  const challengeDices = useMemo(
    () => dices.filter((dice) => dice.type === DiceType.CHALLENGE),
    [dices],
  );

  const score = actionDie.value;

  return (
    <Styled.MoveOutcome>
      <p>
        <Styled.CharacterName color={character.textColor}>
          {character.firstName}
        </Styled.CharacterName>{' '}
        {t(`${move.moveId}.action`)} <Keyword stat="move">{t(`${move.moveId}.name`)}</Keyword> !
      </p>
      <Styled.MoveResult>
        <Styled.MoveScore title={t('progress-score')} color={character.textColor}>
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

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.strong`)}
    </p>
  );
}

function Mixed({ character, move }: MoveOutcomeProps) {
  const meta = JSON.parse(move.meta);
  const danger = meta.danger.toLowerCase();
  const t = useTranslations('moves');

  const lossValue = ['health', 'spirit'].includes(danger) ? (
    <>
      {' '}
      (<Keyword stat={danger}>+1</Keyword> {t(`stats.${danger}`)})
    </>
  ) : (
    ''
  );

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.weak-${danger}`)}
      {lossValue}
    </p>
  );
}

function Failure({ character, move }: MoveOutcomeProps) {
  const t = useTranslations('moves');

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.miss`)}
    </p>
  );
}
