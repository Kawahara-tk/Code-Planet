export const ALPHABET_CHARS = [
  'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z'
];

const ALPHABET_NORMALIZATION: { [key: string]: string } = {
  // Alphabet (Normalize uppercase to lowercase)
  'A': 'a', 'B': 'b', 'C': 'c', 'D': 'd', 'E': 'e',
  'F': 'f', 'G': 'g', 'H': 'h', 'I': 'i', 'J': 'j',
  'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'O': 'o',
  'P': 'p', 'Q': 'q', 'R': 'r', 'S': 's', 'T': 't',
  'U': 'u', 'V': 'v', 'W': 'w', 'X': 'x', 'Y': 'y', 'Z': 'z',
};

/**
 * Returns the IDs (1-26) of the alphabet character.
 * Normalizes uppercase to lowercase.
 */
export function getAlphabetId(char: string): number | null {
  const normalized = ALPHABET_NORMALIZATION[char] || char;
  const index = ALPHABET_CHARS.indexOf(normalized);
  return index !== -1 ? index + 1 : null;
}

/**
 * Returns the alphabet character from an ID (1-26).
 */
export function getAlphabetFromId(id: number): string | null {
  if (id < 1 || id > ALPHABET_CHARS.length) return null;
  return ALPHABET_CHARS[id - 1];
}
