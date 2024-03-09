import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextIntlClientProvider } from 'next-intl';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Layout } from '@/components/Layout';
import AppleTouchIcon from '@/public/images/favico/apple-touch-icon.png';
import Favicon16x16 from '@/public/images/favico/favicon-16x16.png';
import Favicon32x32 from '@/public/images/favico/favicon-32x32.png';
import SafariPinnedTab from '@/public/images/favico/safari-pinned-tab.svg';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href={AppleTouchIcon.src} />
        <link rel="icon" type="image/png" sizes="32x32" href={Favicon32x32.src} />
        <link rel="icon" type="image/png" sizes="16x16" href={Favicon16x16.src} />
        <link rel="mask-icon" href={SafariPinnedTab.src} color="#5bbad5" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextIntlClientProvider locale="fr" timeZone="Europe/France" messages={pageProps.messages}>
        <Layout footer={pageProps.footer}>
          <Component {...pageProps} />
        </Layout>
      </NextIntlClientProvider>
    </DndProvider>
  );
}
