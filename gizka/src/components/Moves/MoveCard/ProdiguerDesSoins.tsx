import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { Prompt } from '@/components/DesignSystem/Prompt';
import D6Icon from '@/public/images/icons/d6.svg';
import HealthIcon from '@/public/images/icons/health.svg';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import SpiritIcon from '@/public/images/icons/spirit.svg';
import SuppliesIcon from '@/public/images/icons/supplies.svg';
import UnkownDieIcon from '@/public/images/icons/unkown_die.svg';
import { Skill, Stat } from '@/utils/types/scenario';

import { MoveCardProps } from '.';
import * as Styled from './styled';

export function ProdiguerDesSoins({ id, onPick, onClose, children }: MoveCardProps) {
  const t = useTranslations('moves');
  const [target, setTarget] = useState('');
  const [danger, setDanger] = useState<Stat | undefined>();

  useEffect(() => {
    const attribute = Skill.TENACITE;
    onPick({ id, meta: { attribute, danger, isValid: Boolean(danger && attribute) } });

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
          <Styled.CloseButton onClick={onClose}>Annuler &#8617;</Styled.CloseButton>
        </h1>
        <Styled.Summary>{t(`${id}.summary`)}</Styled.Summary>

        <p>
          En cas de <strong>succès total</strong>, vous réussissez. Recevez{' '}
          <Keyword stat="momentum">+1</Keyword> élan.
        </p>
        <p>
          En cas de <strong>succès partiel</strong>, vous réussissez, mais avec une complication.{' '}
        </p>
        <p>
          En cas d&apos;<strong>échec</strong>, vous échouez, ou votre progression subit un
          retournement dramatique. Vous devez en <Keyword stat="move">Payer le Prix</Keyword>.
        </p>

        <Prompt>
          <UnkownDieIcon />
          Qui voulez-vous soigner ?
        </Prompt>
        <ul>
          {/* <li>
            Avec rapidité, agilité ou précision :{' '}
            <Styled.ClickToRoll
              onClick={() => setAttribute(Skill.FINESSE)}
              isSelected={attribute === Skill.FINESSE}
            >
              +finesse <D6Icon />
            </Styled.ClickToRoll>
          </li> */}
        </ul>
        <Prompt>
          <UnkownDieIcon />
          Qu&apos;êtes vous prêt à perdre ?
        </Prompt>
        <ul>
          <li>
            Vous êtes ralenti, perdez l&apos;avantage, ou faites face à un danger supplémentaire :{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(Stat.MOMENTUM)}
              isSelected={danger === Stat.MOMENTUM}
              variant="danger"
            >
              -1 élan <MomentumIcon />
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
