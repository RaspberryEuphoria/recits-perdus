import { useTranslations } from 'next-intl';

import { Keyword } from '@/components/DesignSystem/Keyword';

import * as Styled from './styled';

type MoveProgressProps = { progress: number; difficulty?: number };
type ChanceProps = { progress: number; difficulty: number };

// This is for backward compatibility with older moves
const fallbackDifficulty = 100;

export function MoveProgress({ progress, difficulty }: MoveProgressProps) {
  const t = useTranslations('moves');

  const moveDifficulty = difficulty ? difficulty * 10 : fallbackDifficulty;
  const currentValue = progress * 10;
  const remainingValue = moveDifficulty - currentValue;

  return (
    <Styled.MoveProgress>
      <Styled.Score>
        {t('progress-score')} {progress}
        <Styled.ProgressBar>
          <Styled.Progress width={Math.min(currentValue, moveDifficulty)} color="move" />
          <Styled.Progress width={remainingValue + 10} color="dark" />
        </Styled.ProgressBar>
      </Styled.Score>
      {difficulty && <Chances progress={progress} difficulty={difficulty} />}
    </Styled.MoveProgress>
  );
}

function Chances({ progress, difficulty }: ChanceProps) {
  const t = useTranslations('moves');

  /**
   * When progress === difficulty + 1, the success chances are 100%
   * To prevent weird math where the success chances are greater than 100%,
   * we cap the value to difficulty + 1.
   */
  const X = Math.min(progress, difficulty + 1);
  const Y = difficulty;

  // All dices greater than or equal to X
  const outcomeProbabilityForFailure = Math.pow((Y - X + 1) / Y, 2) * 100;

  /**
   * If failure is garanteed 100%, we don't need to calculate mixed chances,
   * because if two dices are 100% greater or equal to X,
   * then obviously one dice is also 100% greater or equal to X,
   * but the outcome can't be both a failure and a mixed result,
   * so we return 0% for mixed chances.
   */
  const outcomeProbabilityForMixed =
    outcomeProbabilityForFailure < 100
      ? // At least one die greater than or equal to X
        (1 - probabilityThatBothDicesRollLessThanX(X, Y)) * 100
      : 0;

  // Remaining probability equals success chances
  const outcomeProbabilityForSuccess = probabilityThatBothDicesRollLessThanX(X, Y) * 100;

  return (
    <Styled.Chances>
      <Keyword stat="move">{t('METTRE_FIN_AU_COMBAT.name')}</Keyword> :{' '}
      <Styled.Success>{Math.round(outcomeProbabilityForSuccess)}%</Styled.Success> /{' '}
      <Styled.Mixed>{Math.round(outcomeProbabilityForMixed)}%</Styled.Mixed> /{' '}
      <Styled.Failure>{Math.round(outcomeProbabilityForFailure)}%</Styled.Failure>
    </Styled.Chances>
  );
}

function probabilityThatBothDicesRollLessThanX(minForFailure: number, maxPossible: number) {
  const probOneDie = (minForFailure - 1) / maxPossible; // for 1d6, those are values 1-4
  const probability = probOneDie * probOneDie;
  return probability;
}
