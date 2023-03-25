import { DialogThread } from '@/components/Dialog/DialogThread';
import { DicesHolster } from '@/components/Dices/DicesHolster';
import { DataDialogs } from '@/pages/api/dialog';
import { DataDices } from '@/pages/api/dices';
import { httpBffClient } from '@/services/http-client';
import { useLocalStorage } from '@/utils/hooks/localStorage';
import { User } from '@/utils/types/user';
import { InferGetServerSidePropsType } from 'next';

import { LayoutMainSection, LayoutAsideSection } from '../../../components/Layout';

type EnCoursWithIdProps = {
  id: string;
  posts: DataDialogs;
  dices: DataDices;
};

export async function getServerSideProps(
  context: InferGetServerSidePropsType<any>,
): Promise<{ props: EnCoursWithIdProps }> {
  const { id } = context.query;
  const threadId = id.split('-')[0];
  const thread = await httpBffClient.get(`/thread/${threadId}`);

  return {
    props: {
      id,
      posts: thread.posts,
      dices: [],
    },
  };
}

export default function EnCoursWithId({ posts, dices }: EnCoursWithIdProps) {
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
        <DialogThread currentUser={currentUser} dices={dices} initialDialogs={posts} />
      </LayoutAsideSection>
      {currentUser && <DicesHolster dices={dices} />}
    </>
  );
}
