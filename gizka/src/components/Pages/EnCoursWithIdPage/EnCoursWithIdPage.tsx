'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { CharacterList } from '@/components/CharacterList';
import { DialogTextarea } from '@/components/Dialog/DialogTextarea';
import { Move } from '@/components/Dialog/DialogTextarea/DialogTextarea';
import { DialogThread } from '@/components/Dialog/DialogThread';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { Moves } from '@/components/Moves';
import { ScenarioResources } from '@/components/ScenarioResources';
import DownArrowIcon from '@/public/images/icons/down_arrow.svg';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { useLocalStorage } from '@/utils/hooks/localStorage';
import { Character } from '@/utils/types/character';
import { Post, Scenario } from '@/utils/types/scenario';
import { User } from '@/utils/types/user';

import * as Styled from './styled';

const MAX_LENGTH = 1000;

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
  Reading = 'reading',
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
  const threadRef = useRef<HTMLDivElement>(null);
  const [currentUser] = useLocalStorage<User>('currentUser');
  const [openTabId, setOpenTabId] = useState<Tab>(Tab.Status);
  const [characters, setCharacters] = useState<Record<string, Character>>(initalCharacters);
  const [nextPoster, setNextPoster] = useState<Character>(initialNextPoster);
  const [supplies, setSupplies] = useState<number>(initalSupplies);
  const [dialogs, setDialogs] = useState<Post[]>(initialDialogs);
  const [content, setContent] = useState<string>('');
  const [postId, setPostId] = useState<number | null>(null);

  const isItMyTurn = currentUser ? currentUser.id === nextPoster.userId : false;
  const isEditAllowed = openTabId === Tab.Status;
  const showTextarea = currentUser && openTabId === Tab.Posting && (isItMyTurn || postId);
  const maxPostLength = useMemo(() => {
    const lastPost = dialogs.findLast(
      (dialog) => dialog.character.userId === currentUser?.id && dialog.id !== postId,
    );
    if (!lastPost) return MAX_LENGTH;

    return Math.max(MAX_LENGTH, MAX_LENGTH + (MAX_LENGTH - lastPost.content.length));
  }, [dialogs, currentUser?.id, postId]);

  const displayMainSection = openTabId !== Tab.Reading;

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleOpenTextarea = () => {
    if (isItMyTurn) setOpenTabId(Tab.Posting);
  };

  const handlePostEdit = ({ id, content }: { id: number; content: string }) => {
    setPostId(id);
    setContent(content);
    setOpenTabId(Tab.Posting);
  };

  const handleTextareaSubmit = () => {
    setContent('');
    setPostId(null);
    setOpenTabId(Tab.Status);
  };

  const placeholder = isItMyTurn
    ? "C'est à vous de jouer"
    : `C'est au tour de ${nextPoster.firstName} ${nextPoster.lastName}`;

  const scrollToBottom = () => {
    if (threadRef.current) threadRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const socketInitializer = async () => {
    await httpBffClient.get('/init-socket');

    socket = io(`${process.env.NEXT_PUBLIC_BFF_PREFIX_URL}`, {
      path: '/api/socket',
      transports: ['polling'],
      withCredentials: true,
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
      const [scenarioId] = id.split('-');
      if (scenarioId != newDialog.scenarioId) return;

      setDialogs((dialogs) => [...dialogs, newDialog]);

      if (newDialog.nextPoster) setNextPoster(newDialog.nextPoster);
      if (newDialog.move) socket.emit('post-new-move');

      socket.off('receive-new-dialog');
    });

    socket.on('receive-edited-dialog', async (updatedDialog) => {
      const [scenarioId] = id.split('-');
      if (scenarioId != updatedDialog.scenarioId) return;

      setDialogs((dialogs) => {
        const index = dialogs.findIndex((dialog) => dialog.id === updatedDialog.id);
        if (index === -1) return dialogs;

        const newDialogs = [...dialogs];
        newDialogs[index] = updatedDialog;

        return newDialogs;
      });

      if (updatedDialog.nextPoster) setNextPoster(updatedDialog.nextPoster);

      socket.off('receive-edited-dialog');
    });
  };

  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const tabs = useMemo(() => {
    return [
      {
        label: t('en-cours.tabs.status'),
        id: Tab.Status,
        isOpen: openTabId === Tab.Status,
        isDisabled: false,
      },
      {
        label: t('en-cours.tabs.read'),
        id: Tab.Reading,
        isOpen: openTabId === Tab.Reading,
        isDisabled: false,
      },
      {
        label: t('en-cours.tabs.play'),
        id: Tab.Posting,
        isOpen: openTabId === Tab.Posting,
        isDisabled: !isItMyTurn,
      },
    ];
  }, [isItMyTurn, openTabId, t]);

  return (
    <>
      {displayMainSection && (
        <LayoutMainSection
          breadcrumb={[
            { label: t('en-cours.breadcrumb.home'), href: '/' },
            { label: t('en-cours.breadcrumb.current'), href: '/scenarios/en-cours' },
            { label: title, href: '#' },
          ]}
          tabs={tabs}
          onTabChange={(tab: Tab) => setOpenTabId(tab)}
        >
          {openTabId === Tab.Status && (
            <CharacterList characters={Object.values(characters)}>
              <ScenarioResources supplies={supplies} />
            </CharacterList>
          )}
          {showTextarea && (
            <DialogTextarea
              scenarioId={id}
              maxLength={maxPostLength}
              nextPoster={nextPoster}
              content={content}
              onContentChange={handleContentChange}
              onTextareaSubmit={handleTextareaSubmit}
              postId={postId}
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
      )}
      <LayoutAsideSection
        stickyFooter={
          <Styled.Footer>
            <Styled.SmallTextarea onClick={handleOpenTextarea} isDisabled={!isItMyTurn}>
              {placeholder}
            </Styled.SmallTextarea>
            <Styled.ArrowButton onClick={scrollToBottom}>
              <DownArrowIcon />
            </Styled.ArrowButton>
          </Styled.Footer>
        }
        onTabChange={(tab: Tab) => setOpenTabId(tab)}
        fullwidth={openTabId === Tab.Reading}
        tabs={openTabId === Tab.Reading ? tabs : []}
      >
        <DialogThread
          currentUserId={currentUser?.id || null}
          characters={characters}
          dialogs={dialogs}
          introductionText={introduction}
          handlePostEdit={handlePostEdit}
          isEditAllowed={isEditAllowed}
          ref={threadRef}
        />
      </LayoutAsideSection>
    </>
  );
}
