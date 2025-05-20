'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useContext, useMemo, useState } from 'react';

import { CharacterEditor } from '@/components/CharacterEditor';
import { Button } from '@/components/DesignSystem/Button';
import { Keyword } from '@/components/DesignSystem/Keyword';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import { DialogThread } from '@/components/Dialog/DialogThread';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { LoginOrRegister } from '@/components/LoginOrRegister';
import { Moves } from '@/components/Moves';
import { MoveOutcome } from '@/components/Moves/MoveOutcome';
import { UserContext } from '@/contexts/user';
import { getSafeName } from '@/utils/character/helpers';
import { TextColor } from '@/utils/constants';
import { Character } from '@/utils/types/character';
import { MoveResult, Moves as MoveId, Post } from '@/utils/types/scenario';

import * as Styled from './styled';
import { generateRandomMoveOutcome, MoveOutcome as MoveOutcomeType, rand } from './utils';

type CommentJouerPageProps = {
  introduction?: string;
  posts?: Post[];
  characters?: Record<string, Character>;
};

type Move = {
  id: MoveId;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any;
};

enum Tab {
  ToBegin = 'to-begin',
  Dices = 'dices',
}

export function CommentJouerPage(props: CommentJouerPageProps) {
  const { introduction, posts, characters } = props;

  const t = useTranslations('common');

  const { currentUser } = useContext(UserContext);
  const [openTabId, setOpenTabId] = useState<Tab>(Tab.ToBegin);

  const [character, setCharacter] = useState<Character | null>(null);
  const [currentModule, setCurrentModule] = useState<
    'characterEditor' | 'rolePlayExample' | 'dices' | null
  >(null);

  const [currentMove, setCurrentMove] = useState<Move | null>(null);
  const [moveOutcome, setMoveOutcome] = useState<MoveOutcomeType | null>(null);

  const breadcrumb = useMemo(() => {
    return [
      { label: t('howToPlay.breadcrumb.home'), href: '/' },
      { label: t('howToPlay.breadcrumb.current'), href: '#' },
    ];
  }, [t]);

  const tabs = useMemo(() => {
    return [
      {
        label: t('howToPlay.tabs.toBegin'),
        id: Tab.ToBegin,
        isOpen: openTabId === Tab.ToBegin,
        isDisabled: false,
      },
      {
        label: t('howToPlay.tabs.dices'),
        id: Tab.Dices,
        isOpen: openTabId === Tab.Dices,
        isDisabled: false,
      },
    ];
  }, [t, openTabId]);

  const onCharacterSaved = (character: Character) => {
    setCharacter(character);
    setCurrentModule(null);
  };

  const toggleCharacterEditor = () => {
    setCurrentModule((prev) => (prev === 'characterEditor' ? null : 'characterEditor'));
  };

  const toggleRolePlayExample = () => {
    setCurrentModule((prev) => (prev === 'rolePlayExample' ? null : 'rolePlayExample'));
  };

  const simulateDiceRoll = () => {
    if (!currentMove || !currentMove.meta) return;

    setCurrentModule('dices');
    setMoveOutcome(generateRandomMoveOutcome(currentMove));
  };

  const onMovePicked = (move: Move | null) => {
    setCurrentModule(null);
    setCurrentMove(move);
  };

  return (
    <>
      <LayoutMainSection
        breadcrumb={breadcrumb}
        tabs={tabs}
        onTabChange={(tab: Tab) => {
          setOpenTabId(tab);
          setCurrentModule(null);
        }}
      >
        <Styled.Container>
          {openTabId === Tab.ToBegin && (
            <>
              <Row space="1" direction="column">
                <Text as="h1" size="xl" color={TextColor.FlashyAlt}>
                  {t('howToPlay.toBegin.title')}
                </Text>
                <Text as="p">{t('howToPlay.toBegin.intro')}</Text>
              </Row>

              <Row space="1" direction="column">
                <Text
                  as="h2"
                  size="lg"
                  id={t('howToPlay.toBegin.sections.first.id')}
                  color={TextColor.FlashyAlt}
                >
                  {t('howToPlay.toBegin.sections.first.title')}
                </Text>
                <Text as="p">{t('howToPlay.toBegin.sections.first.content')}</Text>
              </Row>

              <Row space="1" align="start">
                <Button outline variant="small" onClick={toggleCharacterEditor}>
                  {t(
                    `howToPlay.toBegin.sections.first.${
                      currentModule === 'characterEditor' ? 'close' : 'open'
                    }Editor`,
                  )}
                </Button>
              </Row>

              <Row space="1" direction="column">
                <Text
                  as="h2"
                  size="lg"
                  id={t('howToPlay.toBegin.sections.second.id')}
                  color={TextColor.FlashyAlt}
                >
                  {t('howToPlay.toBegin.sections.second.title')}
                </Text>
                <Text as="p">{t('howToPlay.toBegin.sections.second.content')}</Text>
              </Row>

              <Row space="1" gap="1" align="center" justify="start">
                <Button outline variant="small" href="/scenarios/en-attente" target="_blank">
                  {t(`howToPlay.toBegin.sections.second.joinScenario`)}
                </Button>
                ou
                <Button outline variant="small" href="/scenarios" target="_blank">
                  {t(`howToPlay.toBegin.sections.second.createScenario`)}
                </Button>
              </Row>

              <Row space="1" direction="column">
                <Text
                  as="h2"
                  size="lg"
                  id={t('howToPlay.toBegin.sections.third.id')}
                  color={TextColor.FlashyAlt}
                >
                  {t('howToPlay.toBegin.sections.third.title')}
                </Text>
                <Text as="p">{t('howToPlay.toBegin.sections.third.content')}</Text>
              </Row>

              {introduction && posts && characters && (
                <Row space="1" align="start">
                  <Button outline variant="small" onClick={toggleRolePlayExample}>
                    {t(
                      `howToPlay.toBegin.example.${
                        currentModule === 'rolePlayExample' ? 'close' : 'open'
                      }Example`,
                    )}
                  </Button>
                </Row>
              )}
            </>
          )}

          {openTabId === Tab.Dices && (
            <>
              <Row space="1" direction="column">
                <Text as="h1" size="xl" color={TextColor.FlashyAlt}>
                  {t('howToPlay.dices.title')}
                </Text>
                <Text as="p">{t('howToPlay.dices.intro')}</Text>
              </Row>

              <Row space="1" direction="column">
                <Text
                  as="h2"
                  size="lg"
                  id={t('howToPlay.dices.sections.first.id')}
                  color={TextColor.FlashyAlt}
                >
                  {t('howToPlay.dices.sections.first.title')}
                </Text>
                <Text as="p">{t('howToPlay.dices.sections.first.content')}</Text>

                {characters && (
                  <Moves
                    onMovePicked={onMovePicked}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onBurnCheck={() => {}}
                    character={Object.values(characters)[0]}
                    characters={Object.values(characters)}
                    allowBurnCheck={false}
                  />
                )}
              </Row>

              <Row space="1" align="start">
                <Button
                  outline
                  variant="small"
                  onClick={simulateDiceRoll}
                  disabled={!currentMove || !currentMove?.meta?.isValid}
                >
                  {t(`howToPlay.dices.sections.first.roll`)}
                </Button>
              </Row>
            </>
          )}
        </Styled.Container>
      </LayoutMainSection>

      <LayoutAsideSection>
        {currentModule === 'characterEditor' &&
          (currentUser ? (
            <CharacterEditor onCharacterSaved={onCharacterSaved} />
          ) : (
            <>
              <Text as="p" textAlign="center">
                {t(`howToPlay.toBegin.mustBeLogged`)}
              </Text>
              <LoginOrRegister defaultActiveForm="register" />
            </>
          ))}

        {currentModule === 'rolePlayExample' && introduction && posts && characters && (
          <DialogThread
            currentUserId={null}
            characters={characters}
            dialogs={posts}
            introductionText={introduction}
            isEditAllowed={false}
          />
        )}

        {currentModule === 'dices' && characters && currentMove && (
          <>
            <Row gap="1" direction="column">
              <MoveOutcome
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                move={{
                  ...moveOutcome,
                  meta: JSON.stringify({ ...currentMove.meta }),
                }}
                character={Object.values(characters)[0]}
              />

              {moveOutcome && moveOutcome.moveResult === MoveResult.FAILURE && (
                <MoveOutcome
                  move={{
                    moveId: MoveId.PAYER_LE_PRIX,
                    // @ts-expect-error PayThePrice is a special move with only one dice
                    dices: [{ value: rand(1, 100) }],
                    moveResult: MoveResult.FAILURE,
                  }}
                  character={Object.values(characters)[0]}
                />
              )}
            </Row>

            <Row space="1" align="start">
              <ul>
                <li>
                  <Text size="md">
                    1. Le <Keyword stat="move">résultat</Keyword> correspond à votre jet de dés (1 à
                    6) + l&apos;attribut utilisé.
                  </Text>
                </li>
                <li>
                  <Text size="md">
                    2. Les <Keyword stat="move">dés de défi</Keyword> correspondent à la difficulté
                    de l&apos;action (1 à 8).
                  </Text>
                </li>
                <li>
                  <Text size="md">
                    3. Vous faites un <Keyword stat="success">succès</Keyword> si le résultat est
                    supérieur aux deux dés de défi, un <Keyword stat="mixed">succès mitigé</Keyword>{' '}
                    s&apos;il est supérieur à un seul des deux, et sinon, un{' '}
                    <Keyword stat="failure">échec</Keyword>.
                  </Text>
                </li>
              </ul>
            </Row>

            <Row space="1" align="start">
              <Text size="md" as="p">
                Les jets de dés sont là pour pimenter le jeu. Servez-vous en quand vous voulez
                mettre un peu de suspense dans vos aventures, et n&apos;oubliez pas que même les
                échecs sont amusants lorsqu&apos; ils apportent des conséquences narratives
                intéressantes !
              </Text>
            </Row>
          </>
        )}

        {!currentModule && character && (
          <Row space="1" direction="column">
            <Text as="h3" size="md" color={TextColor.FlashyAlt}>
              {t('howToPlay.toBegin.sections.first.congratulations')} {character.firstName}{' '}
              {character.lastName}.
            </Text>
            <Text as="p" size="sm">
              {t('howToPlay.toBegin.sections.first.retrieveCharacter')}{' '}
              <Link
                href={`/mes-personnages/${character.id}-${getSafeName(character)}`}
                target={'_blank'}
              >
                {t('howToPlay.toBegin.sections.first.myCharacters')}
              </Link>
              .
            </Text>
            <Text as="p" size="sm">
              {t('howToPlay.toBegin.sections.first.goodLuck')}
            </Text>
          </Row>
        )}
      </LayoutAsideSection>
    </>
  );
}
