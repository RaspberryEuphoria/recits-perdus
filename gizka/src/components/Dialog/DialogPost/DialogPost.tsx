import { getFullName } from '@/utils/character/helpers';
import { TextColor } from '@/utils/constants';
import { formatPostContent } from '@/utils/scenario/helpers';
import { Character, CharacterSkill } from '@/utils/types/character';
import { Dice, DiceType, MoveResult } from '@/utils/types/scenario';

import * as Styled from './styled';

type DialogPostProps = {
  character?: Character;
  content: string;
  moveId?: string;
  dices?: Array<Dice>;
  skill?: CharacterSkill;
  skillValue?: number;
  isGameMaster?: boolean;
  onMouseEnter?: (character: Character) => void;
  onMouseLeave?: (character: Character) => void;
};

export function DialogPost({
  character,
  content,
  moveId,
  dices,
  skill,
  skillValue,
  isGameMaster,
  onMouseEnter,
  onMouseLeave,
}: DialogPostProps) {
  const handleMouseEnter = () => {
    if (onMouseEnter && character) {
      onMouseEnter(character);
    }
  };

  const handleMouseLeave = () => {
    if (onMouseLeave && character) {
      onMouseLeave(character);
    }
  };

  if (!character) {
    return (
      <Styled.DialogPost>
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </Styled.DialogPost>
    );
  }

  const textColor = isGameMaster ? TextColor.GameMaster : character.textColor;

  const avatarSrc = isGameMaster
    ? '/images/avatars/gamemaster-1.jpg'
    : `/images/users/avatars/${character.avatar}`;
  const characterName = isGameMaster ? 'Maître du Jeu' : getFullName(character);

  return (
    <Styled.DialogPost onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Styled.DialogInfos>
        <Styled.DialogAvatar
          src={avatarSrc}
          alt="bloblo"
          width={200}
          height={230}
          color={textColor}
        />
        <Styled.DialogPostAuthor color={textColor}>{characterName}</Styled.DialogPostAuthor>
      </Styled.DialogInfos>
      <Styled.DialogPostContent
        dangerouslySetInnerHTML={{ __html: formatPostContent(content) }}
        color={textColor}
      />
      {dices && skill && moveId && (
        <MoveOutcome
          character={character}
          dices={dices}
          skill={skill}
          skillValue={skillValue}
          moveId={moveId}
        />
      )}
    </Styled.DialogPost>
  );
}

function MoveOutcome({
  character,
  dices,
  skill,
  skillValue,
  moveId,
}: {
  character: Character;
  dices: Array<Dice>;
  skill: CharacterSkill;
  skillValue: number;
  moveId: string;
}) {
  const actionDie = dices.find((dice) => dice.type === DiceType.ACTION);

  if (!actionDie) {
    throw new Error('Action die not found');
  }

  const challengeDices = dices.filter((dice) => dice.type === DiceType.CHALLENGE);

  const score = actionDie.value + skillValue;
  const result = getDicesResult(score, challengeDices);

  return (
    <Styled.MoveOutcome>
      <p>
        <span style={{ color: character.textColor }}>{character.firstName}</span>&nbsp;tente
        de&nbsp;
        <Styled.MoveName>{getMoveById(moveId)}</Styled.MoveName>&nbsp;!
      </p>
      <Styled.MoveResult>
        <Styled.MoveScore
          title={`Dé d'action (${actionDie.value}) + attribut ${skill.name} (${skillValue})`}
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
    </Styled.MoveOutcome>
  );
}

function getDicesResult(score: number, challengeDices: Array<Dice>) {
  if (challengeDices.every((dice) => dice.value >= score)) {
    return MoveResult.FAILURE;
  }

  if (challengeDices.some((dice) => dice.value > score)) {
    return MoveResult.MIXED;
  }

  if (challengeDices.every((dice) => dice.value < score)) {
    return MoveResult.SUCCESS;
  }
}

function getMoveById(moveId: string) {
  const moves: Record<string, string> = {
    FAIRE_FACE_AU_DANGER: 'Faire Face au Danger',
  };

  if (!moves[moveId]) throw new Error(`Move with id ${moveId} not found`);

  return moves[moveId];
}
