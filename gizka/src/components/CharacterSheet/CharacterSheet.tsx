import { CharacterAvatar } from '@/components/CharacterAvatar';
import { Keyword } from '@/components/DesignSystem/Keyword';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import DownArrowIcon from '@/public/images/icons/down_arrow.svg';
import HealthIcon from '@/public/images/icons/health.svg';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import SpiritIcon from '@/public/images/icons/spirit.svg';
import { convertHexadecimalColorToHsl } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';

import * as Styled from './styled';

type CharacterSheetProps = {
  character: Character;
  handleBackClick: () => void;
};

export function CharacterSheet({ character, handleBackClick }: CharacterSheetProps) {
  const colorAtLightOpacity = convertHexadecimalColorToHsl(character.textColor, 0.2);

  return (
    <Styled.CharacterSheet>
      <Row>
        <Styled.BackButton onClick={handleBackClick}>
          <DownArrowIcon /> Retour
        </Styled.BackButton>
      </Row>
      <Row>
        <Styled.Character>
          <CharacterAvatar character={character} />

          {character.health != null && (
            <Styled.Stats>
              <Keyword stat="health">
                <HealthIcon />
                <span>
                  <strong>{character.health}/5</strong> Santé
                </span>
              </Keyword>
              <Keyword stat="spirit">
                <SpiritIcon />
                <span>
                  <strong>{character.spirit}/5</strong> Esprit
                </span>
              </Keyword>
              <Keyword stat="momentum">
                <MomentumIcon />
                <span>
                  <strong>{character.momentum}</strong> Ferveur
                </span>
              </Keyword>
            </Styled.Stats>
          )}
        </Styled.Character>

        <Styled.CharacterData color={character.textColor}>
          <Styled.CharacterName color={character.textColor}>
            {character.firstName} {character.lastName}
          </Styled.CharacterName>
          <Styled.Title color={character.textColor}>Attributs</Styled.Title>

          <Styled.Skills>
            {character.skills.map((skill) => (
              <Styled.Skill key={skill.id} color={colorAtLightOpacity}>
                <strong>
                  {skill.name} (+{skill.level})
                </strong>
                <p>{skill.skill.description}</p>
              </Styled.Skill>
            ))}
          </Styled.Skills>
        </Styled.CharacterData>
      </Row>

      {character.story && (
        <Row>
          <Styled.Block color={character.textColor}>
            <Styled.Title color={character.textColor}>Histoire</Styled.Title>
            <Text size="md">{character.story}</Text>
          </Styled.Block>
        </Row>
      )}
      <Row>
        <Styled.Block color={character.textColor}>
          <Styled.Title color={character.textColor}>Scénarios</Styled.Title> <em>(à venir)</em>
        </Styled.Block>
      </Row>
      <Row>
        <Styled.Block color={character.textColor}>
          <Styled.Title color={character.textColor}>Statistiques</Styled.Title> <em>(à venir)</em>
        </Styled.Block>
      </Row>
    </Styled.CharacterSheet>
  );
}
