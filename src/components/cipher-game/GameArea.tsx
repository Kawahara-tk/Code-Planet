import React from 'react';
import { Feedback, CipherType } from '@/lib/types';
import { SpecialText } from '@/components/SpecialText';
import { MORSE_CODE_MAP } from '@/lib/mappings/morse';
import styles from './GameArea.module.css';

interface GameAreaProps {
  cipherType: CipherType;
  displayedText: string;
  originalText?: string;
  onCharSelect?: (char: string) => void;
  userInput: string;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputHint: string;
  feedback: Feedback | null;
  onSubmit: () => void;
  onNext: () => void;
}

export function GameArea({
  cipherType,
  displayedText,
  originalText = '',
  onCharSelect,
  userInput,
  onInputChange,
  onKeyDown,
  inputHint,
  feedback,
  onSubmit,
  onNext,
}: GameAreaProps) {
  const handleSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    if (cipherType === 'braille') {
      // 点字フォントの場合、表示されている文字そのものがひらがなに対応しているはず（フォントマジック）
      // もしくは originalText から位置を特定する
      // ここでは選択された「文字」が originalText の中に存在するか確認する
      if (originalText.includes(selectedText) && selectedText.length === 1) {
        onCharSelect?.(selectedText);
      }
    } else if (cipherType === 'morse') {
      // モールス信号の逆引き
      for (const [char, code] of Object.entries(MORSE_CODE_MAP)) {
        if (code === selectedText) {
          onCharSelect?.(char);
          break;
        }
      }
    }
  };

  const renderSelectableText = () => {
    if (cipherType === 'braille') {
      return (
        <div className={styles.problemText} onMouseUp={handleSelection}>
          <SpecialText variant="bnl">{displayedText}</SpecialText>
        </div>
      );
    }

    if (cipherType === 'morse') {
      return (
        <div className={styles.problemText} onMouseUp={handleSelection}>
          {displayedText}
        </div>
      );
    }

    return <p className={styles.problemText}>{displayedText}</p>;
  };

  return (
    <div className={styles.gameArea}>
      <div className={styles.problemBox}>
        {renderSelectableText()}
      </div>

      <div className={styles.inputWrapper}>
        <p className={styles.inputHint}>{inputHint}</p>
        <input
          type="text"
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          className={styles.inputArea}
          placeholder="ここに回答を入力..."
        />
      </div>

      {feedback && (
        <div className={`${styles.feedback} ${styles[feedback.type]}`}>
          {feedback.message}
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button onClick={onSubmit} className={styles.primaryButton}>
          回答する
        </button>
        <button onClick={onNext} className={styles.secondaryButton}>
          次の問題へ
        </button>
      </div>
    </div>
  );
}
