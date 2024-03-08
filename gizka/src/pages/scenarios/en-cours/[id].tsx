import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { CharacterList } from '@/components/CharacterList';
import { DialogTextarea } from '@/components/Dialog/DialogTextarea';
import { DialogThread } from '@/components/Dialog/DialogThread';
import { ScenarioResources } from '@/components/ScenarioResources';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { useLocalStorage } from '@/utils/hooks/localStorage';
import { generateIntroduction, getNextPoster } from '@/utils/scenario/helpers';
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
      posts: scenario.posts,
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

enum Tab {
  Status = 'status',
  Posting = 'posting',
}

let socket: Socket;

export default function EnCoursWithId({
  id,
  title,
  introduction,
  posts: initialDialogs,
  nextPoster: initialNextPoster,
  characters: initalCharacters,
  supplies: initalSupplies,
}: EnCoursWithIdProps) {
  const [currentUser] = useLocalStorage<User>('currentUser');

  const [openTabId, setOpenTabId] = useState<Tab>(Tab.Status);
  const [characters, setCharacters] = useState<Record<string, Character>>(initalCharacters);
  const [nextPoster, setNextPoster] = useState<Character>(initialNextPoster);
  const [supplies, setSupplies] = useState<number>(initalSupplies);
  const [dialogs, setDialogs] = useState<Post[]>(initialDialogs);
  const [content, setContent] = useState<string>('');

  const isItMyTurn = currentUser ? currentUser.id === nextPoster.userId : false;

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleOpenTextarea = () => {
    if (isItMyTurn) setOpenTabId(Tab.Posting);
  };

  const handleTextareaSubmit = () => {
    setContent('');
    setOpenTabId(Tab.Status);
  };

  const socketInitializer = async () => {
    await httpBffClient.get('/socket');

    socket = io(`${process.env.NEXT_PUBLIC_BFF_PREFIX_URL}`, {
      path: '/api/socket',
    });

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

    socket.on('receive-new-dialog', async (newDialog) => {
      setDialogs((dialogs) => [...dialogs, newDialog]);

      if (newDialog.nextPoster) setNextPoster(newDialog.nextPoster);
      if (newDialog.move) socket.emit('post-new-move');

      socket.off('receive-new-dialog');
    });
  };

  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title} - Les Récits Perdus</title>
        <meta
          name="description"
          content={`
          Star Wars - Les Récits perdus : ${title}.
          ${introduction}
        `}
        />
      </Head>
      <LayoutMainSection
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Scénarios en cours', href: '/scenarios/en-cours' },
          { label: title, href: '#' },
        ]}
        tabs={[
          { label: 'Statut', id: Tab.Status, isOpen: openTabId === Tab.Status, isDisabled: false },
          {
            label: 'Jouer',
            id: Tab.Posting,
            isOpen: openTabId === Tab.Posting,
            isDisabled: !isItMyTurn,
          },
        ]}
        onTabChange={(tab: Tab) => setOpenTabId(tab)}
      >
        {openTabId === Tab.Status && (
          <CharacterList characters={Object.values(characters)}>
            <ScenarioResources supplies={supplies} />
          </CharacterList>
        )}
        {currentUser && openTabId === 'posting' && isItMyTurn && (
          <DialogTextarea
            nextPoster={nextPoster}
            content={content}
            onContentChange={handleContentChange}
            onTextareaSubmit={handleTextareaSubmit}
          />
        )}
      </LayoutMainSection>
      <LayoutAsideSection>
        <DialogThread
          characters={characters}
          dialogs={dialogs}
          introductionText={introduction}
          nextPoster={nextPoster}
          isItMyTurn={isItMyTurn}
          openTextarea={handleOpenTextarea}
        />
      </LayoutAsideSection>
    </>
  );
}
