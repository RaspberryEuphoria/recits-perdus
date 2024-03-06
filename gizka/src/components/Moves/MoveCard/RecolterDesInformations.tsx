import { useEffect } from 'react';

import { Keyword } from '@/components/DesignSystem/Keyword';

import { MoveCardProps } from '.';
import * as Styled from './styled';

const title = 'Récolter Des Informations';

export function RecolterDesInformations({ id, onPick, onClose, children }: MoveCardProps) {
  useEffect(() => {
    onPick({ id, meta: { attribute: 'Intuition', isValid: true } });

    return () => {
      onPick(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            vous fouillez une zone, posez des questions, menez une investigation ou remontez une
            piste
          </strong>
          , décrivez votre action et faites un jet (+intuition).
        </Styled.Summary>

        <p>
          En cas de <strong>succès total</strong>, vous découvrez quelque chose d&apos;utile et de
          précis. Le chemin que vous devez suivre ou votre prochaine action vous apparaissent
          clairement. Recevez <Keyword stat="momentum">+2</Keyword> élan.
        </p>
        <p>
          En cas de <strong>succès partiel</strong>, l&apos;information obtenue complique votre
          mission ou introduit un nouveau danger. Recevez <Keyword stat="momentum">+1</Keyword>{' '}
          élan.
        </p>
        <p>
          En cas d&apos;<strong>échec</strong>, votre investigation révèle une terrible menace ou
          met au jour une vérité indésirable qui remet en question votre objectif. Vous devez en{' '}
          <Keyword stat="move">Payer le Prix</Keyword>.
        </p>
      </div>
      {children}
    </Styled.MoveCard>
  );
}
