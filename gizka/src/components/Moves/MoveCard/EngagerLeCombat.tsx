import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { Prompt } from '@/components/DesignSystem/Prompt';
import D6Icon from '@/public/images/icons/d6.svg';
import UnkownDieIcon from '@/public/images/icons/unkown_die.svg';
import { SkillId } from '@/utils/types/scenario';

import { MoveCardProps } from '.';
import * as Styled from './styled';

export function EngagerLeCombat({ id, onPick, onClose, children }: MoveCardProps) {
  const t = useTranslations('moves');
  const [skillId, setSkillId] = useState<SkillId | undefined>();
  const [difficulty, setDifficulty] = useState<number>();

  useEffect(() => {
    onPick({ id, meta: { skillId, difficulty, isValid: Boolean(skillId && difficulty) } });

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

        <Styled.Summary>
          {t.rich(`${id}.help`, {
            important: (chunks) => <strong>{chunks}</strong>,
            move: (chunks) => <Keyword stat="move">{chunks}</Keyword>,
          })}
        </Styled.Summary>

        <Prompt>
          <UnkownDieIcon />
          {t(`${id}.difficulty-prompt`)}
        </Prompt>
        <ul>
          {[4, 6, 8, 10].map((value) => (
            <li key={value}>
              {t(`${id}.difficulty.${value}`)} :{' '}
              <Styled.ClickToRoll
                onClick={() => setDifficulty(value)}
                isSelected={difficulty === value}
              >
                {t(`difficulty.${value}`)} (d{value})
              </Styled.ClickToRoll>
            </li>
          ))}
        </ul>

        <Prompt>
          <UnkownDieIcon />
          {t(`${id}.approach`)}
        </Prompt>
        <ul>
          <li>
            {t(`${id}.prompts.face`)} :{' '}
            <Styled.ClickToRoll
              onClick={() => setSkillId(SkillId.DETERMINATION)}
              isSelected={skillId === SkillId.DETERMINATION}
            >
              +{t('skills.Détermination.skill-check')} <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.backstab`)} :{' '}
            <Styled.ClickToRoll
              onClick={() => setSkillId(SkillId.SUBTERFUGE)}
              isSelected={skillId === SkillId.SUBTERFUGE}
            >
              +{t('skills.Subterfuge.skill-check')} <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            {t(`${id}.prompts.embushed`)} :{' '}
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
