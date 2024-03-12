'use client';

import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { CharacterList } from '@/components/CharacterList';
import { Text } from '@/components/DesignSystem/Text';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { LoginOrRegister } from '@/components/LoginOrRegister';
import { UserContext } from '@/contexts/user';
import { useCharactersByUser } from '@/hooks/useCharacters';

export function MesPersonnagesPage() {
  const t = useTranslations('characters');
  const { currentUser } = useContext(UserContext);
  const { characters } = useCharactersByUser(currentUser?.id);

  if (!currentUser) {
    return (
      <>
        <LayoutMainSection
          breadcrumb={[
            { label: t('my-characters.breadcrumb.home'), href: '/' },
            { label: t('my-characters.breadcrumb.characters'), href: '#' },
          ]}
        >
          <Text>bobo</Text>
        </LayoutMainSection>
        <LayoutAsideSection>
          <LoginOrRegister />
        </LayoutAsideSection>
      </>
    );
  }

  if (!characters) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <LayoutMainSection
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Mes personnages', href: '#' },
        ]}
      >
        <CharacterList characters={characters} />
      </LayoutMainSection>
      <LayoutAsideSection>Xoxo</LayoutAsideSection>
    </>
  );
}
