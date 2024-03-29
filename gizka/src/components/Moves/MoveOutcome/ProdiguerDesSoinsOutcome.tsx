import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { ChallengeDie } from '@/components/Moves/ChallengeDie';
import { statFrToEn } from '@/utils/scenario/helpers';
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
      <p>
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
      {t(`${move.moveId}.outcomes.mixed`)} (<Keyword stat={statFrToEn(stat)}>-1</Keyword> {stat}
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
  const t = useTranslations('moves');

  return <p>{t(`${move.moveId}.outcomes.failure`)} </p>;
}

function getTarget(targetId: number, characterId: number, characters: Record<string, Character>) {
  if (targetId > 0 && targetId !== characterId) {
    return characters[targetId];
  }

  return null;
}
