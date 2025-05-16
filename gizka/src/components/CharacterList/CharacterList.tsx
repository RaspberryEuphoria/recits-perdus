import { useState } from 'react';

import { CharacterSheet } from '@/components/CharacterSheet';
import { DetailedPicture } from '@/components/DesignSystem/DetailedPicture';
import HealthIcon from '@/public/images/icons/health.svg';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import SpiritIcon from '@/public/images/icons/spirit.svg';
import { Character } from '@/utils/types/character';

import * as Styled from './styled';

type CharacterListProps = {
  characters: Character[];
};

const AVATAR_SRC_PREFIX = `${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/users/avatars`;

export function CharacterList({ characters }: CharacterListProps) {
  const [character, setCharacter] = useState<Character | null>();

  const selectCharacter = (character: Character) => {
    setCharacter(character);
  };

  const closeCharacterSheet = () => {
    setCharacter(null);
  };

  if (character) {
    return <CharacterSheet character={character} handleBackClick={closeCharacterSheet} />;
  }

  return (
    <>
      <Styled.CharacterList>
        {characters.map((character) => (
          <Styled.CharacterPreview key={character.id}>
            <DetailedPicture
              title={character.firstName}
              imageSrc={`${AVATAR_SRC_PREFIX}/${character.avatar}`}
              textColor={character.textColor}
              handleClick={() => selectCharacter(character)}
            />
            <Styled.Stats color={character.textColor}>
              <Styled.Stat color="var(--health)">
                <HealthIcon />
                <strong>{character.health}</strong>
                Santé
              </Styled.Stat>
              <Styled.Stat color="var(--spirit)">
                <SpiritIcon />
                <strong>{character.spirit}</strong>
                Esprit
              </Styled.Stat>
              <Styled.Stat color="var(--momentum)">
                <MomentumIcon />
                <strong>{character.momentum}</strong>
                Ferveur
              </Styled.Stat>
            </Styled.Stats>
          </Styled.CharacterPreview>
        ))}
      </Styled.CharacterList>
    </>
  );
}
