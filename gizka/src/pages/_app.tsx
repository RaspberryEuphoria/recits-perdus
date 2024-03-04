import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Layout } from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout breadcrumb={[]}>
        <Component {...pageProps} />
      </Layout>
    </DndProvider>
  );
}
