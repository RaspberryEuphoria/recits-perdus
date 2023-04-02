import { DialogThread } from '@/components/Dialog/DialogThread';
import { DicesHolster } from '@/components/Dices/DicesHolster';
import { DataDices } from '@/pages/api/dices';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { useLocalStorage } from '@/utils/hooks/localStorage';
import { User } from '@/utils/types/user';
import { GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';

import { LayoutMainSection, LayoutAsideSection } from '../../../components/Layout';
import { Post, Scenario } from '@/utils/types/scenario';
import { generateIntroduction, getNextPoster } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';

type EnCoursWithIdProps = {
  id: string;
  posts: Post[];
  dices: DataDices;
  introduction: string;
  nextPoster: Character;
  characters: Record<string, Character>;
};

export async function getServerSideProps(
  context: InferGetServerSidePropsType<any>,
): Promise<GetServerSidePropsResult<EnCoursWithIdProps>> {
  const { id } = context.query;
  const scenarioId = id.split('-')[0];
  const scenario = await httpBffClient.get<Scenario>(`/scenario/${scenarioId}`);

  if (isHttpError(scenario)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
      introduction: generateIntroduction(scenario),
      nextPoster: getNextPoster(
        scenario.characters,
        scenario.posts[scenario.posts.length - 1]?.character,
      ),
      posts: scenario.posts,
      // @TODO: add a mapper in the API to return this directly
      characters: scenario.characters.reduce((acc, character) => {
        acc[character.id] = character;
        return acc;
      }, {} as Record<string, Character>),
      dices: [],
    },
  };
}

export default function EnCoursWithId({
  posts,
  dices,
  introduction,
  nextPoster,
  characters,
}: EnCoursWithIdProps) {
  const [currentUser] = useLocalStorage<User>('currentUser');
  return (
    <>
      <LayoutMainSection
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Scénarios en cours', href: '/scenarios/en-cours' },
        ]}
      >
        LayoutMainSection
      </LayoutMainSection>
      <LayoutAsideSection>
        <DialogThread
          currentUser={currentUser}
          characters={characters}
          dices={dices}
          initialDialogs={posts}
          introductionText={introduction}
          nextPoster={nextPoster}
        />
      </LayoutAsideSection>
      {currentUser && <DicesHolster dices={dices} />}
    </>
  );
}
