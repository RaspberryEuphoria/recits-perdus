export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Head from 'next/head';
import { getTranslations } from 'next-intl/server';

import { EnCoursWithIdPage } from '@/components/Pages/EnCoursWithIdPage';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { generateIntroduction, getNextPoster } from '@/utils/scenario/helpers';
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
  const lastPost = scenario.posts.at(-1)?.content || 'intro';

  return {
    title: `${scenario.title} - Les Récits Perdus`,
    description: lastPost || intro,
  };
}

export default async function EnCoursWithId({ params: { id } }: { params: { id: string } }) {
  const t = await getTranslations('scenarios');

  if (!id) {
    throw new Error('No id provided');
  }

  const [scenarioId] = id.split('-');
  const scenario = await httpBffClient.get<Scenario>(`/scenario/${scenarioId}`);

  if (isHttpError(scenario)) {
    throw new Error('Failed to fetch data');
  }

  const { title, posts, supplies } = scenario;
  const introduction = generateIntroduction(scenario);
  const nextPoster = getNextPoster(
    scenario.characters,
    scenario.posts[scenario.posts.length - 1]?.character,
  );
  const characters = mapScenarioCharacters(scenario.characters);

  return (
    <>
      <Head>
        <title>
          {title} - {t('title')}
        </title>
        <meta
          name="description"
          content={`
          Star Wars - ${t('title')} : ${title}.
          ${introduction}
        `}
        />
      </Head>
      <EnCoursWithIdPage
        id={id}
        introduction={introduction}
        title={title}
        posts={posts}
        nextPoster={nextPoster}
        characters={characters}
        supplies={supplies}
      />
    </>
  );
}

function mapScenarioCharacters(scenarioCharacters: Character[]) {
  return scenarioCharacters.reduce((acc, character) => {
    acc[character.id] = character;
    return acc;
  }, {} as Record<string, Character>);
}
