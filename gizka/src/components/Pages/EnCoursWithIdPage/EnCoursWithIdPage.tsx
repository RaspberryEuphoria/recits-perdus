'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { CharacterList } from '@/components/CharacterList';
import { DialogTextarea } from '@/components/Dialog/DialogTextarea';
import { Move } from '@/components/Dialog/DialogTextarea/DialogTextarea';
import { DialogThread } from '@/components/Dialog/DialogThread';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { Moves } from '@/components/Moves';
import { ScenarioResources } from '@/components/ScenarioResources';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { useLocalStorage } from '@/utils/hooks/localStorage';
import { Character } from '@/utils/types/character';
import { Post, Scenario } from '@/utils/types/scenario';
import { User } from '@/utils/types/user';

type EnCoursWithIdPageProps = {
  id: string;
  title: string;
  posts: Post[];
  introduction: string;
  nextPoster: Character;
  characters: Record<string, Character>;
  supplies: number;
};

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

export function EnCoursWithIdPage({
  id,
  title,
  introduction,
  posts: initialDialogs,
  nextPoster: initialNextPoster,
  characters: initalCharacters,
  supplies: initalSupplies,
}: EnCoursWithIdPageProps) {
  const t = useTranslations('scenarios');
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
      transports: ['polling'],
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
      <LayoutMainSection
        breadcrumb={[
          { label: t('en-cours.breadcrumb.home'), href: '/' },
          { label: t('en-cours.breadcrumb.current'), href: '/scenarios/en-cours' },
          { label: title, href: '#' },
        ]}
        tabs={[
          {
            label: t('en-cours.tabs.status'),
            id: Tab.Status,
            isOpen: openTabId === Tab.Status,
            isDisabled: false,
          },
          {
            label: t('en-cours.tabs.play'),
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
        {currentUser && openTabId === Tab.Posting && isItMyTurn && (
          <DialogTextarea
            scenarioId={id}
            nextPoster={nextPoster}
            content={content}
            onContentChange={handleContentChange}
            onTextareaSubmit={handleTextareaSubmit}
            renderMoves={(
              onMovePicked: (move: Move | null) => void,
              onBurnCheck: (hasMomentumBurn: boolean) => void,
            ) => (
              <Moves
                onMovePicked={onMovePicked}
                onBurnCheck={onBurnCheck}
                character={nextPoster}
                characters={Object.values(characters)}
              />
            )}
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
