import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { Prompt } from '@/components/DesignSystem/Prompt';
import D6Icon from '@/public/images/icons/d6.svg';
import UnkownDieIcon from '@/public/images/icons/unkown_die.svg';
import { SkillId } from '@/utils/types/scenario';

import { MoveCardProps } from '.';
import * as Styled from './styled';

export function Marchander({ id, onPick, onClose, children }: MoveCardProps) {
  const t = useTranslations('moves');
  const [attribute, setAttribute] = useState<SkillId | undefined>();

  useEffect(() => {
    onPick({ id, meta: { attribute, isValid: Boolean(attribute) } });

    return () => {
      onPick(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attribute, id]);

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
            momentum: (chunks) => <Keyword stat="momentum">{chunks}</Keyword>,
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
            supplies: (chunks) => <Keyword stat="supplies">{chunks}</Keyword>,
            momentum: (chunks) => <Keyword stat="momentum">{chunks}</Keyword>,
          })}
        </p>

        <Prompt>
          <UnkownDieIcon />
          {t('prompts.approach')}
        </Prompt>
        <ul>
          <li>
            {t(`${id}.prompts.charm`)} :{' '}
            <Styled.ClickToRoll
              onClick={() => setAttribute(SkillId.DETERMINATION)}
              isSelected={attribute === SkillId.DETERMINATION}
            >
              +{t('skills.Détermination.skill-check')} <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.threat`)} :{' '}
            <Styled.ClickToRoll
              onClick={() => setAttribute(SkillId.TENACITE)}
              isSelected={attribute === SkillId.TENACITE}
            >
              +{t('skills.Ténacité.skill-check')} <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.lie`)} :{' '}
            <Styled.ClickToRoll
              onClick={() => setAttribute(SkillId.SUBTERFUGE)}
              isSelected={attribute === SkillId.SUBTERFUGE}
            >
              +{t('skills.Subterfuge.skill-check')} <D6Icon />
            </Styled.ClickToRoll>
          </li>
        </ul>
      </div>
      {children}
    </Styled.MoveCard>
  );
}
