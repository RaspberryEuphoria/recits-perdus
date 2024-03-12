export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

import { NavBar } from '@/components/DesignSystem/NavBar';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { LoginOrRegister } from '@/components/LoginOrRegister';

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
    label: 'Créer un scénario',
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
    href: 'https://discord.gg/TmpaGgfB',
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

// export async function getStaticProps() {
//   return {
//     props: {
//       footer: [
//         `Programmé et designé avec ❤️ par <em>Harmonie</em>`,
//         `<em>Star Wars : Les Récits Perdus</em> est l&apos;héritier de <em>Tales of Galaxy</em>`,
//       ],
//     },
//   };
// }
