'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Fragment, useMemo } from 'react';

import { NavBar } from '@/components/DesignSystem/NavBar';
import { UserContext, UserProvider } from '@/contexts/user';
import BackgroundStarmapImage from '@/public/images/background_starmap.png';
import DiscordLogo from '@/public/images/icons/discord_logo.svg';
import DownArrowIcon from '@/public/images/icons/down_arrow.svg';
import LogoImage from '@/public/images/logo.png';

import * as Styled from './Layout/styled';

type LayoutProps<T> = {
  children: React.ReactNode;
  footer?: string[];
  breadcrumb?: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string; id: T; isOpen: boolean; isDisabled: boolean }>;
  onTabChange?: (tab: T) => void;
};

type AsideLayoutProps<T> = Omit<LayoutProps<T>, 'tabs' | 'onTabChange'> & {
  stickyFooter?: React.ReactNode;
  isFullWidth?: boolean;
};

export function Layout<T>(props: LayoutProps<T>) {
  const t = useTranslations('common');
  const pathname = usePathname();

  const computeLinks = useMemo(
    () =>
      ({ isLoggedIn, pathname }: { isLoggedIn: boolean; pathname: string | null }) =>
        [
          {
            label: t('navigation.home'),
            href: '/',
            isDisabled: false,
            isActive: pathname === '/',
          },
          {
            label: t('navigation.howToPlay'),
            href: '/comment-jouer',
            isDisabled: false,
            isActive: pathname === '/comment-jouer',
          },
          {
            label: t('navigation.characters'),
            href: '/mes-personnages',
            isDisabled: !isLoggedIn,
            isActive: pathname === '/mes-personnages',
          },
          {
            label: t('navigation.discord'),
            logo: <DiscordLogo />,
            href: `${process.env.NEXT_PUBLIC_DISCORD_LINK}`,
            isDisabled: false,
            isBlank: true,
          },
        ],
    [t],
  );

  return (
    <UserProvider>
      <Styled.Header>
        <Styled.Logo>
          <Link href={'/'}>
            <Image
              src={LogoImage.src}
              alt="Les Récits Perdus"
              width={354}
              height={118}
              quality={100}
            />
          </Link>
        </Styled.Logo>
        <UserContext.Consumer>
          {({ currentUser, logout }) => (
            <>
              <NavBar links={computeLinks({ isLoggedIn: !!currentUser, pathname })} />
              {currentUser ? (
                <span onClick={logout}>
                  {t('welcome')}, <strong>{currentUser.name}</strong>
                </span>
              ) : (
                <span />
              )}
            </>
          )}
        </UserContext.Consumer>
      </Styled.Header>
      <Styled.Main style={{ backgroundImage: `url(${BackgroundStarmapImage.src})` }}>
        {props.children}
      </Styled.Main>
      <Styled.Footer>
        {props.footer?.map((child) => (
          <p dangerouslySetInnerHTML={{ __html: child }} key={child} />
        ))}
      </Styled.Footer>
    </UserProvider>
  );
}

export function LayoutMainSection<T>(props: LayoutProps<T>) {
  if (
    (!props.breadcrumb && !props.tabs) ||
    (props?.breadcrumb?.length === 0 && props?.tabs?.length === 0)
  ) {
    return <Styled.MainSection>{props.children}</Styled.MainSection>;
  }

  const handleTabClick = (tabId: T) => {
    if (props.onTabChange) {
      props.onTabChange(tabId);
    }
  };

  return (
    <Styled.MainSection>
      <Styled.Nav>
        {props.breadcrumb && props.breadcrumb.length > 0 && (
          <Styled.Bradcrumb>
            {props.breadcrumb.map((item, index) => {
              return props.breadcrumb && index < props.breadcrumb.length - 1 ? (
                <Fragment key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                  <Styled.BradcrumbSeparator>
                    <DownArrowIcon />
                  </Styled.BradcrumbSeparator>
                </Fragment>
              ) : (
                item.label
              );
            })}
          </Styled.Bradcrumb>
        )}
      </Styled.Nav>

      {props.tabs && props.tabs.length > 0 && (
        <Styled.Nav noPadding>
          <Styled.Tabs>
            {props.tabs.map((tab) => (
              <Styled.Tab
                key={tab.label}
                isOpen={tab.isOpen}
                isDisabled={tab.isDisabled}
                onClick={() => !tab.isDisabled && handleTabClick(tab.id)}
              >
                {tab.label}
              </Styled.Tab>
            ))}
          </Styled.Tabs>
        </Styled.Nav>
      )}

      <Styled.ContentWrapper>
        <Styled.Content>{props.children}</Styled.Content>
      </Styled.ContentWrapper>
    </Styled.MainSection>
  );
}

export function LayoutAsideSection<T>(props: AsideLayoutProps<T>) {
  const { breadcrumb, stickyFooter, isFullWidth } = props;

  return (
    <Styled.AsideSection fullwidth={isFullWidth}>
      {breadcrumb && breadcrumb.length > 0 && (
        <Styled.Nav>
          <Styled.Bradcrumb>
            {breadcrumb.map((item, index) => {
              return breadcrumb && index < breadcrumb.length - 1 ? (
                <Fragment key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                  <Styled.BradcrumbSeparator>
                    <DownArrowIcon />
                  </Styled.BradcrumbSeparator>
                </Fragment>
              ) : (
                item.label
              );
            })}
          </Styled.Bradcrumb>
        </Styled.Nav>
      )}

      <Styled.ContentWrapper>
        <Styled.Content>{props.children}</Styled.Content>
      </Styled.ContentWrapper>

      {stickyFooter}
    </Styled.AsideSection>
  );
}
