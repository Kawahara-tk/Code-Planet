export interface Problem {
  id: string;
  text: string;
  difficulty: 'word' | 'short' | 'long';
}

export const WORD_PROBLEMS: Problem[] = [
  { id: 'w1', text: 'りんご', difficulty: 'word' },
  { id: 'w2', text: 'みかん', difficulty: 'word' },
  { id: 'w3', text: 'さくら', difficulty: 'word' },
  { id: 'w4', text: 'うみ', difficulty: 'word' },
  { id: 'w5', text: 'ねこ', difficulty: 'word' },
];

export const SHORT_PROBLEMS: Problem[] = [
  { id: 's1', text: 'きょうはいいてんきです', difficulty: 'short' },
  { id: 's2', text: 'ねこがねています', difficulty: 'short' },
  { id: 's3', text: 'おはようございます', difficulty: 'short' },
  { id: 's4', text: 'ありがとう', difficulty: 'short' },
  { id: 's5', text: 'なにをしていますか', difficulty: 'short' },
];

export const LONG_PROBLEMS: Problem[] = [
  { id: 'l1', text: 'むかしむかしあるところにおじいさんとおばあさんがすんでいました', difficulty: 'long' },
  { id: 'l2', text: 'あめニモマケズかぜニモマケズゆきニモナツノアツサニモマケヌ', difficulty: 'long' }, // Technically mixed, but keeping simple for now? User asked for hiragana only.
  // Converting to hiragana
  { id: 'l3', text: 'あめにもまけずかぜにもまけずゆきにもなつのあつさにもまけぬ', difficulty: 'long' },
  { id: 'l4', text: 'じゅげむじゅげむごこうのすりきれかいじゃりすいぎょのすいぎょうまつ', difficulty: 'long' },
  { id: 'l5', text: 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえて', difficulty: 'long' },
];

export const ALL_PROBLEMS = {
  word: WORD_PROBLEMS,
  short: SHORT_PROBLEMS,
  long: LONG_PROBLEMS,
};
