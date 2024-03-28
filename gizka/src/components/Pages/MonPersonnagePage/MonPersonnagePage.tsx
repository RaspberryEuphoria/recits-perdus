'use client';

import { useTranslations } from 'next-intl';

import { CharacterSheet } from '@/components/CharacterSheet';
import { Text } from '@/components/DesignSystem/Text';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { Character } from '@/utils/types/character';

export function MonPersonnagePage({ character }: { character: Character }) {
  const t = useTranslations('characters');

  return (
    <>
      <LayoutMainSection
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Mes personnages', href: '/mes-personnages' },
          { label: `${character.firstName} ${character.lastName}`, href: '#' },
        ]}
      >
        <Text as="h1">{t('character-sheet.title')}</Text>
        <CharacterSheet character={character} />
      </LayoutMainSection>
      <LayoutAsideSection>{''}</LayoutAsideSection>
    </>
  );
}
