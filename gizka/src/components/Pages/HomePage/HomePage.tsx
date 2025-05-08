'use client';

import Link from 'next/link';
import { useState } from 'react';

import { NavBar } from '@/components/DesignSystem/NavBar';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { LoginOrRegister } from '@/components/LoginOrRegister';
import DefaultAvatarSrc from '@/public/images/default_avatar.png';
import CharacterIcon from '@/public/images/icons/character.svg';
import D6Icon from '@/public/images/icons/d6.svg';
import DiscordLogo from '@/public/images/icons/discord_logo.svg';
import PencilIcon from '@/public/images/icons/pencil.svg';
import { getFullName } from '@/utils/character/helpers';
import { timeSince } from '@/utils/dates/helpers';

import * as Styled from './styled';

type HomePageProps = {
  userCount: number;
  characterCount: number;
  scenarioCount: number;
  postCount: number;
  diceCount: number;
  lastPost: {
    id: number;
    url: string;
    character: {
      firstName: string;
      lastName: string;
      textColor: string;
      avatar: string;
    };
    scenario: {
      id: number;
      title: string;
      safeTitle: string;
      status: string;
      era: string;
      location: string;
    };
    postAt: string;
  };
};

const links = [
  {
    label: 'Apprendre à jouer',
    href: '/create',
    isDisabled: true,
  },
  {
    label: 'Rejoindre un scénario',
    href: '/join',
    isDisabled: true,
  },
  {
    label: 'Mes personnages',
    href: '/mes-personnages',
    isDisabled: false,
  },
  {
    label: 'Créer un scénario',
    href: '/scenarios',
    isDisabled: false,
  },
  {
    label: 'Rejoindre un scénario',
    href: '/scenarios/en-attente',
    isDisabled: false,
  },
  {
    label: 'Scénarios en cours',
    href: '/scenarios/en-cours',
    isDisabled: false,
  },
  {
    label: 'Scénarios archivés',
    href: '/scenarios/archives',
    isDisabled: false,
  },
  {
    label: 'Discord',
    logo: <DiscordLogo />,
    href: `${process.env.NEXT_PUBLIC_DISCORD_LINK}`,
    isDisabled: false,
    isBlank: true,
  },
];

export function HomePage(props: HomePageProps) {
  const {
    characterCount,
    userCount,
    scenarioCount,
    postCount,
    diceCount,
    lastPost: { character, scenario, ...post },
  } = props;

  const [avatarSrc, setAvatarSrc] = useState<string>(
    character && character.avatar
      ? `${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/users/avatars/${character.avatar}`
      : DefaultAvatarSrc.src,
  );
  const timeSinceLastPost = timeSince(post.postAt);

  return (
    <>
      <LayoutMainSection>
        <Styled.Main>
          <NavBar links={links} />

          <Styled.Texts>
            <Text as="h1" size="xl">
              <Styled.Title>Les Récits Perdus</Styled.Title>
            </Text>

            <Styled.TextBlock>
              <Row align="center" gap="05" as="p">
                <CharacterIcon />
                <Styled.Stat>
                  <strong>{characterCount}</strong> personnages imaginés par{' '}
                  <strong>{userCount}</strong> joueurs
                </Styled.Stat>
              </Row>

              <Styled.Separator />

              <Row align="center" gap="05" as="p">
                <PencilIcon />
                <Styled.Stat>
                  <strong>{scenarioCount}</strong> scénarios ouverts et <strong>{postCount}</strong>{' '}
                  tours joués
                </Styled.Stat>
              </Row>

              <Styled.Separator />

              <Row align="center" gap="05" as="p">
                <D6Icon />
                <Styled.Stat>
                  <strong>{diceCount}</strong> jets de dés effectués
                </Styled.Stat>
              </Row>
            </Styled.TextBlock>

            <Styled.TextBlock>
              <Styled.LastPost>
                <Styled.Avatar
                  src={avatarSrc}
                  alt={`Avatar de ${character.firstName}`}
                  width={40}
                  height={46}
                  color={character.textColor}
                  onError={() => setAvatarSrc(DefaultAvatarSrc.src)}
                />
                <Text size="sm">
                  Dernier message par{' '}
                  <Styled.CharacterName color={character.textColor}>
                    {getFullName(character)}
                  </Styled.CharacterName>
                  dans <Link href={post.url}>{scenario.title}</Link> (Époque : {scenario.era}, lieu
                  : {scenario.location}), il y a{' '}
                  <strong title={post.postAt}>
                    {timeSinceLastPost.value} {timeSinceLastPost.unit}
                  </strong>
                </Text>
              </Styled.LastPost>
            </Styled.TextBlock>
          </Styled.Texts>
        </Styled.Main>
      </LayoutMainSection>

      <LayoutAsideSection>
        <LoginOrRegister />
      </LayoutAsideSection>
    </>
  );
}
