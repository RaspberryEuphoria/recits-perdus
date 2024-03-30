import { useTranslations } from 'next-intl';

import * as Styled from './styled';

type MoveProgressProps = { progress: number };

export function MoveProgress({ progress }: MoveProgressProps) {
  const t = useTranslations('moves');
  const currentValue = Math.min(progress * 10, 100);
  const remainingValue = 100 - currentValue;

  return (
    <Styled.MoveProgress>
      {t('progress-score')} : {progress}
      <Styled.ProgressBar>
        <Styled.Progress width={currentValue} color="move" />
        <Styled.Progress width={remainingValue} color="dark" />
      </Styled.ProgressBar>
    </Styled.MoveProgress>
  );
}
