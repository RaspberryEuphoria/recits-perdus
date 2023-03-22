import { DialogThread } from '@/components/Dialog/DialogThread';
import { DicesHolster } from '@/components/Dices/DicesHolster';
import { DataDialogs } from '@/pages/api/dialog';
import { DataDices } from '@/pages/api/dices';
import { httpBffClient } from '@/services/http-client';
import { useLocalStorage } from '@/utils/hooks/localStorage';
import { User } from '@/utils/types/user';
import { InferGetServerSidePropsType } from 'next';

import { LayoutMainSection, LayoutAsideSection } from '../../../components/Layout';

type EnCoursProps = {
  id: string;
  posts: DataDialogs;
  dices: DataDices;
};

export async function getServerSideProps(
  context: InferGetServerSidePropsType<any>,
): Promise<{ props: EnCoursProps }> {
  const { id } = context.query;

  const thread = await httpBffClient.get(`/thread/${id}`);

  return {
    props: {
      id,
      posts: thread.posts,
      dices: [],
    },
  };
}

export default function EnCours({ posts, dices }: EnCoursProps) {
  const [currentUser] = useLocalStorage<User>('currentUser');
  return (
    <>
      <LayoutMainSection>LayoutMainSection</LayoutMainSection>
      <LayoutAsideSection>
        <DialogThread currentUser={currentUser} dices={dices} initialDialogs={posts} />
      </LayoutAsideSection>
      {currentUser && <DicesHolster dices={dices} />}
    </>
  );
}
