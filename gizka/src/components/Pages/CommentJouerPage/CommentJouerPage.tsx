'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { CharacterEditor } from '@/components/CharacterEditor';
import { Button } from '@/components/DesignSystem/Button';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import { DialogThread } from '@/components/Dialog/DialogThread';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { getSafeName } from '@/utils/character/helpers';
import { TextColor } from '@/utils/constants';
import { Character } from '@/utils/types/character';
import { Post } from '@/utils/types/scenario';

import * as Styled from './styled';

type CommentJouerPageProps = {
  introduction?: string;
  posts?: Post[];
  characters?: Record<string, Character>;
};

export function CommentJouerPage(props: CommentJouerPageProps) {
  const { introduction, posts, characters } = props;

  const t = useTranslations('common');
  const [character, setCharacter] = useState<Character | null>(null);
  const [currentModule, setCurrentModule] = useState<'characterEditor' | 'rolePlayExample' | null>(
    null,
  );

  const breadcrumb = useMemo(() => {
    return [
      { label: t('howToPlay.breadcrumb.home'), href: '/' },
      { label: t('howToPlay.breadcrumb.current'), href: '#' },
    ];
  }, [t]);

  const onCharacterSaved = (character: Character) => {
    setCharacter(character);
    setCurrentModule(null);
  };

  const toggleCharacterEditor = () => {
    setCurrentModule((prev) => (prev === 'characterEditor' ? null : 'characterEditor'));
  };

  const toggleRolePlayExample = () => {
    setCurrentModule((prev) => (prev === 'rolePlayExample' ? null : 'rolePlayExample'));
  };

  return (
    <>
      <LayoutMainSection breadcrumb={breadcrumb}>
        <Styled.Container>
          <Row space="1" direction="column">
            <Text as="h1" size="xl" color={TextColor.FlashyAlt}>
              {t('howToPlay.title')}
            </Text>
            <Text as="h2" size="lg" color={TextColor.FlashyAlt}>
              {t('howToPlay.subTitle')}
            </Text>
            <Text as="p">{t('howToPlay.intro')}</Text>
          </Row>

          <Row space="1" direction="column">
            <Text
              as="h2"
              size="lg"
              id={t('howToPlay.sections.first.id')}
              color={TextColor.FlashyAlt}
            >
              {t('howToPlay.sections.first.title')}
            </Text>
            <Text as="p">{t('howToPlay.sections.first.content')}</Text>
          </Row>

          <Row space="1" align="start">
            <Button outline variant="small" onClick={toggleCharacterEditor}>
              {t(
                `howToPlay.sections.first.${
                  currentModule === 'characterEditor' ? 'close' : 'open'
                }Editor`,
              )}
            </Button>
          </Row>

          <Row space="1" direction="column">
            <Text
              as="h2"
              size="lg"
              id={t('howToPlay.sections.second.id')}
              color={TextColor.FlashyAlt}
            >
              {t('howToPlay.sections.second.title')}
            </Text>
            <Text as="p">{t('howToPlay.sections.second.content')}</Text>
          </Row>

          <Row space="1" gap="1" align="center" justify="start">
            <Button outline variant="small" href="/scenarios/en-attente" target="_blank">
              {t(`howToPlay.sections.second.joinScenario`)}
            </Button>
            ou
            <Button outline variant="small" href="/scenarios" target="_blank">
              {t(`howToPlay.sections.second.createScenario`)}
            </Button>
          </Row>

          <Row space="1" direction="column">
            <Text
              as="h2"
              size="lg"
              id={t('howToPlay.sections.third.id')}
              color={TextColor.FlashyAlt}
            >
              {t('howToPlay.sections.third.title')}
            </Text>
            <Text as="p">{t('howToPlay.sections.third.content')}</Text>
          </Row>

          <Row space="1" align="start">
            <Button outline variant="small" onClick={toggleRolePlayExample}>
              {t(
                `howToPlay.example.${
                  currentModule === 'rolePlayExample' ? 'close' : 'open'
                }Example`,
              )}
            </Button>
          </Row>
        </Styled.Container>
      </LayoutMainSection>

      <LayoutAsideSection>
        {currentModule === 'characterEditor' && (
          <CharacterEditor onCharacterSaved={onCharacterSaved} />
        )}

        {currentModule === 'rolePlayExample' && introduction && posts && characters && (
          <DialogThread
            currentUserId={null}
            characters={characters}
            dialogs={posts}
            introductionText={introduction}
            isEditAllowed={false}
          />
        )}

        {!currentModule && character && (
          <Row space="1" direction="column">
            <Text as="h3" size="md" color={TextColor.FlashyAlt}>
              {t('howToPlay.sections.first.congratulations')} {character.firstName}{' '}
              {character.lastName}.
            </Text>
            <Text as="p" size="sm">
              {t('howToPlay.sections.first.retrieveCharacter')}{' '}
              <Link
                href={`/mes-personnages/${character.id}-${getSafeName(character)}`}
                target={'_blank'}
              >
                {t('howToPlay.sections.first.myCharacters')}
              </Link>
              .
            </Text>
            <Text as="p" size="sm">
              {t('howToPlay.sections.first.goodLuck')}
            </Text>
          </Row>
        )}
      </LayoutAsideSection>
    </>
  );
}
