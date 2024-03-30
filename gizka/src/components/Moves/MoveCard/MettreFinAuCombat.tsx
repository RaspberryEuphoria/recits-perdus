import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { Prompt } from '@/components/DesignSystem/Prompt';
import HealthIcon from '@/public/images/icons/health.svg';
import SpiritIcon from '@/public/images/icons/spirit.svg';
import UnkownDieIcon from '@/public/images/icons/unkown_die.svg';
import { FightOutcome, Stat } from '@/utils/types/scenario';

import { MoveCardProps } from '.';
import * as Styled from './styled';

export function MettreFinAuCombat({ id, onPick, onClose }: MoveCardProps) {
  const t = useTranslations('moves');
  const [danger, setDanger] = useState<Stat | FightOutcome | undefined>();

  useEffect(() => {
    onPick({ id, meta: { danger, isValid: Boolean(danger) } });

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
            momentum: (chunks) => <Keyword stat="momentum">{chunks}</Keyword>,
          })}
        </p>
        <p>
          {t.rich(`${id}.results.weak-hit`, {
            important: (chunks) => <strong>{chunks}</strong>,
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
          {t('prompts.danger')}
        </Prompt>
        <ul>
          <li>
            {t(`${id}.prompts.health`)}{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(Stat.HEALTH)}
              isSelected={danger === Stat.HEALTH}
              variant="danger"
            >
              -1 {t('stats.health')} <HealthIcon />
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.spirit`)}{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(Stat.SPIRIT)}
              isSelected={danger === Stat.SPIRIT}
              variant="danger"
            >
              -1 {t('stats.spirit')} <SpiritIcon />
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.new-danger`)}{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(FightOutcome.NEW_DANGER)}
              isSelected={danger === FightOutcome.NEW_DANGER}
              variant="danger"
            >
              {t('dangers.danger')}
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.damage`)}{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(FightOutcome.DAMAGE)}
              isSelected={danger === FightOutcome.DAMAGE}
              variant="danger"
            >
              {t('dangers.damage')}
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.goal-is-lost`)}{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(FightOutcome.GOAL_IS_LOST)}
              isSelected={danger === FightOutcome.GOAL_IS_LOST}
              variant="danger"
            >
              {t('dangers.goal-is-lost')}
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.vendetta`)}{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(FightOutcome.VENDETTA)}
              isSelected={danger === FightOutcome.VENDETTA}
              variant="danger"
            >
              {t('dangers.vendetta')}
            </Styled.ClickToRoll>
          </li>
        </ul>
      </div>
    </Styled.MoveCard>
  );
}
