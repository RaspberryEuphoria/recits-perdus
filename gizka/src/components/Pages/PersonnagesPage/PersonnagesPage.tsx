'use client';

import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { UserCharacterList } from '@/components/UserCharacterList';
import { Character } from '@/utils/types/character';

type PersonnagePageProps = {
  characters: Character[];
};

export function PersonnagesPage(props: PersonnagePageProps) {
  const { characters } = props;

  return (
    <>
      <LayoutMainSection
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Personnages', href: '#' },
        ]}
      >
        <UserCharacterList characters={characters} />
      </LayoutMainSection>
      <LayoutAsideSection> </LayoutAsideSection>
    </>
  );
}
