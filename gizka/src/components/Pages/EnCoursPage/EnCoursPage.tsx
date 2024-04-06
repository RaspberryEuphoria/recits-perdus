'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { ScenariosListPage } from '@/components/ScenariosListPage';
import { ScenariosFilters } from '@/components/ScenariosListPage/ScenariosFilters';
import { Scenario } from '@/utils/types/scenario';

export function EnCoursPage({
  scenarios: initialScenarios,
  parentPage,
}: {
  scenarios: Scenario[];
  parentPage: 'en-cours' | 'en-attente';
}) {
  const t = useTranslations('scenarios');

  const locationsWithoutDuplicates = [...new Set(initialScenarios.map(getLocation))];
  const erasWithoutDuplicates = [...new Set(initialScenarios.map(getEra))];

  const [activeLocations, setActiveLocations] = useState<string[]>(
    locationsWithoutDuplicates.sort(sortByAlphabeticalOrder),
  );
  const [activeEras, setActiveEras] = useState<string[]>(
    erasWithoutDuplicates.sort(sortByAlphabeticalOrder),
  );
  /** If activeCharacters is null or empty, we consider that all characters are active. */
  const [activeCharacters, setActiveCharacters] = useState<string[] | null>(null);

  const filterScenariosByLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setActiveLocations((previousActiveLocations) => {
      if (previousActiveLocations.includes(value)) {
        return previousActiveLocations.filter((location) => location !== value);
      }

      return [...previousActiveLocations, value];
    });
  };

  const filterScenariosByEra = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setActiveEras((previousActiveEras) => {
      if (previousActiveEras.includes(value)) {
        return previousActiveEras.filter((era) => era !== value);
      }

      return [...previousActiveEras, value];
    });
  };

  const filterScenariosByCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!value.length) {
      setActiveCharacters(null);
      return;
    }

    setActiveCharacters(
      value
        .split(',')
        .map((character) => character.trim().toLocaleLowerCase())
        .filter((v) => v),
    );
  };

  const hasCharacters = (scenario: Scenario): boolean => {
    if (!activeCharacters) return true;

    return scenario.characters.some((character) =>
      activeCharacters.some(
        (withCharacter) =>
          character.firstName.toLocaleLowerCase().includes(withCharacter) ||
          character.lastName.toLocaleLowerCase().includes(withCharacter),
      ),
    );
  };

  const isScenarioActive = (scenario: Scenario): boolean => {
    return (
      activeLocations.includes(scenario.location) &&
      activeEras.includes(scenario.era) &&
      hasCharacters(scenario)
    );
  };

  const scenarios = initialScenarios.filter(isScenarioActive);

  return (
    <>
      <LayoutMainSection
        breadcrumb={[
          { label: t(`${parentPage}.breadcrumb.home`), href: '/' },
          { label: t(`${parentPage}.breadcrumb.current`), href: '#' },
        ]}
      >
        <ScenariosListPage scenarios={scenarios} linkPrefix={`scenarios/${parentPage}`} />
      </LayoutMainSection>
      <LayoutAsideSection>
        <ScenariosFilters
          scenariosCount={scenarios.length}
          locations={locationsWithoutDuplicates}
          eras={erasWithoutDuplicates}
          activeLocations={activeLocations}
          activeEras={activeEras}
          filterByLocation={filterScenariosByLocation}
          filterByEra={filterScenariosByEra}
          filterByCharacter={filterScenariosByCharacter}
        />
      </LayoutAsideSection>
    </>
  );
}

function getLocation(scenario: Scenario): string {
  return scenario.location;
}

function getEra(scenario: Scenario): string {
  return scenario.era;
}

function sortByAlphabeticalOrder(a: string, b: string): number {
  return a.localeCompare(b);
}
