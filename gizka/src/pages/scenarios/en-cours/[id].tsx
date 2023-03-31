import { DialogThread } from '@/components/Dialog/DialogThread';
import { DicesHolster } from '@/components/Dices/DicesHolster';
import { DataDices } from '@/pages/api/dices';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { useLocalStorage } from '@/utils/hooks/localStorage';
import { User } from '@/utils/types/user';
import { GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';

import { LayoutMainSection, LayoutAsideSection } from '../../../components/Layout';
import { Post, Scenario } from '@/utils/types/scenario';
import { getCharactersList } from '@/utils/character/helpers';

type EnCoursWithIdProps = {
  id: string;
  posts: Post[];
  dices: DataDices;
  introduction: string;
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
      posts: scenario.posts,
      dices: [],
    },
  };
}

function generateIntroduction(scenario: Scenario) {
  const tokens = ['{{characters}}'];
  const replacements = [getCharactersList(scenario.characters)];

  return tokens.reduce(
    (acc, token, index) => acc.replace(token, replacements[index]),
    scenario.introduction,
  );
}

export default function EnCoursWithId({ posts, dices, introduction }: EnCoursWithIdProps) {
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
          dices={dices}
          initialDialogs={posts}
          introductionText={introduction}
        />
      </LayoutAsideSection>
      {currentUser && <DicesHolster dices={dices} />}
    </>
  );
}
