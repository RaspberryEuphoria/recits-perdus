'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useContext, useMemo, useState } from 'react';

import { CharacterEditor } from '@/components/CharacterEditor';
import { CharacterList } from '@/components/CharacterList';
import { Button } from '@/components/DesignSystem/Button';
import { Form } from '@/components/DesignSystem/Form';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import { DialogPost } from '@/components/Dialog/DialogPost';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { UserContext } from '@/contexts/user';
import { useCharactersByUser } from '@/hooks/useCharacters';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { isCharacterAvailable } from '@/utils/character/helpers';
import { colorOptions } from '@/utils/constants';
import { Character } from '@/utils/types/character';

import * as Styled from './styled';

type EnAttenteWithIdPageProps = {
  id: string;
  authorId: number;
  title: string;
  safeTitle: string;
  introduction: string;
  characters: Record<string, Character>;
};

export function EnAttenteWithIdPage({
  id,
  authorId,
  title,
  safeTitle,
  introduction,
  characters,
}: // characters: initalCharacters,
EnAttenteWithIdPageProps) {
  const t = useTranslations('scenarios');
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const { characters: myCharacters, refresh } = useCharactersByUser(currentUser?.id);
  const [isLoading, setIsLoading] = useState(false);
  // const [characters, setCharacters] = useState<Record<string, Character>>(initalCharacters);
  const [showCharacterEditor, setShowCharacterEditor] = useState(false);

  const isAuthor = useMemo(() => {
    if (!currentUser) return false;
    return currentUser.id === authorId;
  }, [authorId, currentUser]);

  const isRegistered = useMemo(() => {
    if (!currentUser) return false;
    return Object.values(characters).find((character) => character.userId === currentUser.id);
  }, [characters, currentUser]);

  const isAuthorOrParticipantTranslationKey = isAuthor
    ? 'author'
    : isRegistered
    ? 'registered'
    : 'not-registered';

  const myCharactersAsOptions = useMemo(() => {
    return myCharacters.filter(isCharacterAvailable).map((character) => ({
      value: character.id,
      label: `${character.firstName} ${character.lastName}`,
    }));
  }, [myCharacters]);

  const allowedColorOptions = useMemo(() => {
    return colorOptions.filter(
      (color) =>
        !Object.values(characters).find((character) => character.textColor === color.value),
    );
  }, [characters]);

  const inputs = useMemo(() => {
    return [
      {
        name: 'characterId',
        label: t('creer.form.labels.character'),
        type: 'select' as const,
        options: myCharactersAsOptions,
        mandatory: true,
      },
      {
        name: 'textColor',
        label: t('creer.form.labels.text-color'),
        type: 'color-picker' as const,
        options: allowedColorOptions,
        mandatory: true,
      },
    ];
  }, [allowedColorOptions, myCharactersAsOptions, t]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const characterId = e.currentTarget.characterId.value;
    const textColor = e.currentTarget.textColor.value;
    if (!characterId || !textColor) return;

    setIsLoading(true);

    const res = await httpBffClient.post(`/scenario/${id}/character`, { characterId, textColor });

    if (isHttpError(res)) {
      console.error(`There was an error while trying to register a character: ${res.message}`);
    } else {
      router.refresh();
    }

    setIsLoading(false);
  };

  const startScenario = async () => {
    if (!isAuthor) return;

    await httpBffClient.post(`/scenario/${id}/start`, {});
    router.push(`/scenarios/en-cours/${id}-${safeTitle}`);
  };

  const onCharacterSaved = () => {
    refresh();
    setShowCharacterEditor(false);
  };

  return (
    <>
      <LayoutMainSection
        breadcrumb={[
          { label: t('en-attente.breadcrumb.home'), href: '/' },
          { label: t('en-attente.breadcrumb.current'), href: '/scenarios/en-attente' },
          { label: title, href: '#' },
        ]}
      >
        <CharacterList characters={Object.values(characters)} />
      </LayoutMainSection>
      <LayoutAsideSection>
        <Styled.Introduction>
          <Styled.Block>
            <Row justify="center">
              <Text as="h1">{t(`en-attente.${isAuthorOrParticipantTranslationKey}.title`)}</Text>
            </Row>

            <Row space="1">
              <Text as="p">
                {t.rich(`en-attente.${isAuthorOrParticipantTranslationKey}.help`, {
                  discord: (chunks) => (
                    <Link href={`${process.env.NEXT_PUBLIC_DISCORD_LINK}`} target={'_blank'}>
                      {chunks}
                    </Link>
                  ),
                })}
              </Text>
            </Row>

            {isAuthor && (
              <Row justify="start">
                <Button disabled={!isAuthor} onClick={startScenario}>
                  {t(`en-attente.author.start`)}
                </Button>
              </Row>
            )}

            {!isAuthor && !isRegistered && (
              <>
                {myCharactersAsOptions.length > 0 && (
                  <>
                    <Row justify="start">
                      <Styled.FormContainer>
                        <Form
                          onSubmit={submitForm}
                          inputs={inputs}
                          submitButton={
                            <Row justify="center" style={{ width: '100%' }}>
                              <Button isLoading={isLoading} disabled={isLoading} width="100%">
                                {t(`en-attente.form.register`)}
                              </Button>
                            </Row>
                          }
                        />
                      </Styled.FormContainer>
                    </Row>
                    <Row>
                      <Styled.Separator>{t(`en-attente.or`)}</Styled.Separator>
                    </Row>
                  </>
                )}

                {!showCharacterEditor && (
                  <Row>
                    <Styled.FormContainer>
                      <Button outline onClick={() => setShowCharacterEditor(true)} width="100%">
                        {t(`en-attente.not-registered.new-character`)}
                      </Button>
                    </Styled.FormContainer>
                  </Row>
                )}

                {showCharacterEditor && (
                  <>
                    <Row justify="end">
                      <Button variant="small" outline onClick={() => setShowCharacterEditor(false)}>
                        {t(`en-attente.not-registered.new-character-back`)}
                      </Button>
                    </Row>
                    <CharacterEditor onCharacterSaved={onCharacterSaved} />
                  </>
                )}
              </>
            )}
          </Styled.Block>
          <DialogPost id={0} content={introduction} characters={characters} isEditable={false} />
        </Styled.Introduction>
      </LayoutAsideSection>
    </>
  );
}
