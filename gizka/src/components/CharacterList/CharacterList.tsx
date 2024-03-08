import Image from 'next/image';

import HealthIcon from '@/public/images/icons/health.svg';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import SpiritIcon from '@/public/images/icons/spirit.svg';
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
        <Styled.CharacterSheet key={character.id}>
          <Styled.Character
            colorAtLightOpacity={convertHexadecimalColorToHsl(character.textColor, 0.2)}
            color={character.textColor}
          >
            <Image
              src={`/images/users/avatars/${character.avatar}`}
              alt="[Avatar manquant]"
              width={200}
              height={230}
              quality={100}
            />
            <Styled.CharacterName color={character.textColor}>
              {character.firstName}
            </Styled.CharacterName>
          </Styled.Character>
          <Styled.Stats>
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
        </Styled.CharacterSheet>
      ))}
    </Styled.CharacterList>
  );
}
