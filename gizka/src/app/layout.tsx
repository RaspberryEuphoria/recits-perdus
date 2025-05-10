import './global.css';

import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Layout } from '@/components/Layout';
import { StyleProvider } from '@/contexts/style';
import AppleTouchIcon from '@/public/images/favicon/apple-touch-icon.png';
import Favicon16x16 from '@/public/images/favicon/favicon-16x16.png';
import Favicon32x32 from '@/public/images/favicon/favicon-32x32.png';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: Favicon32x32.src,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: Favicon16x16.src,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: AppleTouchIcon.src,
    },
  ],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale="fr" timeZone="Europe/France" messages={messages}>
        <body>
          <StyleProvider>
            <Layout
              footer={[
                `Programmé et designé avec ❤️ par <em>Harmonie</em>`,
                `<em>Star Wars : Les Récits Perdus</em> est l&apos;héritier de <em>Tales of Galaxy</em>`,
              ]}
            >
              {children}
            </Layout>
          </StyleProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
