import { skillWordings } from '@/utils/scenario/helpers';
import { MoveResult } from '@/utils/types/scenario';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

export type FaireFaceAuDangerOutcomeProps = Pick<MoveOutcomeProps, 'character'>;

export function FaireFaceAuDangerOutcome(props: MoveOutcomeProps) {
  const Outcome = (props: MoveOutcomeProps) => {
    switch (props.result) {
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
      <Outcome {...props} />
    </Styled.MoveOutcome>
  );
}

function Success({ character, skillName }: MoveOutcomeProps) {
  return (
    <div>
      Faisant preuve {skillWordings[skillName].partitif}
      {skillName.toLowerCase()} à toute épreuve,{' '}
      <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>{' '}
      parvient à maîtriser la situation (<Styled.MomentumBonus>+1</Styled.MomentumBonus> élan).
    </div>
  );
}

function Mixed({ character }: MoveOutcomeProps) {
  console.log(character);
  return <div>Mixed</div>;
}

function Failure({ character }: MoveOutcomeProps) {
  console.log(character);
  return <div>Failure</div>;
}
