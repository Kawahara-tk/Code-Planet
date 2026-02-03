// アナグラム用ユーティリティ

/**
 * 文字列をランダムにシャッフル
 * 元の文字列と同じにならないように再帰処理
 */
export function shuffleString(str: string): string {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const shuffled = arr.join('');
  
  // 元と同じにならないようにする
  if (shuffled === str && str.length > 1) {
    return shuffleString(str);
  }
  return shuffled;
}
