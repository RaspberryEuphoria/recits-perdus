'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Text } from '@/components/DesignSystem/Text';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';

type PartenaireWithIdPageProps = {
  name: string;
  children: React.ReactNode;
};

export function PartenaireWithIdPage(props: PartenaireWithIdPageProps) {
  const { name, children } = props;

  const t = useTranslations('partners');

  return (
    <>
      <LayoutMainSection
        breadcrumb={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.partners'), href: '/partenaires' },
          { label: name, href: '#' },
        ]}
      >
        {children}
      </LayoutMainSection>

      <LayoutAsideSection>
        <Text size="sm" textAlign="center">
          {t('joinUs')} <Link href={`${process.env.NEXT_PUBLIC_DISCORD_LINK}`}>{t('discord')}</Link>{' '}
          !
        </Text>
      </LayoutAsideSection>
    </>
  );
}
