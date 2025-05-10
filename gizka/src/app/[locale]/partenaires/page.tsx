import { Metadata } from 'next';

import { PartenairesPage } from '@/components/Pages/PartenairesPage';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Partenaires - The Last Stand',
    description: '...',
  };
}

export default async function Partenaires() {
  return <PartenairesPage />;
}
