'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useLocalStorage } from '@/utils/hooks/localStorage';

import styles from './Layout.module.css';
import * as Styled from './Layout/styled';

type LayoutProps = {
  children: React.ReactNode;
  footer?: string[];
};

type MainLayoutProps<T> = LayoutProps & {
  breadcrumb?: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string; id: T; isOpen: boolean }>;
  onTabChange?: (tab: T) => void;
};

type User = {
  name: string;
  email: string;
};

export function Layout(props: LayoutProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentUser, _, clearValue] = useLocalStorage<User>('currentUser');

  const logout = () => {
    clearValue();
  };

  return (
    <>
      <header className={styles.header}>
        <Image src="/images/logo.png" alt="Gizka" width={354} height={118} quality={100} />
        {currentUser && (
          <span onClick={logout}>
            Bienvenue, <strong>{currentUser.name}</strong>
          </span>
        )}
      </header>
      <main
        className={[
          styles.main,
          styles.flex,
          styles.justifyEnd,
          styles.fullH,
          styles.scrollHidden,
        ].join(' ')}
        style={{ backgroundImage: 'url(/images/background_starmap.png)' }}
      >
        {props.children}
      </main>
      <footer className={styles.footer}>
        {props.footer?.map((child) => (
          <p dangerouslySetInnerHTML={{ __html: child }} key={child} />
        ))}
      </footer>
    </>
  );
}

export function LayoutMainSection<T>(props: MainLayoutProps<T>) {
  if (
    (!props.breadcrumb && !props.tabs) ||
    (props?.breadcrumb?.length === 0 && props?.tabs?.length === 0)
  ) {
    return (
      <section className={[styles.mainSection, styles.scroller].join(' ')}>
        {props.children}
      </section>
    );
  }

  const handleTabClick = (tabId: T) => {
    if (props.onTabChange) {
      props.onTabChange(tabId);
    }
  };

  return (
    <section className={[styles.mainSection, styles.overflowY, styles.scroller].join(' ')}>
      <Styled.Nav>
        {props.breadcrumb && props.breadcrumb.length > 0 && (
          <Styled.Bradcrumb>
            {props.breadcrumb.map((item, index) => {
              return props.breadcrumb && index < props.breadcrumb.length - 1 ? (
                <Link href={item.href} key={item.label}>
                  {item.label}
                  <Styled.BradcrumbSeparator> 🢒 </Styled.BradcrumbSeparator>
                </Link>
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
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </Styled.Tab>
            ))}
          </Styled.Tabs>
        )}
      </Styled.Nav>
      {props.children}
    </section>
  );
}

export function LayoutAsideSection(props: LayoutProps) {
  return (
    <>
      <aside className={[styles.asideSection, styles.overflowY, styles.scroller].join(' ')}>
        {props.children}
      </aside>
    </>
  );
}
