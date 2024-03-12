'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { UserContext, UserProvider } from '@/contexts/user';
import BackgroundStarmapImage from '@/public/images/background_starmap.png';
import DownArrowIcon from '@/public/images/icons/down_arrow.svg';
import LogoImage from '@/public/images/logo.png';

import * as Styled from './Layout/styled';

type LayoutProps = {
  children: React.ReactNode;
  footer?: string[];
};

type MainLayoutProps<T> = LayoutProps & {
  breadcrumb?: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string; id: T; isOpen: boolean; isDisabled: boolean }>;
  onTabChange?: (tab: T) => void;
};

export function Layout(props: LayoutProps) {
  return (
    <UserProvider>
      <Styled.Header>
        <Link href={'/'}>
          <Image
            src={LogoImage.src}
            alt="Les Récits Perdus"
            width={354}
            height={118}
            quality={100}
          />
        </Link>
        <UserContext.Consumer>
          {({ currentUser, logout }) =>
            currentUser && (
              <span onClick={logout}>
                Bienvenue, <strong>{currentUser.name}</strong>
              </span>
            )
          }
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

export function LayoutMainSection<T>(props: MainLayoutProps<T>) {
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
        {props.tabs && props.tabs.length > 0 && (
          <Styled.Tabs>
            {props.tabs.map((tab) => (
              <Styled.Tab
                key={tab.label}
                isOpen={tab.isOpen}
                isDisabled={tab.isDisabled}
                onClick={() => !tab.isDisabled && handleTabClick(tab.id)}
              >
                <Styled.TabLabel>{tab.label}</Styled.TabLabel>
                <Styled.TabHiddenLabel>{tab.label}</Styled.TabHiddenLabel>
              </Styled.Tab>
            ))}
          </Styled.Tabs>
        )}
      </Styled.Nav>
      <Styled.ContentWrapper>
        <Styled.Content>{props.children}</Styled.Content>
      </Styled.ContentWrapper>
    </Styled.MainSection>
  );
}

export function LayoutAsideSection(props: LayoutProps & { stickyFooter?: React.ReactNode }) {
  return (
    <Styled.AsideSection>
      <Styled.ContentWrapper>
        <Styled.Content>{props.children}</Styled.Content>
      </Styled.ContentWrapper>
      {props.stickyFooter}
    </Styled.AsideSection>
  );
}
