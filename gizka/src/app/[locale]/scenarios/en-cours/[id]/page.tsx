export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

import { EnCoursWithIdPage } from '@/components/Pages/EnCoursWithIdPage';
import { httpClient, isHttpError } from '@/services/http-client';
import { generateIntroduction, getNextPoster } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';
import { Note, Scenario } from '@/utils/types/scenario';

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const [scenarioId] = id.split('-');
  const scenario = await httpClient.get<Scenario>(`/scenario/${scenarioId}`);

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
  const scenario = await httpClient.get<Scenario>(`/scenario/${scenarioId}`);
  const notesResponse = await httpClient.get<Note[]>(`/scenario/${scenarioId}/note`);

  if (isHttpError(scenario)) {
    throw new Error(`Failed to fetch scenario data for scenario ${scenarioId} (${id})`);
  }

  if (isHttpError(notesResponse)) {
    console.error(`Failed to fetch notes data for scenario ${scenarioId}`);
  }

  const notes = isHttpError(notesResponse) ? [] : notesResponse;

  const { title, posts, supplies } = scenario;
  const introduction = generateIntroduction(scenario);
  const nextPoster = getNextPoster(
    scenario.characters,
    scenario.posts[scenario.posts.length - 1]?.character,
  );
  const characters = mapScenarioCharacters(scenario.characters);

  return (
    <EnCoursWithIdPage
      id={id}
      introduction={introduction}
      title={title}
      posts={posts}
      notes={notes}
      nextPoster={nextPoster}
      characters={characters}
      supplies={supplies}
    />
  );
}

function mapScenarioCharacters(scenarioCharacters: Character[]) {
  return scenarioCharacters.reduce((acc, character) => {
    acc[character.id] = character;
    return acc;
  }, {} as Record<string, Character>);
}
