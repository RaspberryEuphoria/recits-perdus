'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { CharacterEditor } from '@/components/CharacterEditor';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { LoginOrRegister } from '@/components/LoginOrRegister';
import { UserCharacterList } from '@/components/UserCharacterList';
import { UserContext } from '@/contexts/user';
import { useCharactersByUser } from '@/hooks/useCharacters';
import { getSafeName } from '@/utils/character/helpers';
import { Character } from '@/utils/types/character';

export function MesPersonnagesPage() {
  const t = useTranslations('characters');
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const { characters } = useCharactersByUser(currentUser?.id);

  const onCharacterSaved = (character: Character) => {
    const characterId = character.id;
    const safeName = getSafeName(character);
    router.push(`/mes-personnages/${characterId}-${safeName}`);
  };

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
        <CharacterEditor onCharacterSaved={onCharacterSaved} />
      </LayoutAsideSection>
    </>
  );
}
