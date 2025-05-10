'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Text } from '@/components/DesignSystem/Text';
import { LayoutAsideSection, LayoutMainSection } from '@/components/Layout';
import PartnerTLSLogoLg from '@/public/images/partners/tls_logo_lg.jpg';

import * as Styled from './styled';

const partners = [
  {
    name: 'Star Wars : The Last Stand',
    slug: 'the-last-stand',
    description:
      '1500 ans après la Bataille de Yavin, trois superpuissances s’affrontent pour le contrôle total de ma galaxie.',
    logo: PartnerTLSLogoLg.src,
  },
];

export function PartenairesPage() {
  const t = useTranslations('partners');

  return (
    <>
      <LayoutMainSection
        breadcrumb={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.partners'), href: '#' },
        ]}
      >
        <Styled.PartnersList>
          {partners.map((partner) => (
            <Styled.Partner key={partner.slug} href={`/partenaires/${partner.slug}`}>
              <Styled.PartnerLabel>{partner.name}</Styled.PartnerLabel>
              <Image src={partner.logo} alt={partner.name} width={100} height={35} quality={100} />
            </Styled.Partner>
          ))}
        </Styled.PartnersList>
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
