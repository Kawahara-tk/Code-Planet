export const MORSE_CODE_MAP: { [key: string]: string } = {
  // Hiragana
  'あ': '－－・－－', 'い': '・－', 'う': '・・－', 'え': '－・－－－', 'お': '・－・・・',
  'か': '・－・・', 'き': '－・－・・', 'く': '・・・－', 'け': '－・－－', 'こ': '－－－－',
  'さ': '－・－・－', 'し': '－－・－・', 'す': '－－－・－', 'せ': '・－－－・', 'そ': '－－－・',
  'た': '－・', 'ち': '・・－・', 'つ': '・－・', 'て': '・－・－－', 'と': '・・－・・',
  'な': '・－・', 'に': '－・－・', 'ぬ': '・・・・', 'ね': '－－・－', 'の': '・・－－',
  'は': '－・・・', 'ひ': '－－・・－', 'ふ': '－－・・', 'へ': '・', 'ほ': '－・・',
  'ま': '－・・－', 'み': '・・－・－', 'む': '－', 'め': '－・・・－', 'も': '－・・－・',
  'や': '・－－', 'ゆ': '－・・－－', 'よ': '－－',
  'ら': '・・・', 'り': '－－・', 'る': '－・－－・', 'れ': '－－－', 'ろ': '・－・－',
  'わ': '－・－', 'を': '・－－－', 'ん': '・－・－・',
  
  // Dakuten (represented as separate char in Japanese Morse often, 
  // but standard usually puts dakuten after the char: "か" + "゛" = "が")
  '゛': '・・', '゜': '・・－－・',

  // Small characters (same as normal usually in displayed mapping for simplicity or specific map)
  // For simplicity in this game, we might map small chars to normal chars or handle them.
  // Standard Japanese Morse has no distinction for small chars except context, 
  // but let's map them to normal for the chart or keep simple.
  'ぁ': '－－・－－', 'ぃ': '・－', 'ぅ': '・・－', 'ぇ': '－・－－－', 'ぉ': '・－・・・',
  'っ': '・－・', 'ゃ': '・－－', 'ゅ': '－・・－－', 'ょ': '－－',
};

export function toMorseCode(text: string): string {
  return text.split('').map(char => {
    // Check direct map
    if (MORSE_CODE_MAP[char]) return MORSE_CODE_MAP[char];
    
    // Normalize or handle dakuten if needed. 
    // This is a simplified version. A full version would decompose "が" to "か" + "゛".
    // For now, let's just assume simple hiragana or return char if unknown.
    return char;
  }).join('  '); // Double space between characters
}
