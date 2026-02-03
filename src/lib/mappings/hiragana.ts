export const HIRAGANA_CHARS = [
  'あ', 'い', 'う', 'え', 'お',
  'か', 'き', 'く', 'け', 'こ',
  'さ', 'し', 'す', 'せ', 'そ',
  'た', 'ち', 'つ', 'て', 'と',
  'な', 'に', 'ぬ', 'ね', 'の',
  'は', 'ひ', 'ふ', 'へ', 'ほ',
  'ま', 'み', 'む', 'め', 'も',
  'や', 'ゆ', 'よ',
  'ら', 'り', 'る', 'れ', 'ろ',
  'わ', 'を', 'ん',
];

const HIRAGANA_NORMALIZATION: { [key: string]: string } = {
  // 濁点
  'が': 'か', 'ぎ': 'き', 'ぐ': 'く', 'げ': 'け', 'ご': 'こ',
  'ざ': 'さ', 'じ': 'し', 'ず': 'す', 'ぜ': 'せ', 'ぞ': 'そ',
  'だ': 'た', 'ぢ': 'ち', 'づ': 'つ', 'で': 'て', 'ど': 'と',
  'ば': 'は', 'び': 'ひ', 'ぶ': 'ふ', 'べ': 'へ', 'ぼ': 'ほ',
  'ゔ': 'う',
  
  // 半濁点
  'ぱ': 'は', 'ぴ': 'ひ', 'ぷ': 'ふ', 'ぺ': 'へ', 'ぽ': 'ほ',
};

/**
 * Returns the IDs (1-46) of the hiragana character.
 * Normalizes dakuten/handakuten.
 */
export function getHiraganaId(char: string): number | null {
  const normalized = HIRAGANA_NORMALIZATION[char] || char;
  const index = HIRAGANA_CHARS.indexOf(normalized);
  return index !== -1 ? index + 1 : null;
}

/**
 * Returns the hiragana character from an ID (1-46).
 */
export function getHiraganaFromId(id: number): string | null {
  if (id < 1 || id > HIRAGANA_CHARS.length) return null;
  return HIRAGANA_CHARS[id - 1];
}
