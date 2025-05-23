import { Dices } from '@/components/DesignSystem/Dices';
import { Keyword } from '@/components/DesignSystem/Keyword';
import { movesNames } from '@/utils/scenario/helpers';
import { DiceType, MoveResult } from '@/utils/types/scenario';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

export function RecolterDesInformationsOutcome(props: MoveOutcomeProps) {
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
  const meta = JSON.parse(move.meta);

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
      <Styled.MoveTitle>
        <Styled.CharacterName color={character.textColor}>
          {character.firstName}
        </Styled.CharacterName>
        &nbsp;cherche à &nbsp;
        <Keyword stat="move">{movesNames(move.moveId)}</Keyword>&nbsp;!
      </Styled.MoveTitle>

      <Dices
        score={{ value: score, color: character.textColor }}
        actionDie={{ value: actionDie.value, bonus: meta.actionBonus }}
        challengeDices={challengeDices}
        skill={{ name: skillName, value: skillValue }}
      />

      <Outcome {...props} />
    </Styled.MoveOutcome>
  );
}

function Success({ character }: MoveOutcomeProps) {
  return (
    <p>
      Après une investigation à la hauteur des plus grands détectives,{' '}
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      révèle de nouvelles informations qui seront d&apos;une grande aide pour la mission (
      <Keyword stat="momentum">+2</Keyword> ferveur).
    </p>
  );
}

function Mixed({ character }: MoveOutcomeProps) {
  return (
    <p>
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      obtient des informations fiables, mais qui compliquent ou mettent en danger la mission (
      <Keyword stat={'momentum'}>+1</Keyword> ferveur).
    </p>
  );
}

function Failure({ character }: MoveOutcomeProps) {
  return (
    <p>
      L&apos;investigation de{' '}
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      révèle une terrible menace ou met au jour une vérité indésirable qui remet en question
      l&apos;objectif de la mission.
    </p>
  );
}
