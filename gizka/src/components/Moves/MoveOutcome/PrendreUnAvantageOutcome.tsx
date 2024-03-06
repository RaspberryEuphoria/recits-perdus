import { Keyword } from '@/components/DesignSystem/Keyword';
import { movesNames, skillWordings } from '@/utils/scenario/helpers';
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
          <Styled.ChallengeDie key={dice.id}>
            {dice.value}
            <Styled.ChallengeResult isSucces={dice.value < score} />
          </Styled.ChallengeDie>
        ))}
      </Styled.MoveResult>
      <Outcome {...props} />
    </Styled.MoveOutcome>
  );
}

function Success({ character, move }: MoveOutcomeProps) {
  return (
    <p>
      Par la force de {skillWordings[move.skill.name].possessif}
      {move.skill.name.toLowerCase()}{' '}
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      prend un avantage décisif, susceptible de renverser la situation à sa faveur (
      <Keyword stat="momentum">+2</Keyword> élan).
    </p>
  );
}

function Mixed({ character, move }: MoveOutcomeProps) {
  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      et {skillWordings[move.skill.name].possessif}
      {move.skill.name.toLowerCase()} prennent un léger avantage sur la situation (
      <Keyword stat={'momentum'}>+1</Keyword> élan).
    </p>
  );
}

function Failure({ character, move }: MoveOutcomeProps) {
  return (
    <p style={{ textTransform: 'capitalize' }}>
      {skillWordings[move.skill.name].defini}
      {move.skill.name.toLowerCase()} de
      <Styled.CharacterName color={character.textColor}>
        {character.firstName}
      </Styled.CharacterName>{' '}
      ne suffit pas à prendre l&apos;ascendant. Pire, cette tentative a l&apos;effet inverse !
    </p>
  );
}
