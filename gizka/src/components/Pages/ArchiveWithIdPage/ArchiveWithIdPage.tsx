'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';

import { CharacterList } from '@/components/CharacterList';
import { DialogThread } from '@/components/Dialog/DialogThread';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { Notes } from '@/components/Notes';
import { ScenarioResources } from '@/components/ScenarioResources';
import DownArrowIcon from '@/public/images/icons/down_arrow.svg';
import FullWidthToggleOffIcon from '@/public/images/icons/full_width_toggle_off.svg';
import FullWidthToggleOnIcon from '@/public/images/icons/full_width_toggle_on.svg';
import { useLocalStorage } from '@/utils/hooks/localStorage';
import { Character } from '@/utils/types/character';
import { Note, Post } from '@/utils/types/scenario';
import { User } from '@/utils/types/user';

import * as Styled from './styled';

type ArchiveWithIdPageProps = {
  id: string;
  title: string;
  posts: Post[];
  notes: Note[];
  introduction: string;
  era: string;
  location: string;
  nextPoster: Character;
  characters: Record<string, Character>;
  supplies: number;
};

enum Tab {
  Status = 'status',
  Notes = 'notes',
}

export function ArchiveWithIdPage({
  id,
  title,
  introduction,
  era,
  location,
  posts: initialDialogs,
  notes,
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
  const [isDialogFullWidth, setIsDialogFullWidth] = useState(false);

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
        label: `${t('en-cours.tabs.notes')} (${notes.length})`,
        id: Tab.Notes,
        isOpen: openTabId === Tab.Notes,
        isDisabled: false,
      },
    ];
  }, [notes.length, openTabId, t]);

  const breadcrumb = useMemo(() => {
    return [
      { label: t('archives.breadcrumb.home'), href: '/' },
      { label: t('archives.breadcrumb.current'), href: '/scenarios/archives' },
      { label: title, href: '#' },
    ];
  }, [t, title]);

  const onToggleDialogFullWidth = () => {
    setIsDialogFullWidth(!isDialogFullWidth);
  };

  const isLayoutMainSectionVisible = useMemo(() => {
    return !isDialogFullWidth;
  }, [isDialogFullWidth]);

  const scenarioId = parseInt(id.split('-')[0]);

  return (
    <>
      {isLayoutMainSectionVisible && (
        <LayoutMainSection
          breadcrumb={breadcrumb}
          tabs={tabs}
          onTabChange={(tab: Tab) => setOpenTabId(tab)}
        >
          {openTabId === Tab.Status && (
            <>
              <CharacterList characters={Object.values(characters)} />
              <ScenarioResources supplies={supplies} />
            </>
          )}
          {openTabId === Tab.Notes && (
            <Notes notes={notes} scenarioId={scenarioId} era={era} location={location} />
          )}
        </LayoutMainSection>
      )}

      <LayoutAsideSection
        stickyFooter={
          <Styled.Footer isDisabled>
            <Styled.SmallTextarea isDisabled></Styled.SmallTextarea>

            <Styled.ButtonsWrapper>
              <Styled.FullWidthButton onClick={onToggleDialogFullWidth}>
                {isDialogFullWidth ? <FullWidthToggleOffIcon /> : <FullWidthToggleOnIcon />}
              </Styled.FullWidthButton>

              <Styled.ArrowButton onClick={scrollToBottom}>
                <DownArrowIcon />
              </Styled.ArrowButton>
            </Styled.ButtonsWrapper>
          </Styled.Footer>
        }
        breadcrumb={isDialogFullWidth ? breadcrumb : []}
        isFullWidth={isDialogFullWidth}
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
