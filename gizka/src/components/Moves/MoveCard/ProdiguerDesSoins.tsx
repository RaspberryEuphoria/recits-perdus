import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { Prompt } from '@/components/DesignSystem/Prompt';
import HealthIcon from '@/public/images/icons/health.svg';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import SuppliesIcon from '@/public/images/icons/supplies.svg';
import UnkownDieIcon from '@/public/images/icons/unkown_die.svg';
import { getFullName } from '@/utils/character/helpers';
import { Character } from '@/utils/types/character';
import { SkillId, Stat } from '@/utils/types/scenario';

import { MoveCardProps } from '.';
import * as Styled from './styled';

export function ProdiguerDesSoins({
  id,
  onPick,
  onClose,
  character,
  characters,
  children,
}: MoveCardProps) {
  const t = useTranslations('moves');
  const [targetId, setTargetId] = useState<number>();
  const [danger, setDanger] = useState<Stat | undefined>();
  const injuredCharacters = characters.sort((a, b) => a.health - b.health);

  useEffect(() => {
    const skillId = targetId ? getSkillId(character, targetId) : SkillId.INTUITION;

    onPick({
      id,
      meta: { targetId, skillId, danger, isValid: Boolean(danger && targetId !== null) },
    });

    return () => {
      onPick(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [danger, targetId, id]);

  return (
    <Styled.MoveCard>
      <div>
        <h1>
          <Keyword stat="move">{t(`${id}.name`)}</Keyword>
          <Styled.CloseButton onClick={onClose}>{t('buttons.cancel')} &#8617;</Styled.CloseButton>
        </h1>
        <Styled.Summary>{t(`${id}.summary`)}</Styled.Summary>

        <p>
          {t.rich(`${id}.results.strong-hit`, {
            important: (chunks) => <strong>{chunks}</strong>,
            health: (chunks) => <Keyword stat="health">{chunks}</Keyword>,
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
          {t(`prompts.heal`)}
        </Prompt>
        <ul>
          {injuredCharacters.map((character) => (
            <li key={character.id}>
              <Styled.ClickToRoll
                onClick={() => setTargetId(character.id)}
                isSelected={targetId === character.id}
                color={character.textColor}
              >
                {getFullName(character, false)} {character.health}/5 <HealthIcon />
              </Styled.ClickToRoll>{' '}
            </li>
          ))}
          <li>
            <Styled.ClickToRoll onClick={() => setTargetId(0)} isSelected={targetId === -1}>
              {t(`${id}.prompts.target.someone-else`)}
            </Styled.ClickToRoll>
          </li>
        </ul>
        <Prompt>
          <UnkownDieIcon />
          {t(`prompts.danger`)}
        </Prompt>
        <ul>
          <li>
            Vous êtes ralenti, perdez l&apos;avantage, ou faites face à un danger supplémentaire :{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(Stat.MOMENTUM)}
              isSelected={danger === Stat.MOMENTUM}
              variant="danger"
            >
              -1 ferveur <MomentumIcon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Vous sacrifiez des ressources :{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(Stat.SUPPLIES)}
              isSelected={danger === Stat.SUPPLIES}
              variant="danger"
            >
              -1 provisions <SuppliesIcon />
            </Styled.ClickToRoll>
          </li>
        </ul>
      </div>
      {children}
    </Styled.MoveCard>
  );
}

function getSkillId(character: Character, targetId: number) {
  if (targetId !== character.id) return SkillId.INTUITION;

  const intuition = character.skills.find((skill) => skill.skillId === SkillId.INTUITION);
  const tenacite = character.skills.find((skill) => skill.skillId === SkillId.TENACITE);

  if (!intuition || !tenacite) {
    throw new Error(`Character ${character.id} does not have the required skills`);
  }

  if (intuition.level > tenacite.level) {
    return SkillId.INTUITION;
  }

  return SkillId.TENACITE;
}
