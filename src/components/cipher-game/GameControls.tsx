import { Difficulty, CipherType } from '@/lib/types';
import styles from './GameControls.module.css';
import { KeyIcon, ShuffleIcon, BrailleIcon, SignalIcon } from '@/components/icons';

interface GameControlsProps {
  cipherType: CipherType;
  difficulty: Difficulty;
  onCipherTypeChange: (type: CipherType) => void;
  onDifficultyChange: (diff: Difficulty) => void;
  readOnly?: boolean;
}

export function GameControls({
  cipherType,
  difficulty,
  onCipherTypeChange,
  onDifficultyChange,
  readOnly = false,
}: GameControlsProps) {

  const CIPHER_OPTIONS: { value: CipherType; label: string; icon: React.ReactNode; color: string }[] = [
      { value: 'caesar', label: 'シーザー暗号', icon: <KeyIcon />, color: '#5c7cfa' },
      { value: 'anagram', label: 'アナグラム', icon: <ShuffleIcon />, color: '#ff6b9d' },
      { value: 'braille', label: '点字', icon: <BrailleIcon />, color: '#ffa94d' },
      { value: 'morse', label: 'モールス', icon: <SignalIcon />, color: '#22b8cf' },
  ];

  const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; sub: string }[] = [
      { value: 'word', label: '単語', sub: '簡単' },
      { value: 'short', label: '短文', sub: '普通' },
      { value: 'long', label: '長文', sub: '難しい' },
  ];

  return (
    <div className={styles.controls} data-readonly={readOnly}>
      <div className={styles.controlGroup}>
        <label className={styles.label}>暗号の種類</label>
        <div className={styles.radioGrid}>
            {CIPHER_OPTIONS.map((option) => (
                <div 
                    key={option.value}
                    className={styles.radioButton}
                    data-active={cipherType === option.value}
                    onClick={() => !readOnly && onCipherTypeChange(option.value)}
                    style={{ '--color-primary': option.color, '--color-primary-light': `${option.color}22`, '--color-primary-text': option.color } as React.CSSProperties}
                >
                    <div className={styles.iconWrapper}>
                        {option.icon}
                    </div>
                    <span className={styles.radioLabel}>{option.label}</span>
                </div>
            ))}
        </div>
      </div>

      <div className={styles.controlGroup}>
        <label className={styles.label}>難易度</label>
        <div className={styles.radioGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {DIFFICULTY_OPTIONS.map((option) => (
                <div 
                    key={option.value}
                    className={styles.radioButton}
                    data-active={difficulty === option.value}
                    onClick={() => !readOnly && onDifficultyChange(option.value)}
                    style={{ padding: '10px 5px' }}
                >
                    <span className={styles.radioLabel}>{option.label}</span>
                    <span className={styles.radioSubLabel}>{option.sub}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
