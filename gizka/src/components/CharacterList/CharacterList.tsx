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
import { TextColor } from '@/utils/constants';

type CharacterListProps = {
  characters: Character[];
  children?: React.ReactNode;
  asPreview: boolean;
};

export function CharacterList({ characters, children, asPreview = false }: CharacterListProps) {
  const [character, setCharacter] = useState<Character | null>();

  console.log(characters);

  const selectCharacter = (character: Character) => {
    setCharacter(character);
  };

  const closeCharacterSheet = () => {
    setCharacter(null);
  };

  if (character) {
    return (
      <CharacterSheet
        character={character}
        asPreview={asPreview}
        handleBackClick={closeCharacterSheet}
      />
    );
  }

  return (
    <>
      <Styled.CharacterList>
        {characters.map((character) => (
          <Styled.CharacterPreview key={character.id}>
            <Styled.CharacterAvatar
              colorAtLightOpacity={convertHexadecimalColorToHsl(character.textColor, 0.2)}
              color={character.textColor || TextColor.Default}
              onClick={() => selectCharacter(character)}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/users/avatars/${character.avatar}`}
                alt="[Avatar manquant]"
                width={200}
                height={230}
                quality={100}
              />
              <Styled.CharacterName>{character.firstName}</Styled.CharacterName>
            </Styled.CharacterAvatar>
            {!asPreview && (
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
            )}
          </Styled.CharacterPreview>
        ))}
      </Styled.CharacterList>
      {children}
    </>
  );
}
