export const DAKUTEN_MAP: { [key: string]: string } = {
  'が': 'か', 'ぎ': 'き', 'ぐ': 'く', 'げ': 'け', 'ご': 'こ',
  'ざ': 'さ', 'じ': 'し', 'ず': 'す', 'ぜ': 'せ', 'ぞ': 'そ',
  'だ': 'た', 'ぢ': 'ち', 'づ': 'つ', 'で': 'て', 'ど': 'と',
  'ば': 'は', 'び': 'ひ', 'ぶ': 'ふ', 'べ': 'へ', 'ぼ': 'ほ',
  'ゔ': 'う',
};

export const HANDAKUTEN_MAP: { [key: string]: string } = {
  'ぱ': 'は', 'ぴ': 'ひ', 'ぷ': 'ふ', 'ぺ': 'へ', 'ぽ': 'ほ',
};

// 拗音（点4）、拗濁音（点4,5）、拗半濁音（点4,6）の記号
export const DAKUTEN_MARKER = 'ﾞ';   // 点5
export const HANDAKUTEN_MARKER = 'ﾟ'; // 点6
export const YOON_MARKER = '､';       // 点4
export const YOON_DAKUTEN_MARKER = '｡'; // 点4,5
export const YOON_HANDAKUTEN_MARKER = '≠'; // 点4,6 (46表記)
export const LONG_VOWEL_MARKER = '｢'; // 点3,6 (36表記)

/**
 * 拗音のベースとなる文字へのマッピング
 * きゃ -> 点4 + か
 * ぎゃ -> 点4,5 + か
 */
const YOON_BASE_MAP: { [key: string]: { base: string, voicing: 'none' | 'dakuten' | 'handakuten' } } = {
  'き': { base: 'か', voicing: 'none' },
  'し': { base: 'さ', voicing: 'none' },
  'ち': { base: 'た', voicing: 'none' },
  'に': { base: 'な', voicing: 'none' },
  'ひ': { base: 'は', voicing: 'none' },
  'み': { base: 'ま', voicing: 'none' },
  'り': { base: 'ら', voicing: 'none' },
  'ぎ': { base: 'か', voicing: 'dakuten' },
  'じ': { base: 'さ', voicing: 'dakuten' },
  'ぢ': { base: 'た', voicing: 'dakuten' },
  'び': { base: 'は', voicing: 'dakuten' },
  'ぴ': { base: 'は', voicing: 'handakuten' },
};

const YOON_VOWEL_MAP: { [key: string]: string } = {
  'ゃ': 'あ',
  'ゅ': 'う',
  'ょ': 'お',
};

// あ・う・お の各行の文字を取得するための変換テーブル
const ROW_VOWEL_MAP: { [key: string]: { [key: string]: string } } = {
  'か': { 'あ': 'か', 'う': 'く', 'お': 'こ' },
  'さ': { 'あ': 'さ', 'う': 'す', 'お': 'そ' },
  'た': { 'あ': 'た', 'う': 'つ', 'お': 'と' },
  'な': { 'あ': 'な', 'う': 'ぬ', 'お': 'の' },
  'は': { 'あ': 'は', 'う': 'ふ', 'お': 'ほ' },
  'ま': { 'あ': 'ま', 'う': 'む', 'お': 'も' },
  'ら': { 'あ': 'ら', 'う': 'る', 'お': 'ろ' },
};

/**
 * 拗音・濁音・半濁音を含む文字列を点字フォント形式に変換します。
 */
export function preprocessBraille(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === 'ー') {
      result += LONG_VOWEL_MARKER;
      continue;
    }

    const nextChar = text[i + 1];

    // 拗音のチェック
    if (nextChar && YOON_VOWEL_MAP[nextChar] && YOON_BASE_MAP[char]) {
      const info = YOON_BASE_MAP[char];
      const vowel = YOON_VOWEL_MAP[nextChar];
      const baseKana = ROW_VOWEL_MAP[info.base][vowel];
      
      if (info.voicing === 'none') {
        result += YOON_MARKER + baseKana;
      } else if (info.voicing === 'dakuten') {
        result += YOON_DAKUTEN_MARKER + baseKana;
      } else if (info.voicing === 'handakuten') {
        result += YOON_HANDAKUTEN_MARKER + baseKana;
      }
      i++; // ゃ/ゅ/ょをスキップ
      continue;
    }

    // 濁音・半濁音のチェック
    if (DAKUTEN_MAP[char]) {
      result += DAKUTEN_MARKER + DAKUTEN_MAP[char];
    } else if (HANDAKUTEN_MAP[char]) {
      result += HANDAKUTEN_MARKER + HANDAKUTEN_MAP[char];
    } else {
      result += char;
    }
  }
  return result;
}
