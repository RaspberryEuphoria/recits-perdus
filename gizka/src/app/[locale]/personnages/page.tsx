export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PersonnagesPage } from '@/components/Pages/PersonnagesPage';
import { httpClient, isHttpError } from '@/services/http-client';
import { Character } from '@/utils/types/character';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('characters');

  return {
    title: t('characters.title'),
    description: t('characters.description'),
  };
}

async function getData(): Promise<Character[]> {
  const characters = await httpClient.get<Character[]>(`/character`);

  if (isHttpError(characters)) {
    throw new Error('Failed to fetch data');
  }

  return characters;
}

export default async function MesPersonnages() {
  const characters = await getData();

  return <PersonnagesPage characters={characters} />;
}
