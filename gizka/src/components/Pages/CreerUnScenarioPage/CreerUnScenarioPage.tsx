'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { CharacterEditor } from '@/components/CharacterEditor';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { LoginOrRegister } from '@/components/LoginOrRegister';
import { ScenarioEditor } from '@/components/ScenarioEditor';
import { Character } from '@/utils/types/character';
import { Scenario } from '@/utils/types/scenario';
import { User } from '@/utils/types/user';

export function CreerUnScenarioPage({
  currentUser,
  availableCharacters,
  unavailableCharacters,
}: {
  currentUser: User | null;
  availableCharacters: Array<Character>;
  unavailableCharacters: Array<Character>;
}) {
  const t = useTranslations('scenarios');
  const router = useRouter();

  const breadcrumb = [
    { label: t('creer.breadcrumb.home'), href: '/' },
    { label: t('creer.breadcrumb.current'), href: '#' },
  ];

  const onScenarioSaved = (scenario: Scenario) => {
    router.push(`/scenarios/en-attente/${scenario.safeTitle}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCharacterSaved = (_: Character) => {
    router.refresh();
  };

  if (!currentUser) {
    return (
      <>
        <LayoutMainSection breadcrumb={breadcrumb}>{t('creer.must-login')}</LayoutMainSection>
        <LayoutAsideSection>
          <LoginOrRegister />
        </LayoutAsideSection>
      </>
    );
  }

  return (
    <>
      <LayoutMainSection breadcrumb={breadcrumb}>
        <ScenarioEditor
          availableCharacters={availableCharacters}
          unavailableCharacters={unavailableCharacters}
          onScenarioSaved={onScenarioSaved}
        />
      </LayoutMainSection>
      <LayoutAsideSection>
        <CharacterEditor onCharacterSaved={onCharacterSaved} />
      </LayoutAsideSection>
    </>
  );
}
