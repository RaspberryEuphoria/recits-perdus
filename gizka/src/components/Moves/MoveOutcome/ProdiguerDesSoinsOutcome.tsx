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
        )}
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
      <Outcome {...props} selfHealing={selfHealing} />
    </Styled.MoveOutcome>
  );
}

const Outcome = (props: ProdiguerDesoinsOutcomeProps) => {
  switch (props.move.moveResult) {
    case MoveResult.SUCCESS:
      return <Success {...props} />;
    case MoveResult.MIXED:
      return (
        <>
          <Success {...props} />
          <Mixed {...props} />
        </>
      );
    case MoveResult.FAILURE:
      return <Failure {...props} />;
    default:
      return null;
  }
};

function Success({ character, selfHealing, move }: ProdiguerDesoinsOutcomeProps) {
  const t = useTranslations('moves');
  const healingWording = selfHealing ? t(`${move.moveId}.name-self`) : t(`${move.moveId}.name`);

  return (
    <p>
      {t('outcomes.demonstrating')} {t(`skills.${move.skill.name}.partitif`)}
      {move.skill.name.toLowerCase()},{' '}
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t('outcomes.achieves')} {healingWording.toLocaleLowerCase()} (
      <Keyword stat="health">+2</Keyword> {t('stats.health')}).
    </p>
  );
}

function Mixed({ move }: ProdiguerDesoinsOutcomeProps) {
  const meta = JSON.parse(move.meta);
  const stat = meta.danger.toLowerCase();
  const t = useTranslations('moves');

  return (
    <p>
      {t(`${move.moveId}.outcomes.complications`)} (<Keyword stat={statFrToEn(stat)}>-1</Keyword>{' '}
      {stat}).
    </p>
  );
}

function Failure({ character, move }: ProdiguerDesoinsOutcomeProps) {
  const t = useTranslations('moves');

  return (
    <p>
      {t(`outcomes.regardless-of`)},{' '}
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t('outcomes.fails')} {t(`${move.moveId}.name`).toLocaleLowerCase()}.
    </p>
  );
}

function getTarget(targetId: number, characterId: number, characters: Record<string, Character>) {
  if (targetId > 0 && targetId !== characterId) {
    return characters[targetId];
  }

  return null;
}
