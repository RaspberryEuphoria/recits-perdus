export const dynamic = 'force-dynamic';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { MonPersonnagePage } from '@/components/Pages/MonPersonnagePage';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { Character } from '@/utils/types/character';

export async function generateMetadata({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}): Promise<Metadata> {
  const t = await getTranslations('characters');

  const accessToken = cookies().get('userAccessToken');
  if (!accessToken) {
    redirect(`/${locale}`);
  }

  const decodedPayload = jwt.decode(accessToken.value);
  if (!decodedPayload) {
    redirect(`/${locale}`);
  }

  const user = (decodedPayload as JwtPayload).payload;
  if (!user) {
    redirect(`/${locale}`);
  }

  const [characterId] = id.split('-');
  const character = await httpBffClient.get<Character>(
    `/user/${user.id}/characters/${characterId}`,
  );

  if (isHttpError(character)) {
    throw new Error(`Failed to fetch data for character ${characterId}: ${character.message}`);
  }

  if (character.userId !== user.id) {
    throw new Error(`Character ${character.id} does not belong to user ${user.id}`);
  }

  return {
    title: `${character.firstName} ${character.lastName} - ${t('title')}`,
  };
}

export default async function MesPersonnagesWithId({ params: { id, locale } }: { params: { id: string; locale: string } }) {
  const accessToken = cookies().get('userAccessToken');
  if (!accessToken) {
    redirect(`/${locale}`);
  }

  const decodedPayload = jwt.decode(accessToken.value);
  if (!decodedPayload) {
    redirect(`/${locale}`);
  }

  const user = (decodedPayload as JwtPayload).payload;
  if (!user) {
    redirect(`/${locale}`);
  }

  const [characterId] = id.split('-');
  const character = await httpBffClient.get<Character>(
    `/user/${user.id}/characters/${characterId}`,
  );

  if (isHttpError(character)) {
    throw new Error(`Failed to fetch data for character ${characterId}: ${character.message}`);
  }

  if (character.userId !== user.id) {
    throw new Error(`Character ${character.id} does not belong to user ${user.id}`);
  }

  return <MonPersonnagePage character={character} />;
}
