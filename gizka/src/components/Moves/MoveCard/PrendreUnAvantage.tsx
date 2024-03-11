import { useEffect, useState } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { Prompt } from '@/components/DesignSystem/Prompt';
import D6Icon from '@/public/images/icons/d6.svg';
import UnkownDieIcon from '@/public/images/icons/unkown_die.svg';
import { Skill } from '@/utils/types/scenario';

import { MoveCardProps } from '.';
import * as Styled from './styled';

const title = 'Prendre un Avantage';

export function PrendreUnAvantage({ id, onPick, onClose, children }: MoveCardProps) {
  const [attribute, setAttribute] = useState<Skill | undefined>();

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
          <Keyword stat="move">{title}</Keyword>
          <Styled.CloseButton onClick={onClose}>Annuler &#8617;</Styled.CloseButton>
        </h1>
        <Styled.Summary>
          Lorsque vous{' '}
          <strong>
            évaluez une situation, que vous faites des préparatifs ou que vous tentez d’obtenir un
            moyen de pression
          </strong>
          , décrivez votre action et faites un jet.
        </Styled.Summary>

        <p>
          En cas de <strong>succès total</strong>, vous obtenez un avantage. Recevez{' '}
          <Keyword stat="momentum">+2</Keyword> ferveur.
        </p>
        <p>
          En cas de <strong>succès partiel</strong>, votre avantage est de courte durée. Recevez{' '}
          <Keyword stat="momentum">+1</Keyword> ferveur.
        </p>
        <p>
          En cas d&apos;<strong>échec</strong>, votre tentative échoue ou vos suppositions vous
          égarent. Vous devez en <Keyword stat="move">Payer le Prix</Keyword>.
        </p>

        <Prompt>
          <UnkownDieIcon />
          Comment agissez-vous ?
        </Prompt>
        <ul>
          <li>
            Avec rapidité, agilité ou précision :{' '}
            <Styled.ClickToRoll
              onClick={() => setAttribute(Skill.FINESSE)}
              isSelected={attribute === Skill.FINESSE}
            >
              +finesse <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec charme, loyauté ou courage :{' '}
            <Styled.ClickToRoll
              onClick={() => setAttribute(Skill.DETERMINATION)}
              isSelected={attribute === Skill.DETERMINATION}
            >
              +determination <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec aggressivité, force ou endurance :{' '}
            <Styled.ClickToRoll
              onClick={() => setAttribute(Skill.TENACITE)}
              isSelected={attribute === Skill.TENACITE}
            >
              +tenacite <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec tromperie, furtivité ou ruse :{' '}
            <Styled.ClickToRoll
              onClick={() => setAttribute(Skill.SUBTERFUGE)}
              isSelected={attribute === Skill.SUBTERFUGE}
            >
              +subterfuge <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec expertise, perspicacité ou perception :{' '}
            <Styled.ClickToRoll
              onClick={() => setAttribute(Skill.INTUITION)}
              isSelected={attribute === Skill.INTUITION}
            >
              +intuition <D6Icon />
            </Styled.ClickToRoll>
          </li>
        </ul>
      </div>
      {children}
    </Styled.MoveCard>
  );
}
