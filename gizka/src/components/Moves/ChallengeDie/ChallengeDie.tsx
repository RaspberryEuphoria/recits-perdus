import * as Styled from './styled';

export function ChallengeDie({
  value,
  score,
  isBurned,
}: {
  isBurned: boolean;
  value: number;
  score: number;
}) {
  const isSuccess = value < score;

  return (
    <Styled.ChallengeDie>
      {value}
      <Styled.ChallengeResult isSucces={isSuccess} isSavedByBurn={isBurned} />
    </Styled.ChallengeDie>
  );
}
