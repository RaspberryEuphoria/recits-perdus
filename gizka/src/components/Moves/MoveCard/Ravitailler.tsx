import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { Prompt } from '@/components/DesignSystem/Prompt';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import UnkownDieIcon from '@/public/images/icons/unkown_die.svg';

import { MoveCardProps } from '.';
import * as Styled from './styled';

export function Ravitailler({ id, onPick, onClose, children }: MoveCardProps) {
  const t = useTranslations('moves');
  const [danger, setDanger] = useState(0);

  useEffect(() => {
    onPick({ id, meta: { attribute: 'Intuition', danger, isValid: danger > 0 } });

    return () => {
      onPick(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [danger, id]);

  return (
    <Styled.MoveCard>
      <div>
        <h1>
          <Keyword stat="move">{t(`${id}.name`)}</Keyword>

          <Styled.CloseButton onClick={onClose}>{t('buttons.cancel')} &#8617;</Styled.CloseButton>
        </h1>
        <Styled.Summary>
          {t.rich(`${id}.summary`, {
            important: (chunks) => <strong>{chunks}</strong>,
            move: (chunks) => <Keyword stat="move">{chunks}</Keyword>,
          })}
        </Styled.Summary>

        <p>
          {t.rich(`${id}.results.strong-hit`, {
            important: (chunks) => <strong>{chunks}</strong>,
            supplies: (chunks) => <Keyword stat="supplies">{chunks}</Keyword>,
          })}
        </p>
        <p>
          {t.rich(`${id}.results.weak-hit`, {
            important: (chunks) => <strong>{chunks}</strong>,
            supplies: (chunks) => <Keyword stat="supplies">{chunks}</Keyword>,
            momentum: (chunks) => <Keyword stat="momentum">{chunks}</Keyword>,
          })}
        </p>
        <p>
          {t.rich(`${id}.results.miss`, {
            important: (chunks) => <strong>{chunks}</strong>,
            move: (chunks) => <Keyword stat="move">{chunks}</Keyword>,
          })}
        </p>

        <Prompt>
          <UnkownDieIcon />
          {t(`prompts.danger`)}
        </Prompt>
        <ul>
          <li>
            {t(`${id}.prompts.minimal-loss`)}{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(1)}
              isSelected={danger === 1}
              variant="danger"
            >
              -1 {t('stats.momentum')} <MomentumIcon />
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.maximal-loss`)}{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(2)}
              isSelected={danger === 2}
              variant="danger"
            >
              -2 {t('stats.momentum')} <MomentumIcon />
            </Styled.ClickToRoll>
          </li>
        </ul>
      </div>
      {children}
    </Styled.MoveCard>
  );
}
