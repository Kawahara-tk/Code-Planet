import { ReactNode } from 'react';
import styles from './CipherProgress.module.css';

interface CipherItem {
  name: string;
  icon: ReactNode;
  progress: number;
  color: string;
}

interface CipherProgressProps {
  items: CipherItem[];
  titleIcon: ReactNode;
}

export function CipherProgress({ items, titleIcon }: CipherProgressProps) {
  return (
    <section className={styles.progressSection}>
      <h2 className={styles.progressTitle}>
        <span className={styles.progressTitleIcon}>{titleIcon}</span>
        マスター進捗
      </h2>
      <div className={styles.progressList}>
        {items.map((cipher) => (
          <div key={cipher.name} className={styles.progressItem}>
            <div 
              className={styles.progressIcon}
              style={{ background: cipher.color }}
            >
              {cipher.icon}
            </div>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressLabel}>
                <span className={styles.progressName}>{cipher.name}</span>
                <span className={styles.progressPercent}>{cipher.progress}%</span>
              </div>
              <div className={styles.progressBarBg}>
                <div 
                  className={styles.progressBarFill}
                  style={{ 
                    width: `${cipher.progress}%`,
                    background: cipher.color 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
