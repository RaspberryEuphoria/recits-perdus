export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { MesPersonnagesPage } from '@/components/Pages/MesPersonnagesPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('characters');

  return {
    title: t('my-characters.title'),
    description: t('my-characters.description'),
  };
}

export default function MesPersonnages() {
  return <MesPersonnagesPage />;
}
