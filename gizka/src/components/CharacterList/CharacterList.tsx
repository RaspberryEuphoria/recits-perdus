// eslint-disable-next-line simple-import-sort/imports
import Image from 'next/image';
import { useState } from 'react';

import HealthIcon from '@/public/images/icons/health.svg';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import SpiritIcon from '@/public/images/icons/spirit.svg';
import { convertHexadecimalColorToHsl } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';

import * as Styled from './styled';
import { CharacterSheet } from '@/components/CharacterSheet';

type CharacterListProps = {
  characters: Character[];
  children: React.ReactNode;
};

export function CharacterList({ characters, children }: CharacterListProps) {
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
            <Styled.CharacterAvatar
              colorAtLightOpacity={convertHexadecimalColorToHsl(character.textColor, 0.2)}
              color={character.textColor}
              onClick={() => selectCharacter(character)}
            >
              <Image
                src={`/images/users/avatars/${character.avatar}`}
                alt="[Avatar manquant]"
                width={200}
                height={230}
                quality={100}
              />
              <Styled.CharacterName>{character.firstName}</Styled.CharacterName>
            </Styled.CharacterAvatar>
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
                Élan
              </Styled.Stat>
            </Styled.Stats>
          </Styled.CharacterPreview>
        ))}
      </Styled.CharacterList>
      {children}
    </>
  );
}
