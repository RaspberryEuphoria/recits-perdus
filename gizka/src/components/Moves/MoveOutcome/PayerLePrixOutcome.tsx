import { Keyword } from '@/components/DesignSystem/Keyword';
import { movesNames } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';

import { MoveOutcomeProps } from '.';
import * as Styled from './styled';

export function PayerLePrixOutcome(props: MoveOutcomeProps) {
  const { character, move } = props;
  const [priceDie] = move.dices;

  const score = priceDie.value;

  return (
    <Styled.MoveOutcome>
      <p>
        <Styled.CharacterName color={character.textColor}>
          {character.firstName}
        </Styled.CharacterName>
        &nbsp; doit&nbsp;
        <Keyword stat="move">{movesNames(move.moveId)}</Keyword>&nbsp;!
      </p>
      <p>
        <ScoreToOutcome character={character} score={score} />
      </p>
      <Styled.DestinyScore>#{score}</Styled.DestinyScore>{' '}
    </Styled.MoveOutcome>
  );
}

function ScoreToOutcome({ character, score }: { character: Character; score: number }) {
  const CharacterName = () => (
    <Styled.CharacterName color={character.textColor}>{character.firstName}</Styled.CharacterName>
  );

  if (score >= 1 && score <= 5) {
    return (
      <>
        Une personne ou une communauté en laquelle <CharacterName /> faisait confiance perd sa foi
        ou œuvre contre le groupe.
      </>
    );
  }
  if (score >= 6 && score <= 10) {
    return (
      <>
        Une personne ou une communauté qui tient à coeur à <CharacterName /> est exposée au danger.
      </>
    );
  }
  if (score >= 11 && score <= 16) {
    return (
      <>
        Le groupe est séparé de <CharacterName />.
      </>
    );
  }
  if (score >= 17 && score <= 23) {
    return (
      <>
        L&apos;action de <CharacterName /> a un effet imprévu et indésirable.
      </>
    );
  }
  if (score >= 24 && score <= 32) {
    return <>Quelque chose de valeur est perdu ou détruit.</>;
  }
  if (score >= 33 && score <= 41) {
    return <>La situation actuelle se met à empirer.</>;
  }
  if (score >= 42 && score <= 50) {
    return <>Un nouvel ennemi ou danger se révèle.</>;
  }
  if (score >= 51 && score <= 59) {
    return (
      <>
        Le danger désavantage <CharacterName /> (<Keyword stat="momentum">-1</Keyword> élan).
      </>
    );
  }
  if (score >= 60 && score <= 68) {
    return (
      <>
        Le danger blesse une blessure à <CharacterName /> (<Keyword stat="health">-1</Keyword>{' '}
        santé).
      </>
    );
  }
  if (score >= 69 && score <= 77) {
    return (
      <>
        Le danger inflige du stress à <CharacterName /> (<Keyword stat="spirit">-1</Keyword>{' '}
        esprit).
      </>
    );
  }
  if (score >= 78 && score <= 86) {
    return (
      <>
        Le danger a des effets sur les ressources du groupe (<Keyword stat="supplies">-1</Keyword>{' '}
        provisions).
      </>
    );
  }
  if (score >= 87 && score <= 90) {
    return <>Un développement surprenant complique la tâche du groupe.</>;
  }
  if (score >= 91 && score <= 94) {
    return (
      <>
        <CharacterName /> doit agir à l&apos;encontre de ses intérêts ou ceux du groupe.
      </>
    );
  }
  if (score >= 95 && score <= 99) {
    return (
      <>
        Un allié, un compagnon ou un ami de <CharacterName /> est exposé au danger.
      </>
    );
  }

  return (
    <>
      Tout ce qui peut mal tourner, tourne mal. <strong>Très mal</strong>. Le pire est arrivé.
    </>
  );
}
