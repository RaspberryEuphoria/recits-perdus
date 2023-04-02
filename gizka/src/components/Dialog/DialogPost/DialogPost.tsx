import { TextColor } from '@/utils/constants';
import styles from './DialogPost.module.css';

type DialogPostProps = {
  character?: any;
  content: string;
  isGameMaster?: boolean;
};

export function DialogPost({ character, content, isGameMaster }: DialogPostProps) {
  return (
    <p className={styles.dialogPost}>
      {character && (
        <span
          className={styles.author}
          style={{ color: isGameMaster ? TextColor.GameMaster : character.textColor }}
        >
          {isGameMaster ? 'Maître du jeu' : character.name}
        </span>
      )}
      <span dangerouslySetInnerHTML={{ __html: content }} />
    </p>
  );
}
