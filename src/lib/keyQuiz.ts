// キー問題の型と生成ロジック

export type KeyQuizType = 'binary' | 'addition' | 'subtraction' | 'multiplication';

export interface KeyQuiz {
  type: KeyQuizType;
  question: string;
  answer: number;
}

/**
 * 指定されたキーに対する計算問題を生成
 */
export function generateKeyQuiz(targetKey: number): KeyQuiz {
  const types: KeyQuizType[] = ['binary', 'addition', 'subtraction', 'multiplication'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  switch (type) {
    case 'binary': {
      const binary = targetKey.toString(2);
      return {
        type: 'binary',
        question: `2進数「${binary}」= 10進数で`,
        answer: targetKey,
      };
    }
    case 'addition': {
      const a = Math.floor(Math.random() * targetKey);
      const b = targetKey - a;
      return {
        type: 'addition',
        question: `${a} + ${b} =`,
        answer: targetKey,
      };
    }
    case 'subtraction': {
      const bigger = targetKey + Math.floor(Math.random() * 10) + 1;
      const smaller = bigger - targetKey;
      return {
        type: 'subtraction',
        question: `${bigger} - ${smaller} =`,
        answer: targetKey,
      };
    }
    case 'multiplication': {
      if (targetKey === 1) {
        return {
          type: 'multiplication',
          question: `1 × 1 =`,
          answer: 1,
        };
      }
      const divisors: number[] = [];
      for (let i = 1; i <= targetKey; i++) {
        if (targetKey % i === 0) divisors.push(i);
      }
      const divisor = divisors[Math.floor(Math.random() * divisors.length)];
      const other = targetKey / divisor;
      return {
        type: 'multiplication',
        question: `${divisor} × ${other} =`,
        answer: targetKey,
      };
    }
  }
}
