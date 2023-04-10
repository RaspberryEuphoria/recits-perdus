import Image from 'next/image';

import { convertHexadecimalColorToHsl } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';

import * as Styled from './styled';

type CharacterListProps = {
  characters: Character[];
};

export function CharacterList({ characters }: CharacterListProps) {
  return (
    <Styled.CharacterList>
      {characters.map((character) => (
        <Styled.Character
          key={character.id}
          colorAtLightOpacity={convertHexadecimalColorToHsl(character.textColor, 0.2)}
          color={character.textColor}
        >
          <Image
            src={`/images/users/avatars/${character.avatar}`}
            alt="bloblo"
            width={200}
            height={230}
          />
          <Styled.CharacterName color={character.textColor}>
            {character.firstName}
          </Styled.CharacterName>
        </Styled.Character>
      ))}
    </Styled.CharacterList>
  );
}
