'use client';

import Link from 'next/link';

import { useLocalStorage } from '@/utils/hooks/localStorage';

import styles from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
  breadcrumb?: Array<{ label: string; href: string }>;
};

type User = {
  name: string;
  email: string;
};

export function Layout(props: LayoutProps) {
  const [currentUser] = useLocalStorage<User>('currentUser');

  return (
    <>
      <header className={styles.header}>
        {currentUser && (
          <span>
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
      <footer className={styles.footer}></footer>
    </>
  );
}

export function LayoutMainSection(props: LayoutProps) {
  return (
    <section className={styles.mainSection}>
      {props.breadcrumb && (
        <nav className={styles.breadcrumb}>
          {props.breadcrumb.map((item, index) => (
            <Link href={item.href} key={item.label}>
              {item.label}
              {index < props.breadcrumb.length - 1 && <span> &gt; </span>}
            </Link>
          ))}
        </nav>
      )}
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
