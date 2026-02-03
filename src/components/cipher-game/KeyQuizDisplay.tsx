import { KeyQuiz } from '@/lib/keyQuiz';
import styles from './KeyQuizDisplay.module.css';

interface KeyQuizDisplayProps {
  keyQuiz: KeyQuiz;
  showAnswer: boolean;
  onShowAnswer: () => void;
}

export function KeyQuizDisplay({ keyQuiz, showAnswer, onShowAnswer }: KeyQuizDisplayProps) {
  return (
    <div className={styles.keyDisplay}>
      <span className={styles.keyDisplayLabel}>
        シフトキー: {keyQuiz.question} {showAnswer ? (
          <strong>{keyQuiz.answer}</strong>
        ) : (
          <strong>???</strong>
        )}
      </span>
      {!showAnswer && (
        <button 
          onClick={onShowAnswer}
          className={styles.hintButton}
        >
          どうしても見る
        </button>
      )}
    </div>
  );
}
