import { useEffect, useState } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';
import { Prompt } from '@/components/DesignSystem/Prompt';
import D6Icon from '@/public/images/icons/d6.svg';
import HealthIcon from '@/public/images/icons/health.svg';
import MomentumIcon from '@/public/images/icons/momentum.svg';
import SpiritIcon from '@/public/images/icons/spirit.svg';
import SuppliesIcon from '@/public/images/icons/supplies.svg';
import UnkownDieIcon from '@/public/images/icons/unkown_die.svg';
import { SkillId, Stat } from '@/utils/types/scenario';

import { MoveCardProps } from '.';
import * as Styled from './styled';

const title = 'Faire Face au Danger';

export function FaireFaceAuDanger({ id, onPick, onClose, children }: MoveCardProps) {
  const [skillId, setSkillId] = useState<SkillId | undefined>();
  const [danger, setDanger] = useState<Stat | undefined>();

  useEffect(() => {
    onPick({ id, meta: { skillId, danger, isValid: Boolean(danger && skillId) } });

    return () => {
      onPick(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillId, danger, id]);

  return (
    <Styled.MoveCard>
      <div>
        <h1>
          <Keyword stat="move">{title}</Keyword>
          <Styled.CloseButton onClick={onClose}>Annuler &#8617;</Styled.CloseButton>
        </h1>
        <Styled.Summary>
          Lorsque{' '}
          <strong>vous tentez quelque chose de risqué ou réagissez à une menace immédiate</strong>,
          décrivez votre action et faites un jet.
        </Styled.Summary>

        <p>
          En cas de <strong>succès total</strong>, vous réussissez. Recevez{' '}
          <Keyword stat="momentum">+1</Keyword> ferveur.
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
          Comment agissez-vous ?
        </Prompt>
        <ul>
          <li>
            Avec rapidité, agilité ou précision :{' '}
            <Styled.ClickToRoll
              onClick={() => setSkillId(SkillId.FINESSE)}
              isSelected={skillId === SkillId.FINESSE}
            >
              +finesse <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec charme, loyauté ou courage :{' '}
            <Styled.ClickToRoll
              onClick={() => setSkillId(SkillId.DETERMINATION)}
              isSelected={skillId === SkillId.DETERMINATION}
            >
              +determination <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec aggressivité, force ou endurance :{' '}
            <Styled.ClickToRoll
              onClick={() => setSkillId(SkillId.TENACITE)}
              isSelected={skillId === SkillId.TENACITE}
            >
              +tenacite <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec tromperie, furtivité ou ruse :{' '}
            <Styled.ClickToRoll
              onClick={() => setSkillId(SkillId.SUBTERFUGE)}
              isSelected={skillId === SkillId.SUBTERFUGE}
            >
              +subterfuge <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec expertise, perspicacité ou perception :{' '}
            <Styled.ClickToRoll
              onClick={() => setSkillId(SkillId.INTUITION)}
              isSelected={skillId === SkillId.INTUITION}
            >
              +intuition <D6Icon />
            </Styled.ClickToRoll>
          </li>
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
              -1 ferveur <MomentumIcon />
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
      </div>
      {children}
    </Styled.MoveCard>
  );
}
