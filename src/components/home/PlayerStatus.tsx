import { ReactNode } from 'react';
import styles from './PlayerStatus.module.css';

interface PlayerStatusProps {
  level: number;
  currentExp: number;
  nextLevelExp: number;
  starIcon: ReactNode;
}

export function PlayerStatus({ level, currentExp, nextLevelExp, starIcon }: PlayerStatusProps) {
  const expPercent = (currentExp / nextLevelExp) * 100;

  return (
    <section className={styles.playerStatus}>
      <div className={styles.statusRow}>
        <div className={styles.levelBadge}>
          <span className={styles.levelIcon}>{starIcon}</span>
          <span>Lv.{level}</span>
        </div>
        <div className={styles.expContainer}>
          <div className={styles.expLabel}>
            <span>けいけんち</span>
            <span>{currentExp} / {nextLevelExp}</span>
          </div>
          <div className={styles.expBar}>
            <div 
              className={styles.expFill} 
              style={{ width: `${expPercent}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
