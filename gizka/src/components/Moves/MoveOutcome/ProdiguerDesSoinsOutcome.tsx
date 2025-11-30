import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Dices } from '@/components/DesignSystem/Dices';
import { Keyword } from '@/components/DesignSystem/Keyword';
import { statEnToFr } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';
import { DiceType, MoveResult } from '@/utils/types/scenario';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

type ProdiguerDesoinsOutcomeProps = MoveOutcomeProps & {
  selfHealing: boolean;
  isTargetPlayer: boolean;
};

export function ProdiguerDesSoinsOutcome(props: MoveOutcomeProps) {
  const t = useTranslations('moves');
  const { character, characters, move } = props;
  const {
    dices,
    skillValue,
    skill: { name: skillName },
  } = move;

  const meta = useMemo(() => JSON.parse(move.meta), [move.meta]);
  const target = useMemo(
    () => getTarget(meta.targetId, character.id, characters),
    [meta.targetId, character.id, characters],
  );
  const selfHealing = meta.targetId === character.id;

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
        {t(`${move.moveId}.action`)}{' '}
        <Keyword stat="move">
          {selfHealing ? t(`${move.moveId}.name-self`) : t(`${move.moveId}.name`)}
        </Keyword>{' '}
        {target && (
          <>
            {t(`${move.moveId}.to`)}{' '}
            <Styled.CharacterName color={target.textColor}>{target.firstName}</Styled.CharacterName>
          </>
        )}{' '}
        !
      </Styled.MoveTitle>

      <Dices
        score={{ value: score, color: character.textColor }}
        actionDie={{ value: actionDie.value }}
        challengeDices={challengeDices}
        skill={{ name: skillName, value: skillValue }}
      />

      <Outcome {...props} selfHealing={selfHealing} isTargetPlayer={meta.targetId > 0} />
    </Styled.MoveOutcome>
  );
}

const Outcome = (props: ProdiguerDesoinsOutcomeProps) => {
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

function Success({ move, isTargetPlayer }: ProdiguerDesoinsOutcomeProps) {
  const t = useTranslations('moves');

  return (
    <p>
      {t(`${move.moveId}.outcomes.success`)}{' '}
      {isTargetPlayer && (
        <>
          (<Keyword stat="health">+2</Keyword> {t('stats.health')})
        </>
      )}
    </p>
  );
}

function Mixed({ move, isTargetPlayer }: ProdiguerDesoinsOutcomeProps) {
  const meta = JSON.parse(move.meta);
  const stat = meta.danger.toLowerCase();
  const t = useTranslations('moves');

  return (
    <p>
      {t(`${move.moveId}.outcomes.mixed`)} (<Keyword stat={stat}>-1</Keyword> {statEnToFr(stat)}
      {isTargetPlayer && (
        <>
          {' '}
          , <Keyword stat="health">+2</Keyword> {t('stats.health')}
        </>
      )}
      )
    </p>
  );
}

function Failure({ move }: MoveOutcomeProps) {
  const meta = JSON.parse(move.meta);
  const stat = meta.danger.toLowerCase();
  const t = useTranslations('moves');

  return (
    <p>
      {t(`${move.moveId}.outcomes.failure`)} (<Keyword stat={stat}>-1</Keyword> {statEnToFr(stat)})
    </p>
  );
}

function getTarget(targetId: number, characterId: number, characters: Record<string, Character>) {
  if (targetId > 0 && targetId !== characterId) {
    return characters[targetId];
  }

  return null;
}
