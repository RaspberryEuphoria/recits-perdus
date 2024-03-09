import { Metadata } from 'next';

import { EnCoursPage } from '@/components/Pages/EnCoursPage';
import { httpClient, isHttpError } from '@/services/http-client';
import { Scenario, ScenarioStatus } from '@/utils/types/scenario';

export const metadata: Metadata = {
  title: 'Scénarios en cours - Les Récits Perdus',
  description:
    'Star Wars - Les Récits Perdus : Un Jeu de Rôle moderne par et pour des fans de Star Wars',
};

async function getData(): Promise<Scenario[]> {
  const scenarios = await httpClient.get<Scenario[]>(
    `/scenario?status=${ScenarioStatus.IN_PROGRESS}`,
  );

  if (isHttpError(scenarios)) {
    throw new Error('Failed to fetch data');
  }

  return scenarios;
}

export default async function EnCours() {
  const scenarios = await getData();

  return (
    <>
      <EnCoursPage scenarios={scenarios} />
    </>
  );
}
