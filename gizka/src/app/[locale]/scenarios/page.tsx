export const dynamic = 'force-dynamic';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import { CreerUnScenarioPage } from '@/components/Pages/CreerUnScenarioPage';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { isCharacterAvailable } from '@/utils/character/helpers';
import { Character } from '@/utils/types/character';
import { User } from '@/utils/types/user';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('scenarios');

  return {
    title: t('creer.title'),
    description: t('creer.description'),
  };
}

async function getData(): Promise<{ currentUser: User | null; characters: Array<Character> }> {
  const accessToken = cookies().get('userAccessToken');
  if (!accessToken) {
    return { currentUser: null, characters: [] };
  }

  const decodedPayload = jwt.decode(accessToken.value);
  if (!decodedPayload) {
    return { currentUser: null, characters: [] };
  }

  const user = (decodedPayload as JwtPayload).payload;
  if (!user) {
    return { currentUser: null, characters: [] };
  }

  const characters = await httpBffClient.get<Array<Character>>(`/user/${user.id}/characters`);

  if (isHttpError(characters)) {
    throw new Error(`Failed to fetch characters: ${characters.message}`);
  }

  return { currentUser: user, characters };
}

export default async function CreerUnScenario() {
  const { currentUser, characters } = await getData();

  const availableCharacters = characters.filter(isCharacterAvailable);
  const unavailableCharacters = characters.filter((c) => !isCharacterAvailable(c));

  return (
    <CreerUnScenarioPage
      currentUser={currentUser}
      availableCharacters={availableCharacters}
      unavailableCharacters={unavailableCharacters}
    />
  );
}
