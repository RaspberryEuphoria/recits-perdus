import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useState } from 'react';

import { CharacterList } from '@/components/CharacterList';
import { DialogThread } from '@/components/Dialog/DialogThread';
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
      characters: scenario.characters.reduce((acc, character) => {
        acc[character.id] = character;
        return acc;
      }, {} as Record<string, Character>),
    },
  };
}

export default function EnCoursWithId({
  title,
  posts,
  introduction,
  nextPoster,
  nextPostIsGameMaster,
  characters,
}: EnCoursWithIdProps) {
  const [currentUser] = useLocalStorage<User>('currentUser');
  const [lastPost] = posts.slice(-1);
  const lastPoster = lastPost ? lastPost.character : null;
  const [highlightedCharacter, setHighlightedCharacter] = useState<Character | null>(lastPoster);

  const updateHighlightedCharacter = (character: Character | null) => {
    setHighlightedCharacter(character || lastPoster);
  };

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
      </LayoutMainSection>
      <LayoutAsideSection breadcrumb={[]}>
        <DialogThread
          updateHighlightedCharacter={updateHighlightedCharacter}
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
