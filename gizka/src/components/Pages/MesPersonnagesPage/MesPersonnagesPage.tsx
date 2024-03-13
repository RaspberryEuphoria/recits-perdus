'use client';

import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { Text } from '@/components/DesignSystem/Text';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { LoginOrRegister } from '@/components/LoginOrRegister';
import { UserCharacterList } from '@/components/UserCharacterList';
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
          {''}
        </LayoutMainSection>
        <LayoutAsideSection>
          <LoginOrRegister />
        </LayoutAsideSection>
      </>
    );
  }

  return (
    <>
      <LayoutMainSection
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Mes personnages', href: '#' },
        ]}
      >
        <UserCharacterList characters={characters} />
      </LayoutMainSection>
      <LayoutAsideSection>
        <Text as="h1">
          {t('my-characters.sections.create.title')} (<em>en construction</em>)
        </Text>
      </LayoutAsideSection>
    </>
  );
}
