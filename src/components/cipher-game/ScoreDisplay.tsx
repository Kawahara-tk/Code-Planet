import { Score } from '@/lib/types';
import styles from './ScoreDisplay.module.css';

interface ScoreDisplayProps {
  score: Score;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const accuracy = score.total > 0 
    ? Math.round((score.correct / score.total) * 100) 
    : 0;

  return (
    <div className={styles.scoreDisplay}>
      <div className={styles.scoreItem}>
        <span className={styles.scoreValue}>{score.correct}</span>
        <span className={styles.scoreLabel}>正解</span>
      </div>
      <div className={styles.scoreItem}>
        <span className={styles.scoreValue}>{score.total}</span>
        <span className={styles.scoreLabel}>挑戦</span>
      </div>
      <div className={styles.scoreItem}>
        <span className={styles.scoreValue}>{accuracy}%</span>
        <span className={styles.scoreLabel}>正答率</span>
      </div>
    </div>
  );
}
