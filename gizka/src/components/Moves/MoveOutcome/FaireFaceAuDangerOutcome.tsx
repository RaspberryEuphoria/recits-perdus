import { Keyword } from '@/components/DesignSystem/Keyword';
import { movesNames, skillWordings, statFrToEn } from '@/utils/scenario/helpers';
import { DiceType, MoveResult } from '@/utils/types/scenario';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

export function FaireFaceAuDangerOutcome(props: MoveOutcomeProps) {
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
        &nbsp;se prépare à&nbsp;
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
      Faisant preuve {skillWordings[move.skill.name].partitif}
      {move.skill.name.toLowerCase()} à toute épreuve,{' '}
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      parvient à maîtriser la situation (<Keyword stat="momentum">+1</Keyword> élan).
    </p>
  );
}

function Mixed({ character, move }: MoveOutcomeProps) {
  const meta = JSON.parse(move.meta);
  const stat = meta.danger.toLowerCase();

  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      ne manque pas de {move.skill.name.toLowerCase()} mais n&apos;a pas le contrôle de la situation
      et fait face à des complications (<Keyword stat={statFrToEn(stat)}>-1</Keyword> {stat}
      ).
    </p>
  );
}

function Failure({ character, move }: MoveOutcomeProps) {
  return (
    <p>
      Malgré {skillWordings[move.skill.name].possessif}
      {move.skill.name.toLowerCase()},{' '}
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      se retrouve dans une situation périlleuse !
    </p>
  );
}
