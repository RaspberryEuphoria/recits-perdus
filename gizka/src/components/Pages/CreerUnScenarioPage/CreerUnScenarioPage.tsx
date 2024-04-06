'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { CharacterEditor } from '@/components/CharacterEditor';
import { Button } from '@/components/DesignSystem/Button';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { LoginOrRegister } from '@/components/LoginOrRegister';
import { ScenarioEditor } from '@/components/ScenarioEditor';
import { Character } from '@/utils/types/character';
import { Scenario } from '@/utils/types/scenario';
import { User } from '@/utils/types/user';

import * as Styled from './styled';

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
  const [showCharacterEditor, setShowCharacterEditor] = useState(false);

  const breadcrumb = [
    { label: t('creer.breadcrumb.home'), href: '/' },
    { label: t('creer.breadcrumb.current'), href: '#' },
  ];

  const onScenarioSaved = (scenario: Scenario) => {
    router.push(`/scenarios/en-attente/${scenario.id}-${scenario.safeTitle}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCharacterSaved = (_: Character) => {
    router.refresh();
    setShowCharacterEditor(false);
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
        {showCharacterEditor ? (
          <>
            <Styled.CharacterCreation>
              <Row justify="end">
                <Button onClick={() => setShowCharacterEditor(false)} outline variant="small">
                  {t('creer.new-character-back')}
                </Button>
              </Row>
            </Styled.CharacterCreation>
            <CharacterEditor onCharacterSaved={onCharacterSaved} />
          </>
        ) : (
          <Styled.CharacterCreation>
            <Text as="p">{t('creer.new-character-details')}</Text>
            <Row space="1" justify="end">
              <Button onClick={() => setShowCharacterEditor(true)} outline variant="small">
                {t('creer.new-character')}
              </Button>
            </Row>
          </Styled.CharacterCreation>
        )}
      </LayoutAsideSection>
    </>
  );
}
