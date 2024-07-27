export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

import { NavBar } from '@/components/DesignSystem/NavBar';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { LoginOrRegister } from '@/components/LoginOrRegister';
import DiscordLogo from '@/public/images/icons/discord_logo.svg';

export const metadata: Metadata = {
  title: 'Star Wars - Les Récits Perdus',
  description:
    'Star Wars - Les Récits Perdus : Un Jeu de Rôle moderne par et pour des fans de Star Wars',
};

const links = [
  {
    label: 'Apprendre à jouer',
    href: '/create',
    isDisabled: true,
  },
  {
    label: 'Rejoindre un scénario',
    href: '/join',
    isDisabled: true,
  },
  {
    label: 'Mes personnages',
    href: '/mes-personnages',
    isDisabled: false,
  },
  {
    label: 'Créer un scénario',
    href: '/scenarios',
    isDisabled: false,
  },
  {
    label: 'Rejoindre un scénario',
    href: '/scenarios/en-attente',
    isDisabled: false,
  },
  {
    label: 'Scénarios en cours',
    href: '/scenarios/en-cours',
    isDisabled: false,
  },
  {
    label: 'Scénarios finis',
    href: '/scenarios/finis',
    isDisabled: true,
  },
  {
    label: 'Discord',
    logo: <DiscordLogo />,
    href: `${process.env.NEXT_PUBLIC_DISCORD_LINK}`,
    isDisabled: false,
    isBlank: true,
  },
];

export default function Home() {
  return (
    <>
      <LayoutMainSection>
        <NavBar links={links} />
      </LayoutMainSection>
      <LayoutAsideSection>
        <LoginOrRegister />
      </LayoutAsideSection>
    </>
  );
}
