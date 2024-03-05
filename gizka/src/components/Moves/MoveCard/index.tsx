import { Move } from '@/components/Dialog/DialogTextarea/DialogTextarea';

import { FaireFaceAuDanger } from './FaireFaceAuDanger';

export type MoveCardProps = {
  id: string;
  onPick: (move: Move | null) => void;
  onClose: () => void;
};

export function MoveCard(props: MoveCardProps) {
  switch (props.id) {
    case 'FAIRE_FACE_AU_DANGER':
      return <FaireFaceAuDanger {...props} />;
    default:
      return null;
  }
}
