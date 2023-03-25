import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { ScenariosListPage } from '@/components/ScenariosListPage';
import { ScenariosFilters } from '@/components/ScenariosListPage/ScenariosFilters';
import { httpClient, isHttpError } from '@/services/http-client';
import { Thread, ThreadStatus } from '@/utils/types/thread';
import { GetServerSidePropsResult } from 'next';
import { useEffect, useState } from 'react';

type EnCoursProps = {
  threads: Thread[];
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<EnCoursProps>> {
  const threads = await httpClient.get<Thread[]>(`/thread?status=${ThreadStatus.IN_PROGRESS}`);

  if (isHttpError(threads)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      threads,
    },
  };
}

export default function EnCours({ threads: initialThreads }: EnCoursProps) {
  const [threads, setThreads] = useState(initialThreads);
  const locationsWithoutDuplicates = [...new Set(initialThreads.map(getLocation))];
  const erasWithoutDuplicates = [...new Set(initialThreads.map(getEra))];

  const [activeLocations, setActiveLocations] = useState<string[]>(
    locationsWithoutDuplicates.sort(sortByAlphabeticalOrder),
  );
  const [activeEras, setActiveEras] = useState<string[]>(
    erasWithoutDuplicates.sort(sortByAlphabeticalOrder),
  );

  const filterThreadsByLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setActiveLocations((previousActiveLocations) => {
      if (previousActiveLocations.includes(value)) {
        return previousActiveLocations.filter((location) => location !== value);
      }

      return [...previousActiveLocations, value];
    });
  };

  const filterThreadsByEra = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setActiveEras((previousActiveEras) => {
      if (previousActiveEras.includes(value)) {
        return previousActiveEras.filter((era) => era !== value);
      }

      return [...previousActiveEras, value];
    });
  };

  useEffect(() => {
    const filteredThreads = initialThreads.filter(
      (thread) => activeLocations.includes(thread.location) && activeEras.includes(thread.era),
    );

    setThreads(filteredThreads);
  }, [activeEras, activeLocations, initialThreads]);

  return (
    <>
      <LayoutMainSection breadcrumb={[{ label: 'Accueil', href: '/' }]}>
        <ScenariosListPage scenarios={threads} />
      </LayoutMainSection>
      <LayoutAsideSection>
        <ScenariosFilters
          threadsCount={threads.length}
          locations={locationsWithoutDuplicates}
          eras={erasWithoutDuplicates}
          activeLocations={activeLocations}
          activeEras={activeEras}
          filterByLocation={filterThreadsByLocation}
          filterByEra={filterThreadsByEra}
        />
      </LayoutAsideSection>
    </>
  );
}

function getLocation(thread: Thread): string {
  return thread.location;
}

function getEra(thread: Thread): string {
  return thread.era;
}

function sortByAlphabeticalOrder(a: string, b: string): number {
  return a.localeCompare(b);
}
