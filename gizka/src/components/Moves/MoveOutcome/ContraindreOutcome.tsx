import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Dices } from '@/components/DesignSystem/Dices';
import { Keyword } from '@/components/DesignSystem/Keyword';
import { DiceType, MoveResult } from '@/utils/types/scenario';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

export function ContraindreOutcome(props: MoveOutcomeProps) {
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
      <Styled.MoveTitle>
        <Styled.CharacterName color={character.textColor}>
          {character.firstName}
        </Styled.CharacterName>{' '}
        {t(`${move.moveId}.action`)} <Keyword stat="move">{t(`${move.moveId}.name`)}</Keyword>{' '}
        {t(`${move.moveId}.target`)}.
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

function Success({ character, move }: MoveOutcomeProps) {
  const t = useTranslations('moves');

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.negociate-strong`)} (<Keyword stat="momentum">+1</Keyword>{' '}
      {t('stats.momentum')}, +2{' '}
      {t.rich(`${move.moveId}.outcomes.if-next-ally-plays`, {
        move: (chunks) => <Keyword stat="move">{chunks}</Keyword>,
      })}
      ).
    </p>
  );
}

function Mixed({ character, move }: MoveOutcomeProps) {
  const t = useTranslations('moves');

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.negociate-weak`)}.
    </p>
  );
}

function Failure({ character, move }: MoveOutcomeProps) {
  const t = useTranslations('moves');

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.negociate-miss`)}.
    </p>
  );
}
