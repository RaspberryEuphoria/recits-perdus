export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

import { HomePage } from '@/components/Pages/HomePage';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { Character, CharacterStats } from '@/utils/types/character';
import { Scenario, ScenarioStats, ScenarioStatus } from '@/utils/types/scenario';
import { UserStats } from '@/utils/types/user';

export const metadata: Metadata = {
  title: 'Star Wars - Les Récits Perdus',
  description:
    'Star Wars - Les Récits Perdus : Un Jeu de Rôle moderne par et pour des fans de Star Wars',
};

async function getData(): Promise<{
  userCount: number;
  characterCount: number;
  scenarioCount: number;
  postCount: number;
  diceCount: number;
  lastPost: {
    id: number;
    url: string;
    character: Pick<Character, 'firstName' | 'lastName' | 'textColor' | 'avatar'>;
    scenario: Pick<Scenario, 'id' | 'title' | 'safeTitle' | 'status' | 'era' | 'location'>;
    postAt: string;
  };
}> {
  const userStats = await httpBffClient.get<UserStats>(`/user/stats`);
  if (isHttpError(userStats)) {
    throw new Error('Failed to fetch user stats');
  }

  const characterStats = await httpBffClient.get<CharacterStats>(`/character/stats`);
  if (isHttpError(characterStats)) {
    throw new Error('Failed to fetch character stats');
  }

  const scenarioStats = await httpBffClient.get<ScenarioStats>(`/scenario/stats`);
  if (isHttpError(scenarioStats)) {
    throw new Error('Failed to fetch scenario stats');
  }

  const lastPostLinkPrefix = getLinkPrefixByStatus(scenarioStats.lastPostScenario.status);

  return {
    userCount: userStats.count,
    characterCount: characterStats.count,
    scenarioCount: scenarioStats.count,
    postCount: scenarioStats.postCount,
    diceCount: scenarioStats.diceCount,
    lastPost: {
      id: scenarioStats.lastPostId,
      url: `/scenarios/${lastPostLinkPrefix}/${scenarioStats.lastPostScenario.id}-${scenarioStats.lastPostScenario.safeTitle}#message-${scenarioStats.lastPostId}`,
      character: scenarioStats.lastPostCharacter,
      scenario: scenarioStats.lastPostScenario,
      postAt: scenarioStats.lastPostAt,
    },
  };
}

export default async function Home() {
  const stats = await getData();

  return <HomePage {...stats} />;
}

function getLinkPrefixByStatus(status: ScenarioStatus): string {
  switch (status) {
    case ScenarioStatus.FINISHED:
      return 'archives';
    case ScenarioStatus.INITIATED:
      return 'en-attente';
    case ScenarioStatus.IN_PROGRESS:
      return 'en-cours';
    default:
      return 'en-cours';
  }
}
