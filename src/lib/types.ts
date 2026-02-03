// 共通の型定義

export type Difficulty = 'word' | 'short' | 'long';
export type CipherType = 'caesar' | 'anagram' | 'braille' | 'morse';

export interface Score {
  correct: number;
  total: number;
}

export interface Feedback {
  type: 'success' | 'error';
  message: string;
}
