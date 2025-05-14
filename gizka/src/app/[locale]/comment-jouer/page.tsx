import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CommentJouerPage } from '@/components/Pages/CommentJouerPage';
import { httpClient, isHttpError } from '@/services/http-client';
import { generateIntroduction } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';
import { Scenario } from '@/utils/types/scenario';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('common');

  return {
    title: `${t('howToPlay.title')} - ${t('title')}`,
    description: t('howToPlay.description'),
  };
}

export default async function TheLastStand() {
  const scenario = await httpClient.get<Scenario>(`/scenario/10`);

  if (isHttpError(scenario)) {
    return <CommentJouerPage />;
  }

  const introduction = generateIntroduction(scenario);
  const characters = mapScenarioCharacters(scenario.characters);

  return (
    <CommentJouerPage introduction={introduction} posts={scenario.posts} characters={characters} />
  );
}

function mapScenarioCharacters(scenarioCharacters: Character[]) {
  return scenarioCharacters.reduce((acc, character) => {
    acc[character.id] = character;
    return acc;
  }, {} as Record<string, Character>);
}
