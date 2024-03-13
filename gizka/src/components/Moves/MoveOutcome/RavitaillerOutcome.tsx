import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { ChallengeDie } from '@/components/Moves/ChallengeDie';
import { DiceType, MoveResult } from '@/utils/types/scenario';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

export function RavitaillerOutcome(props: MoveOutcomeProps) {
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
        {t(`${move.moveId}.action`)} <Keyword stat="move">{t(`${move.moveId}.name`)}</Keyword>{' '}
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

  return (
    <p>
      {t('outcomes.demonstrating')} {t(`skills.${move.skill.name}.partitif`)}
      {move.skill.name.toLowerCase()},{' '}
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.harvest`)} {t(`${move.moveId}.outcomes.no-time-loss`)} (
      <Keyword stat="supplies">+2</Keyword> {t('stats.supplies')}).
    </p>
  );
}

function Mixed({ character, move }: MoveOutcomeProps) {
  const meta = JSON.parse(move.meta);
  const danger = meta.danger;
  const t = useTranslations('moves');

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t('outcomes.no-lack-of')} {t(`skills.${move.skill.name}.partitif`)}
      {move.skill.name.toLowerCase()} {t('outcomes.and')} {t(`${move.moveId}.outcomes.harvest`)}{' '}
      {t(`${move.moveId}.outcomes.time-loss`)} (<Keyword stat="supplies">+{danger}</Keyword>{' '}
      {t('stats.supplies')}, <Keyword stat="momentum">-{danger}</Keyword> {t('stats.momentum')}).
    </p>
  );
}

function Failure({ character }: MoveOutcomeProps) {
  const t = useTranslations('moves');

  return (
    <p>
      {t(`outcomes.sadly`)},{' '}
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t('outcomes.fails')} {t('outcomes.and-waste-time')}.
    </p>
  );
}
