import { GetServerSidePropsResult } from 'next';
import { useState } from 'react';

import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { ScenariosListPage } from '@/components/ScenariosListPage';
import { ScenariosFilters } from '@/components/ScenariosListPage/ScenariosFilters';
import { httpClient, isHttpError } from '@/services/http-client';
import { Scenario, ScenarioStatus } from '@/utils/types/scenario';

type EnCoursProps = {
  scenarios: Scenario[];
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<EnCoursProps>> {
  const scenarios = await httpClient.get<Scenario[]>(
    `/scenario?status=${ScenarioStatus.IN_PROGRESS}`,
  );

  if (isHttpError(scenarios)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      scenarios,
    },
  };
}

export default function EnCours({ scenarios: initialScenarios }: EnCoursProps) {
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
          { label: 'Accueil', href: '/' },
          { label: 'Scénarios en cours', href: '#' },
        ]}
      >
        <ScenariosListPage scenarios={scenarios} />
      </LayoutMainSection>
      <LayoutAsideSection breadcrumb={[]}>
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
