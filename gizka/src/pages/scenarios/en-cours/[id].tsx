import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { CharacterList } from '@/components/CharacterList';
import { DialogThread } from '@/components/Dialog/DialogThread';
import { ScenarioResources } from '@/components/ScenarioResources';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { useLocalStorage } from '@/utils/hooks/localStorage';
import { checkIfGameMaster, generateIntroduction, getNextPoster } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';
import { Post, Scenario } from '@/utils/types/scenario';
import { User } from '@/utils/types/user';

import { LayoutAsideSection, LayoutMainSection } from '../../../components/Layout';

type EnCoursWithIdProps = {
  id: string;
  title: string;
  posts: Post[];
  introduction: string;
  nextPoster: Character;
  nextPostIsGameMaster: boolean;
  characters: Record<string, Character>;
  supplies: number;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<EnCoursWithIdProps>> {
  const id = context.query.id as string;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const [scenarioId] = id.split('-');
  const scenario = await httpBffClient.get<Scenario>(`/scenario/${scenarioId}`);

  if (isHttpError(scenario)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
      title: scenario.title,
      introduction: generateIntroduction(scenario),
      nextPoster: getNextPoster(
        scenario.characters,
        scenario.posts[scenario.posts.length - 1]?.character,
      ),
      nextPostIsGameMaster: checkIfGameMaster(scenario.posts, scenario.characters.length),
      posts: scenario.posts,
      // @TODO: add a mapper in the API to return this directly?
      supplies: scenario.supplies,
      characters: mapScenarioCharacters(scenario.characters),
    },
  };
}

function mapScenarioCharacters(scenarioCharacters: Character[]) {
  return scenarioCharacters.reduce((acc, character) => {
    acc[character.id] = character;
    return acc;
  }, {} as Record<string, Character>);
}

let socket: Socket;

export default function EnCoursWithId({
  id,
  title,
  posts,
  introduction,
  nextPoster,
  nextPostIsGameMaster,
  characters: initalCharacters,
  supplies: initalSupplies,
}: EnCoursWithIdProps) {
  const [currentUser] = useLocalStorage<User>('currentUser');
  const [characters, setCharacters] = useState<Record<string, Character>>(initalCharacters);
  const [supplies, setSupplies] = useState<number>(initalSupplies);

  const socketInitializer = async () => {
    await httpBffClient.get('/socket');

    socket = io();
    socket.on('receive-new-move', async () => {
      const scenario = await httpBffClient.get<Scenario>(`/scenario/${id}`);

      if (isHttpError(scenario)) {
        throw new Error(
          `There was an error while fetching the scenario ${id}: ${scenario.message}`,
        );
      }

      setSupplies(scenario.supplies);
      setCharacters(mapScenarioCharacters(scenario.characters));
    });
  };

  useEffect(() => {
    if (!socket) {
      socketInitializer();
    } else if (socket.disconnected) {
      socket.connect();
    }

    return () => {
      console.log('Unmounting page');
      if (socket && socket.connected) {
        console.log('Disconnecting socket');
        socket.disconnect();
      }
    };
  }, []);

  return (
    <>
      <LayoutMainSection
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Scénarios en cours', href: '/scenarios/en-cours' },
          { label: title, href: '#' },
        ]}
      >
        <CharacterList characters={Object.values(characters)} />
        <ScenarioResources supplies={supplies} />
      </LayoutMainSection>
      <LayoutAsideSection breadcrumb={[]}>
        <DialogThread
          currentUser={currentUser}
          characters={characters}
          initialDialogs={posts}
          introductionText={introduction}
          nextPoster={nextPoster}
          nextPostIsGameMaster={nextPostIsGameMaster}
        />
      </LayoutAsideSection>
    </>
  );
}
