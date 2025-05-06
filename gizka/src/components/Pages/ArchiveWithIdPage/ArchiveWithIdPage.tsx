'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';

import { CharacterList } from '@/components/CharacterList';
import { DialogThread } from '@/components/Dialog/DialogThread';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { ScenarioResources } from '@/components/ScenarioResources';
import DownArrowIcon from '@/public/images/icons/down_arrow.svg';
import { useLocalStorage } from '@/utils/hooks/localStorage';
import { Character } from '@/utils/types/character';
import { Post } from '@/utils/types/scenario';
import { User } from '@/utils/types/user';

import * as Styled from './styled';

type ArchiveWithIdPageProps = {
  id: string;
  title: string;
  posts: Post[];
  introduction: string;
  nextPoster: Character;
  characters: Record<string, Character>;
  supplies: number;
};

enum Tab {
  Status = 'status',
  Reading = 'reading',
}

export function ArchiveWithIdPage({
  title,
  introduction,
  posts: initialDialogs,
  characters: initalCharacters,
  supplies: initalSupplies,
}: ArchiveWithIdPageProps) {
  const t = useTranslations('scenarios');
  const threadRef = useRef<HTMLDivElement>(null);
  const [currentUser] = useLocalStorage<User>('currentUser');
  const [openTabId, setOpenTabId] = useState<Tab>(Tab.Status);
  const [characters] = useState<Record<string, Character>>(initalCharacters);
  const [supplies] = useState<number>(initalSupplies);
  const [dialogs] = useState<Post[]>(initialDialogs);

  const displayMainSection = openTabId !== Tab.Reading;

  const scrollToBottom = () => {
    if (threadRef.current) threadRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const tabs = useMemo(() => {
    return [
      {
        label: t('archives.tabs.status'),
        id: Tab.Status,
        isOpen: openTabId === Tab.Status,
        isDisabled: false,
      },
      {
        label: t('archives.tabs.read'),
        id: Tab.Reading,
        isOpen: openTabId === Tab.Reading,
        isDisabled: false,
      },
    ];
  }, [openTabId, t]);

  return (
    <>
      {displayMainSection && (
        <LayoutMainSection
          breadcrumb={[
            { label: t('archives.breadcrumb.home'), href: '/' },
            { label: t('archives.breadcrumb.current'), href: '/scenarios/archives' },
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
        </LayoutMainSection>
      )}
      <LayoutAsideSection
        stickyFooter={
          <Styled.Footer>
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
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          handlePostEdit={() => {}}
          isEditAllowed={false}
          ref={threadRef}
        />
      </LayoutAsideSection>
    </>
  );
}
