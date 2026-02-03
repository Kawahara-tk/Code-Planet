import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './StageCard.module.css';

interface StageCardProps {
  href: string;
  icon: ReactNode;
  iconStyle: 'story' | 'daily' | 'challenge';
  title: string;
  description: string;
  stars?: { total: number; active: number };
  starIcon?: ReactNode;
  arrowIcon: ReactNode;
}

export function StageCard({
  href,
  icon,
  iconStyle,
  title,
  description,
  stars,
  starIcon,
  arrowIcon,
}: StageCardProps) {
  const iconStyleClass = {
    story: styles.stageIconStory,
    daily: styles.stageIconDaily,
    challenge: styles.stageIconChallenge,
  }[iconStyle];

  return (
    <Link href={href} className={styles.stageCard}>
      <div className={`${styles.stageIconWrapper} ${iconStyleClass}`}>
        {icon}
      </div>
      <div className={styles.stageInfo}>
        <h3 className={styles.stageName}>{title}</h3>
        <p className={styles.stageDesc}>{description}</p>
        {stars && starIcon && (
          <div className={styles.stageProgress}>
            {Array.from({ length: stars.total }, (_, i) => (
              <span 
                key={i}
                className={`${styles.progressStar} ${i < stars.active ? styles.progressStarActive : styles.progressStarInactive}`}
              >
                {starIcon}
              </span>
            ))}
          </div>
        )}
      </div>
      <span className={styles.stageArrow}>{arrowIcon}</span>
    </Link>
  );
}
