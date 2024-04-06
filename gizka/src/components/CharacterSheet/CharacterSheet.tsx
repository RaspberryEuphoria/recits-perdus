import { CharacterAvatar } from '@/components/CharacterAvatar';
import { Button } from '@/components/DesignSystem/Button';
import { Keyword } from '@/components/DesignSystem/Keyword';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import HealthIcon from '@/public/images/icons/health.svg';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import SpiritIcon from '@/public/images/icons/spirit.svg';
import { convertHexadecimalColorToHsl } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';

import * as Styled from './styled';

type CharacterSheetProps = {
  character: Character;
  handleBackClick?: () => void;
};

export function CharacterSheet({ character, handleBackClick }: CharacterSheetProps) {
  const colorAtLightOpacity = convertHexadecimalColorToHsl(character.textColor, 0.2);
  return (
    <Styled.CharacterSheet>
      {handleBackClick && (
        <Row justify="end">
          <Button onClick={handleBackClick} outline variant="small">
            Retour
          </Button>
        </Row>
      )}

      <Row justify="end">
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
          <Styled.List>
            {character.skills.map((skill) => (
              <Styled.Item key={skill.id} color={colorAtLightOpacity}>
                <strong>
                  {skill.name} (+{skill.level})
                </strong>
                <p>{skill.skill.description}</p>
              </Styled.Item>
            ))}
          </Styled.List>

          <Styled.Title color={character.textColor}>Identité</Styled.Title>
          <Styled.List>
            <Styled.Item color={colorAtLightOpacity}>
              <strong>Prénom : {character.firstName} </strong>
            </Styled.Item>
            <Styled.Item color={colorAtLightOpacity}>
              <strong>Nom : {character.lastName} </strong>
            </Styled.Item>
            <Styled.Item color={colorAtLightOpacity}>
              <strong>Âge : {character.age} ans</strong>
            </Styled.Item>
            <Styled.Item color={colorAtLightOpacity}>
              <strong>Planète d&apos;origine : {character.origin}</strong>
            </Styled.Item>
          </Styled.List>
        </Styled.CharacterData>
      </Row>

      <Row justify="end">
        <Styled.Block color={character.textColor}>
          <Styled.Title color={character.textColor}>Histoire</Styled.Title>
          {character.story ? <Text size="md">{character.story}</Text> : <em>(à rédiger)</em>}
        </Styled.Block>
      </Row>

      <Row justify="end">
        <Styled.Block color={character.textColor}>
          <Styled.Title color={character.textColor}>Scénarios</Styled.Title> <em>(à venir)</em>
        </Styled.Block>
      </Row>
      <Row justify="end">
        <Styled.Block color={character.textColor}>
          <Styled.Title color={character.textColor}>Statistiques</Styled.Title> <em>(à venir)</em>
        </Styled.Block>
      </Row>
    </Styled.CharacterSheet>
  );
}
