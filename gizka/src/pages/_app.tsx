import { Layout } from '@/components/Layout';
import '@/styles/globals.css';

import { DndProvider } from 'react-dnd';
import type { AppProps } from 'next/app';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DndProvider>
  );
}
