import { useEffect, useState } from 'react';

import D6Icon from '@/public/images/icons/d6.svg';
import HealthIcon from '@/public/images/icons/health.svg';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import SpiritIcon from '@/public/images/icons/spirit.svg';
import SuppliesIcon from '@/public/images/icons/supplies.svg';
import { Skill, Stat } from '@/utils/types/scenario';

import { MoveCardProps } from '.';
import * as Styled from './styled';

const title = 'Faire Face au Danger';

export function FaireFaceAuDanger({ id, onPick, onClose }: MoveCardProps) {
  const [attribute, setAttribute] = useState<Skill | undefined>();
  const [danger, setDanger] = useState<Stat | undefined>();

  useEffect(() => {
    onPick({ id, meta: { attribute, danger, isValid: Boolean(danger && attribute) } });

    return () => {
      onPick(null);
    };
  }, [attribute, danger, id, onPick]);

  return (
    <Styled.MoveCard>
      <div>
        <h1>
          {title}
          <Styled.CloseButton onClick={onClose}>Annuler &#8617;</Styled.CloseButton>
        </h1>
        <p>
          Lorsque vous essayez <strong>quelque chose de risqué</strong> ou réagissez à{' '}
          <strong>une menace immédiate</strong>, décrivez votre action et lancez des dés.{' '}
          <Styled.Prompt>Comment agissez-vous ?</Styled.Prompt>
        </p>

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
        <p>
          En cas de <strong>succès total</strong>, vous réussissez. Recevez <strong>+1</strong>{' '}
          élan.
        </p>
        <p>
          En cas de <strong>succès partiel</strong>, vous réussissez, mais avec une complication.{' '}
          <Styled.Prompt>Qu&apos;êtes vous prêt à perdre ?</Styled.Prompt>
        </p>
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
            Vous êtes fatigué ou blessé :{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(Stat.HEALTH)}
              isSelected={danger === Stat.HEALTH}
              variant="danger"
            >
              -1 santé <HealthIcon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Vous êtes découragé ou effrayé :{' '}
            <Styled.ClickToRoll
              onClick={() => setDanger(Stat.SPIRIT)}
              isSelected={danger === Stat.SPIRIT}
              variant="danger"
            >
              -1 esprit <SpiritIcon />
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
        <p>
          En cas d&apos;<strong>échec</strong>, vous échouez, ou votre progression subit un
          retournement dramatique. Vous devez <em>Payer le Prix</em>.
        </p>
      </div>
    </Styled.MoveCard>
  );
}
