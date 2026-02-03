export const KATAKANA_CHARS = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヲ', 'ン',
];

const KATAKANA_NORMALIZATION: { [key: string]: string } = {
  // Katakana Dakuten/Handakuten
  'ガ': 'カ', 'ギ': 'キ', 'グ': 'ク', 'ゲ': 'ケ', 'ゴ': 'コ',
  'ザ': 'サ', 'ジ': 'シ', 'ズ': 'ス', 'ゼ': 'セ', 'ゾ': 'ソ',
  'ダ': 'タ', 'ヂ': 'チ', 'ヅ': 'ツ', 'デ': 'テ', 'ド': 'ト',
  'バ': 'ハ', 'ビ': 'ヒ', 'ブ': 'フ', 'ベ': 'ヘ', 'ボ': 'ホ',
  'ヴ': 'ウ',
  'パ': 'ハ', 'ピ': 'ヒ', 'プ': 'フ', 'ペ': 'ヘ', 'ポ': 'ホ',
};

/**
 * Returns the IDs (1-46) of the katakana character.
 * Normalizes dakuten/handakuten.
 */
export function getKatakanaId(char: string): number | null {
  const normalized = KATAKANA_NORMALIZATION[char] || char;
  const index = KATAKANA_CHARS.indexOf(normalized);
  return index !== -1 ? index + 1 : null;
}

/**
 * Returns the katakana character from an ID (1-46).
 */
export function getKatakanaFromId(id: number): string | null {
  if (id < 1 || id > KATAKANA_CHARS.length) return null;
  return KATAKANA_CHARS[id - 1];
}
