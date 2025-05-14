'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Menu } from '@/components/DesignSystem/Menu';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import { LoginOrRegister } from '@/components/LoginOrRegister';
import DefaultAvatarSrc from '@/public/images/default_avatar.png';
import CharacterIcon from '@/public/images/icons/character.svg';
import D6Icon from '@/public/images/icons/d6.svg';
import PencilIcon from '@/public/images/icons/pencil.svg';
import PartnerTLSLogo from '@/public/images/partners/tls_logo.jpg';
import { getFullName } from '@/utils/character/helpers';
import { TextColor } from '@/utils/constants';
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
      textColor: TextColor;
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

  const t = useTranslations('common');

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
          <Menu links={links} />

          <Styled.Texts>
            <Text as="h1" size="xl" textAlign="center">
              <Styled.Title>{t('title')}</Styled.Title>
            </Text>

            <Styled.TextBlock>
              <Row align="center" gap="05" as="p">
                <CharacterIcon />
                <Styled.Stat>
                  <strong>{characterCount}</strong> {t('stats.characters')}{' '}
                  <strong>{userCount}</strong> {t('stats.players')}
                </Styled.Stat>
              </Row>

              <Styled.Separator />

              <Row align="center" gap="05" as="p">
                <PencilIcon />
                <Styled.Stat>
                  <strong>{scenarioCount}</strong> {t('stats.scenarios')}{' '}
                  <strong>{postCount}</strong> {t('stats.turns')}
                </Styled.Stat>
              </Row>

              <Styled.Separator />

              <Row align="center" gap="05" as="p">
                <D6Icon />
                <Styled.Stat>
                  <strong>{diceCount}</strong> {t('stats.dices')}
                </Styled.Stat>
              </Row>
            </Styled.TextBlock>

            <Styled.TextBlock>
              <Styled.LastPost>
                <Styled.Avatar
                  src={avatarSrc}
                  alt={`Avatar de ${character.firstName}`}
                  width={80}
                  height={90}
                  color={character.textColor}
                  onError={() => setAvatarSrc(DefaultAvatarSrc.src)}
                />
                <Text size="sm">
                  {t('stats.lastMessageBy')}{' '}
                  <Styled.CharacterName color={character.textColor}>
                    {getFullName(character)}
                  </Styled.CharacterName>{' '}
                  {t('stats.lastMessageIn')} <Link href={post.url}>{scenario.title}</Link> (
                  {t('stats.era')} {scenario.era}, {t('stats.location')} {scenario.location}),{' '}
                  {t('stats.lastMessageAt')}{' '}
                  <strong title={post.postAt}>
                    {timeSinceLastPost.value}{' '}
                    {t(`stats.lastMessageAtUnit.${timeSinceLastPost.unit}`)}
                  </strong>
                </Text>
              </Styled.LastPost>
            </Styled.TextBlock>
          </Styled.Texts>
        </Styled.Main>

        <Styled.PartnersWrapper>
          <Text as="h1" size="md">
            <Styled.Title>
              <Link href="/partenaires">{t('partners.title')}</Link>
            </Styled.Title>
          </Text>
          <Styled.Partners>
            <Styled.Partner>
              <a href="https://swtls.forumactif.com/" target="_blank" rel="noreferrer">
                <Image
                  src={PartnerTLSLogo.src}
                  alt="Star Wars The Last Stand"
                  width={50}
                  height={50}
                />
              </a>
            </Styled.Partner>
          </Styled.Partners>
        </Styled.PartnersWrapper>
      </LayoutMainSection>

      <LayoutAsideSection>
        <LoginOrRegister />
      </LayoutAsideSection>
    </>
  );
}
