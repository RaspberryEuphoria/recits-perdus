import { useState } from 'react';

import D6Icon from '@/public/images/icons/d6.svg';
import { Skill } from '@/utils/types/scenario';

import { MoveCardProps } from '.';
import * as Styled from './styled';

const title = 'Faire Face au Danger';

export function FaireFaceAuDanger({ id, onPick, onClose }: MoveCardProps) {
  const [selectedAttribute, setSelectedAttribute] = useState<Skill | undefined>();

  const selectAttribute = (attribute: Skill) => {
    onPick({ id, meta: { attribute } });
    setSelectedAttribute(attribute);
  };

  return (
    <Styled.MoveCard>
      <div>
        <h1>
          {title}
          <Styled.CloseButton onClick={onClose}>Annuler &#8617;</Styled.CloseButton>
        </h1>
        <p>
          Lorsque vous essayez <strong>quelque chose de risqué</strong> ou réagissez à{' '}
          <strong>une menace immédiate</strong>, décrivez votre action et lancez des dés. Si vous
          agissez...
        </p>
        <ul>
          <li>
            Avec rapidité, agilité ou précision :{' '}
            <Styled.ClickToRoll
              onClick={() => selectAttribute(Skill.FINESSE)}
              isSelected={selectedAttribute === Skill.FINESSE}
            >
              +finesse <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec charme, loyauté ou courage :{' '}
            <Styled.ClickToRoll
              onClick={() => selectAttribute(Skill.DETERMINATION)}
              isSelected={selectedAttribute === Skill.DETERMINATION}
            >
              +determination <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec aggressivité, force ou endurance :{' '}
            <Styled.ClickToRoll
              onClick={() => selectAttribute(Skill.TENACITE)}
              isSelected={selectedAttribute === Skill.TENACITE}
            >
              +tenacite <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec tromperie, furtivité ou ruse :{' '}
            <Styled.ClickToRoll
              onClick={() => selectAttribute(Skill.SUBTERFUGE)}
              isSelected={selectedAttribute === Skill.SUBTERFUGE}
            >
              +subterfuge <D6Icon />
            </Styled.ClickToRoll>
          </li>
          <li>
            Avec expertise, perspicacité ou perception :{' '}
            <Styled.ClickToRoll
              onClick={() => selectAttribute(Skill.INTUITION)}
              isSelected={selectedAttribute === Skill.INTUITION}
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
          En cas de <strong>sucès partiel</strong>, vous réussissez, mais avec une complication.
          Choisissez...
        </p>
        <ul>
          <li>
            Vous êtes ralenti, perdez l&apos;avantage, ou faites face à un nouveau danger. Perdez{' '}
            <strong>-1</strong> élan.
          </li>
          <li>
            Vous êtes fatigué ou blessé: <em>Endurer une Blessure</em> (<strong>1</strong> blessure)
          </li>
          <li>
            Vous êtes découragé ou effrayé: <em>Endurer du Stress</em> (<strong>1</strong> stress)
          </li>
          <li>
            Vous sacrifiez des ressources: Perdez <strong>-1</strong> provisions
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
