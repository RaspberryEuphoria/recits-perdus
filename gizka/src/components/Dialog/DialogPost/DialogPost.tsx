import styles from './DialogPost.module.css';

type DialogPostProps = {
  character?: any;
  content: string;
};

export function DialogPost({ character, content }: DialogPostProps) {
  return (
    <p className={styles.dialogPost}>
      {character && (
        <span className={styles.author} style={{ color: character.color }}>
          {character.name}
        </span>
      )}
      {content}
    </p>
  );
}
