import { useTranslations } from 'next-intl';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { ChallengeDie } from '@/components/Moves/ChallengeDie';
import { movesNames } from '@/utils/scenario/helpers';
import { DiceType, MoveResult } from '@/utils/types/scenario';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

export function PrendreUnAvantageOutcome(props: MoveOutcomeProps) {
  const { character, move } = props;
  const {
    dices,
    skillValue,
    skill: { name: skillName },
  } = move;

  const actionDie = dices.find((dice) => dice.type === DiceType.ACTION);
  const challengeDices = dices.filter((dice) => dice.type === DiceType.CHALLENGE);

  if (!actionDie) {
    return <p>Oups ! Il y a un problème avec les dés !</p>;
  }

  const score = actionDie.value + skillValue;

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

  return (
    <Styled.MoveOutcome>
      <p>
        <Styled.CharacterName color={character.textColor}>
          {character.firstName}
        </Styled.CharacterName>
        &nbsp;tente de&nbsp;
        <Keyword stat="move">{movesNames(move.moveId)}</Keyword>&nbsp;!
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

function Success({ move, character }: MoveOutcomeProps) {
  const t = useTranslations('moves');

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.success`)} (<Keyword stat="momentum">+2</Keyword>{' '}
      {t('stats.momentum')})
    </p>
  );
}

function Mixed({ move, character }: MoveOutcomeProps) {
  const t = useTranslations('moves');

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t(`${move.moveId}.outcomes.mixed`)} (<Keyword stat="momentum">+1</Keyword>{' '}
      {t('stats.momentum')})
    </p>
  );
}

function Failure({ character }: MoveOutcomeProps) {
  const t = useTranslations('moves');

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      {t('outcomes.failure-aftermath')}
    </p>
  );
}
