export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

import { NavBar } from '@/components/DesignSystem/NavBar';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { HomePage } from '@/components/Pages/HomePage';

export const metadata: Metadata = {
  title: 'Star Wars - Les Récits Perdus',
  description:
    'Star Wars - Les Récits Perdus : Un Jeu de Rôle moderne par et pour des fans de Star Wars',
};

export default function Home() {
  const links = [
    {
      label: 'Apprendre à jouer',
      href: '/create',
      description:
        'Le guide du jeu vous apprendra à contribuer aux scénarios et à forger votre propre récit dans la galaxie.',
    },
    {
      label: 'Créer un scénario',
      href: '/create',
      description:
        'Planifiez les missions les plus périlleuses, les aventures les plus palpitantes et les batailles les plus épiques.',
    },
    {
      label: 'Rejoindre un scénario',
      href: '/join',
      description:
        'Trouvez de nouveaux compagnons et prenez part à de grandes histoires partout dans la galaxie.',
    },
    {
      label: 'Scénarios en cours',
      href: '/scenarios/en-cours',
      description: 'Retrouvez tous les récits en cours.',
    },
    // ajouter "scénarios terminés"
    { label: 'Discord', href: '/current', description: 'Rejoignez le Discord Les Récits Perdus.' },
  ];

  return (
    <>
      <LayoutMainSection>
        <NavBar links={links} />
      </LayoutMainSection>
      <LayoutAsideSection>
        <HomePage />
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
