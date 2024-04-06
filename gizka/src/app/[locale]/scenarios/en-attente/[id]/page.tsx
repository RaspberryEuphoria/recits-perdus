export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

import { EnAttenteWithIdPage } from '@/components/Pages/EnAttenteWithIdPage';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { generateIntroduction } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';
import { Scenario } from '@/utils/types/scenario';

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const [scenarioId] = id.split('-');
  const scenario = await httpBffClient.get<Scenario>(`/scenario/${scenarioId}`);

  if (isHttpError(scenario) || !scenario) {
    throw new Error('Failed to fetch data');
  }

  const intro = generateIntroduction(scenario, false);
  const lastPost = scenario.posts.at(-1)?.content || intro;

  return {
    title: `${scenario.title} - Les Récits Perdus`,
    description: lastPost || intro,
  };
}

export default async function EnCoursWithId({ params: { id } }: { params: { id: string } }) {
  if (!id) {
    throw new Error('No id provided');
  }

  const [scenarioId] = id.split('-');
  const scenario = await httpBffClient.get<Scenario>(`/scenario/${scenarioId}`);

  if (isHttpError(scenario)) {
    throw new Error('Failed to fetch data');
  }

  const { title, safeTitle } = scenario;
  const introduction = generateIntroduction(scenario);
  const characters = mapScenarioCharacters(scenario.characters);
  const authorId = scenario.characters[0].userId;

  return (
    <EnAttenteWithIdPage
      id={id}
      introduction={introduction}
      title={title}
      safeTitle={safeTitle}
      characters={characters}
      authorId={authorId}
    />
  );
}

function mapScenarioCharacters(scenarioCharacters: Character[]) {
  return scenarioCharacters.reduce((acc, character) => {
    acc[character.id] = character;
    return acc;
  }, {} as Record<string, Character>);
}
