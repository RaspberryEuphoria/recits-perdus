import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { Prompt } from '@/components/DesignSystem/Prompt';
import D6Icon from '@/public/images/icons/d6.svg';
import UnkownDieIcon from '@/public/images/icons/unkown_die.svg';
import { SkillId } from '@/utils/types/scenario';

import { MoveCardProps } from '.';
import * as Styled from './styled';

export function Attaquer({ id, onPick, onClose, children }: MoveCardProps) {
  const t = useTranslations('moves');
  const [skillId, setSkillId] = useState<SkillId | undefined>();

  useEffect(() => {
    onPick({ id, meta: { skillId, isValid: Boolean(skillId) } });

    return () => {
      onPick(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillId, id]);

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
            progress: (chunks) => <Keyword stat="move">{chunks}</Keyword>,
          })}
        </p>
        <p>
          {t.rich(`${id}.results.weak-hit`, {
            important: (chunks) => <strong>{chunks}</strong>,
            momentum: (chunks) => <Keyword stat="momentum">{chunks}</Keyword>,
            progress: (chunks) => <Keyword stat="move">{chunks}</Keyword>,
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
          {t(`prompts.fight`)}
        </Prompt>
        <ul>
          <li>
            {t(`${id}.prompts.melee`)} :{' '}
            <Styled.ClickToRoll
              onClick={() => setSkillId(SkillId.TENACITE)}
              isSelected={skillId === SkillId.TENACITE}
            >
              +{t('skills.Ténacité.skill-check')} <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.distance`)} :{' '}
            <Styled.ClickToRoll
              onClick={() => setSkillId(SkillId.FINESSE)}
              isSelected={skillId === SkillId.FINESSE}
            >
              +{t('skills.Finesse.skill-check')} <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.force`)} :{' '}
            <Styled.ClickToRoll
              onClick={() => setSkillId(SkillId.INTUITION)}
              isSelected={skillId === SkillId.INTUITION}
            >
              +{t('skills.Intuition.skill-check')} <D6Icon />
            </Styled.ClickToRoll>
          </li>
        </ul>
      </div>
      {children}
    </Styled.MoveCard>
  );
}
