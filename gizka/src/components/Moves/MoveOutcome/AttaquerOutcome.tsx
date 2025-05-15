import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Dices } from '@/components/DesignSystem/Dices';
import { Keyword } from '@/components/DesignSystem/Keyword';
import { MoveProgress } from '@/components/Moves/MoveProgress';
import { DiceType, MoveResult } from '@/utils/types/scenario';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

export function AttaquerOutcome(props: MoveOutcomeProps) {
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
  const meta = JSON.parse(move.meta);
  const progress = meta.progress;
  const difficulty = meta.difficulty;
  const difficultyText = difficulty
    ? `(${t('outcomes.difficulty')} ${t(`difficulty.${difficulty}`)})`
    : '';

  return (
    <Styled.MoveOutcome>
      <Styled.MoveTitle>
        <Styled.CharacterName color={character.textColor}>
          {character.firstName}
        </Styled.CharacterName>{' '}
        {t(`${move.moveId}.action`)}
        <Keyword stat="move">{t(`${move.moveId}.name`)}</Keyword> {difficultyText} !
      </Styled.MoveTitle>

      <Dices
        score={{ value: score, color: character.textColor }}
        actionDie={{ value: actionDie.value }}
        challengeDices={challengeDices}
        skill={{ name: skillName, value: skillValue }}
      />

      <Outcome {...props} />
      {progress && <MoveProgress progress={progress} difficulty={difficulty} />}
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
      {t(`${move.moveId}.outcomes.strong-${skill}`)}
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
      {t(`${move.moveId}.outcomes.weak-${skill}`)}
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
