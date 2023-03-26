import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { ScenariosListPage } from '@/components/ScenariosListPage';
import { ScenariosFilters } from '@/components/ScenariosListPage/ScenariosFilters';
import { httpClient, isHttpError } from '@/services/http-client';
import { Scenario, ScenarioStatus } from '@/utils/types/scenario';
import { GetServerSidePropsResult } from 'next';
import { useEffect, useState } from 'react';

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
  const [scenarios, setScenarios] = useState(initialScenarios);
  const locationsWithoutDuplicates = [...new Set(initialScenarios.map(getLocation))];
  const erasWithoutDuplicates = [...new Set(initialScenarios.map(getEra))];

  const [activeLocations, setActiveLocations] = useState<string[]>(
    locationsWithoutDuplicates.sort(sortByAlphabeticalOrder),
  );
  const [activeEras, setActiveEras] = useState<string[]>(
    erasWithoutDuplicates.sort(sortByAlphabeticalOrder),
  );
  const [withCharacters, setWithCharacters] = useState<string[] | null>(null);

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

  const filterByCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!value.length) {
      setWithCharacters(null);
      return;
    }

    setWithCharacters(
      value
        .split(',')
        .map((character) => character.trim().toLocaleLowerCase())
        .filter((v) => v),
    );
  };

  useEffect(() => {
    const filteredScenarios = initialScenarios.filter((scenario) => {
      const hasCharacters = withCharacters
        ? scenario.characters.some((character) =>
            withCharacters.some((withCharacter) =>
              character.name.toLocaleLowerCase().includes(withCharacter),
            ),
          )
        : true;

      console.log(
        withCharacters,
        withCharacters && withCharacters.includes('qui-gon jinn'),
        // withCharacters,
        // scenario.characters.map((character) => character.name.toLocaleLowerCase()),
        // hasCharacters,
      );

      return (
        activeLocations.includes(scenario.location) &&
        activeEras.includes(scenario.era) &&
        hasCharacters
      );
    });

    setScenarios(filteredScenarios);
  }, [activeEras, activeLocations, withCharacters, initialScenarios]);

  return (
    <>
      <LayoutMainSection breadcrumb={[{ label: 'Accueil', href: '/' }]}>
        <ScenariosListPage scenarios={scenarios} />
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
          filterByCharacter={filterByCharacter}
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
