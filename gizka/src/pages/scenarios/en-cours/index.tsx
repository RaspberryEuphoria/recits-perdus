import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { ScenariosListPage } from '@/components/ScenariosListPage';
import { httpClient, isHttpError } from '@/services/http-client';
import { Thread, ThreadStatus } from '@/utils/types/thread';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';

type EnCoursProps = {
  threads: Thread[];
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<EnCoursProps>> {
  const threads = await httpClient.get<Thread[]>(`/thread?status=${ThreadStatus.IN_PROGRESS}`);

  if (isHttpError(threads)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      threads,
    },
  };
}

export default function EnCours({ threads }: EnCoursProps) {
  return (
    <>
      <LayoutMainSection breadcrumb={[{ label: 'Accueil', href: '/' }]}>
        <ScenariosListPage scenarios={threads} />
      </LayoutMainSection>
      <LayoutAsideSection>LayoutAsideSection</LayoutAsideSection>
    </>
  );
}
