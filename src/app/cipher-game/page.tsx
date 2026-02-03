"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { applyCaesarCipher } from "@/lib/cipher";
import { ALL_PROBLEMS, Problem } from "@/lib/problems";
import { Difficulty, CipherType, Score, Feedback } from "@/lib/types";
import { KeyQuiz, generateKeyQuiz } from "@/lib/keyQuiz";
import { shuffleString } from "@/lib/anagram";
import { KeyIcon, ShuffleIcon, ArrowBackIcon } from "@/components/icons";
import { ScoreDisplay, KeyQuizDisplay, GameControls, GameArea, ReferenceTable } from "@/components/cipher-game";
import { DraggablePopup } from "@/components/common/DraggablePopup";
import styles from "./page.module.css";

import { useSearchParams } from "next/navigation";
import { toMorseCode } from "@/lib/mappings/morse";
import { Suspense } from "react";

function CipherGameContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const isChallengeMode = mode === 'challenge' || mode === 'daily'; 
  
  const [difficulty, setDifficulty] = useState<Difficulty>('word');
  const [cipherType, setCipherType] = useState<CipherType>('caesar');
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // If not challenge mode, setup is always "complete" (or ignored)
  useEffect(() => {
      if (mode !== 'challenge') {
          setIsSetupComplete(true);
      } else {
          setIsSetupComplete(false);
      }
  }, [mode]);

  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });
  
  // シーザー暗号用
  const [cipherKey, setCipherKey] = useState(1);
  const [keyQuiz, setKeyQuiz] = useState<KeyQuiz | null>(null);
  const [showKeyAnswer, setShowKeyAnswer] = useState(false);
  
  // アナグラム用
  const [shuffledText, setShuffledText] = useState("");

  // 選択された文字（メモの表でフォーカスするため）
  const [selectedChar, setSelectedChar] = useState<string | undefined>(undefined);

  // 問題を読み込む
  const loadNewProblem = (diff: Difficulty, type: CipherType) => {
    const problems = ALL_PROBLEMS[diff];
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    setCurrentProblem(randomProblem);
    setUserInput("");
    setFeedback(null);
    setShowKeyAnswer(false);
    setSelectedChar(undefined);
    
    if (type === 'caesar') {
      const newKey = Math.floor(Math.random() * 5) + 1;
      setCipherKey(newKey);
      setKeyQuiz(generateKeyQuiz(newKey));
    } else if (type === 'anagram') {
      setShuffledText(shuffleString(randomProblem.text));
    }
    // Braille and Morse don't need extra state, handled in render
  };

  // 初期問題 (Only if setup is complete or not challenge mode)
  useEffect(() => {
    if (mode !== 'challenge' || isSetupComplete) {
        loadNewProblem(difficulty, cipherType);
    }
  }, [isSetupComplete]); 
  
  // Normal mode: reload on diff/type change
  useEffect(() => {
    if (mode !== 'challenge') {
      loadNewProblem(difficulty, cipherType);
    }
  }, [difficulty, cipherType, mode]);


  // 回答チェック
  const checkAnswer = () => {
    if (!currentProblem) return;
    setScore(prev => ({ ...prev, total: prev.total + 1 }));

    if (userInput.trim() === currentProblem.text) {
      setFeedback({ type: 'success', message: '正解！' });
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setFeedback({ type: 'error', message: '不正解。もう一度！' });
    }
  };

  const handleNext = () => loadNewProblem(difficulty, cipherType);

  const handleCharSelect = (char: string) => {
    setSelectedChar(char);
    setShowPopup(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      feedback?.type === 'success' ? handleNext() : checkAnswer();
    }
  };

  // 表示するテキスト
  const displayedText = currentProblem 
    ? (cipherType === 'caesar' 
        ? applyCaesarCipher(currentProblem.text, cipherKey)
        : cipherType === 'anagram' 
            ? shuffledText 
            : cipherType === 'morse'
                ? toMorseCode(currentProblem.text)
                : currentProblem.text) // Braille handles text directly in renderer
    : "";

  // 入力ヒント
  const inputHint = cipherType === 'caesar'
    ? (showKeyAnswer ? `キー「${cipherKey}」で解読して入力` : '計算問題を解いてキーを見つけよう！')
    : cipherType === 'anagram' ? '並べ替えて元の言葉を入力'
    : cipherType === 'braille' ? '点字を解読して入力'
    : 'モールス信号を解読して入力';


  // ポップアップ用
  const [showPopup, setShowPopup] = useState(false);

  // Challenge Mode Setup Screen
  if (mode === 'challenge' && !isSetupComplete) {
      return (
        <main className={styles.main} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className={styles.card} style={{ width: '100%', maxWidth: 'none', flexDirection: 'column', padding: '20px', background: 'transparent', boxShadow: 'none', border: 'none' }}>
                <div className={styles.setupContainer}>
                    <div className={styles.setupLeft}>
                         <h1 className={styles.title} style={{ marginBottom: '10px', fontSize: '24px' }}>チャレンジ設定</h1>
                         <p style={{ marginBottom: '20px', color: '#888' }}>挑戦する暗号と難易度を選んでください</p>
                         
                         <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <GameControls
                                cipherType={cipherType}
                                difficulty={difficulty}
                                onCipherTypeChange={setCipherType}
                                onDifficultyChange={setDifficulty}
                            />
                         </div>
                    </div>
                    
                    <div className={styles.setupRight}>
                         <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>選択中の設定</h2>
                         <div style={{ marginBottom: '20px', padding: '15px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                            <p style={{ marginBottom: '5px' }}><strong>種類:</strong> {cipherType === 'caesar' ? 'シーザー暗号' : cipherType === 'anagram' ? 'アナグラム' : cipherType === 'braille' ? '点字' : 'モールス信号'}</p>
                            <p><strong>難易度:</strong> {difficulty === 'word' ? '単語 (簡単)' : difficulty === 'short' ? '短文 (普通)' : '長文 (難しい)'}</p>
                         </div>
                         
                        <button 
                            onClick={() => {
                                setIsSetupComplete(true);
                                loadNewProblem(difficulty, cipherType);
                            }}
                            style={{
                                padding: '16px',
                                background: 'var(--color-primary)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                width: '100%',
                                fontSize: '16px',
                                boxShadow: '0 4px 12px rgba(23, 162, 184, 0.4)'
                            }}
                        >
                            ゲームスタート
                        </button>
                        
                         <Link href="/" className={styles.backLink} style={{ position: 'static', marginTop: '20px', border: 'none', background: 'transparent', justifyContent: 'center' }}>
                            キャンセルして戻る
                        </Link>
                    </div>
                </div>
            </div>
        </main>
      );
  }

  return (
    <main className={styles.main}>
      {/* ヘッダー */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            {cipherType === 'caesar' ? <KeyIcon /> : <ShuffleIcon />} 
          </div>
          <h1 className={styles.title}>
            {cipherType === 'caesar' ? '暗号解読' : cipherType === 'anagram' ? 'アナグラム' : cipherType === 'braille' ? '点字解読' : 'モールス信号'}
          </h1>
        </div>
        <p className={styles.headerSubtitle}>
          {cipherType === 'caesar' ? 'シーザー暗号を解読しよう' 
            : cipherType === 'anagram' ? '文字を並べ替えて元の言葉を当てよう'
            : cipherType === 'braille' ? '点字を読んで言葉を当てよう'
            : 'モールス信号を解読しよう'}
        </p>
      </header>

      <div className={styles.card}>
        <div className={styles.leftPanel}>
          <ScoreDisplay score={score} />

          <GameControls
            cipherType={cipherType}
            difficulty={difficulty}
            onCipherTypeChange={setCipherType}
            onDifficultyChange={setDifficulty}
            readOnly={mode === 'challenge'} 
          />

          {cipherType === 'caesar' && keyQuiz && (
            <KeyQuizDisplay
              keyQuiz={keyQuiz}
              showAnswer={showKeyAnswer}
              onShowAnswer={() => setShowKeyAnswer(true)}
            />
          )}

          <div style={{ marginTop: '10px' }}>
            <button 
              onClick={() => setShowPopup(true)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--bg-card-hover, #333)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '16px' }}>📝</span>
              <span>メモを開く</span>
            </button>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <GameArea
            cipherType={cipherType}
            displayedText={displayedText}
            originalText={currentProblem?.text}
            onCharSelect={handleCharSelect}
            userInput={userInput}
            onInputChange={setUserInput}
            onKeyDown={handleKeyDown}
            inputHint={inputHint}
            feedback={feedback}
            onSubmit={checkAnswer}
            onNext={handleNext}
          />
        </div>
      </div>

      {/* 戻るリンク */}
      <Link href="/" className={styles.backLink}>
        <span className={styles.backLinkIcon}><ArrowBackIcon /></span>
        ホームに戻る
      </Link>

      {showPopup && (
        <DraggablePopup 
            title="五十音・点字・モールス" 
            onClose={() => setShowPopup(false)}
        >
            <ReferenceTable 
              focusedChar={selectedChar} 
              cipherType={cipherType} 
            />
        </DraggablePopup>
      )}
    </main>
  );
}

export default function CipherGame() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CipherGameContent />
    </Suspense>
  );
}
