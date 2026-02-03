import { getHiraganaId, HIRAGANA_CHARS } from './mappings/hiragana';
import { getKatakanaId, KATAKANA_CHARS } from './mappings/katakana';
import { getAlphabetId, ALPHABET_CHARS } from './mappings/alphabet';

export function getCharacterInfo(char: string): { type: 'hiragana'|'katakana'|'alphabet'|'other', id: number|null } {
  const hId = getHiraganaId(char);
  if (hId !== null) return { type: 'hiragana', id: hId };
  
  const kId = getKatakanaId(char);
  if (kId !== null) return { type: 'katakana', id: kId };

  const aId = getAlphabetId(char);
  if (aId !== null) return { type: 'alphabet', id: aId };

  return { type: 'other', id: null };
}

export function applyCaesarCipher(text: string, shift: number): string {
  return text.split('').map(char => {
    const info = getCharacterInfo(char);
    
    if (info.type === 'other' || info.id === null) return char;

    let charsList: string[] = [];
    if (info.type === 'hiragana') charsList = HIRAGANA_CHARS;
    else if (info.type === 'katakana') charsList = KATAKANA_CHARS;
    else if (info.type === 'alphabet') charsList = ALPHABET_CHARS;

    const total = charsList.length;
    let newIndex = (info.id - 1 + shift) % total;
    
    if (newIndex < 0) newIndex += total;
    
    return charsList[newIndex];
  }).join('');
}
