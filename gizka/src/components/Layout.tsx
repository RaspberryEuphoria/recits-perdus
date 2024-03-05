'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useLocalStorage } from '@/utils/hooks/localStorage';

import styles from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
  breadcrumb: Array<{ label: string; href: string }>;
  footer?: string[];
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

export function LayoutMainSection(props: LayoutProps) {
  return (
    <section className={[styles.mainSection, styles.scroller].join(' ')}>
      {props.breadcrumb?.length > 0 && (
        <nav className={styles.breadcrumb}>
          {props.breadcrumb.map((item, index) => {
            return index < props.breadcrumb.length - 1 ? (
              <Link href={item.href} key={item.label}>
                {item.label}
                <span className={styles.separator}> 🢒 </span>
              </Link>
            ) : (
              item.label
            );
          })}
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
