"use client";

import React, { useState } from 'react';
import styles from './ReferenceTable.module.css';
import { SpecialText } from '@/components/SpecialText';
import { toMorseCode } from '@/lib/mappings/morse';

const GOJUON_ROWS = [
  ['あ', 'い', 'う', 'え', 'お'],
  ['か', 'き', 'く', 'け', 'こ'],
  ['さ', 'し', 'す', 'せ', 'そ'],
  ['た', 'ち', 'つ', 'て', 'と'],
  ['な', 'に', 'ぬ', 'ね', 'の'],
  ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  ['ま', 'み', 'む', 'め', 'も'],
  ['や', '', 'ゆ', '', 'よ'],
  ['ら', 'り', 'る', 'れ', 'ろ'],
  ['わ', '', '', '', 'を'],
  ['ん', '', '', '', ''],
];

interface ReferenceTableProps {
    focusedChar?: string;
    cipherType?: string;
}

export const ReferenceTable = ({ focusedChar, cipherType }: ReferenceTableProps) => {
    const [activeTab, setActiveTab] = useState<'hiragana' | 'braille' | 'morse'>('hiragana');

    // 濁点・半濁点・小文字を清音に変換する簡易的な正規化
    const normalizeChar = (c: string | undefined): string | undefined => {
        if (!c) return undefined;
        const map: { [key: string]: string } = {
            'が': 'か', 'ぎ': 'き', 'ぐ': 'く', 'げ': 'け', 'ご': 'こ',
            'ざ': 'さ', 'じ': 'し', 'ず': 'す', 'ぜ': 'せ', 'ぞ': 'そ',
            'だ': 'た', 'ぢ': 'ち', 'づ': 'つ', 'で': 'て', 'ど': 'と',
            'ば': 'は', 'び': 'ひ', 'ぶ': 'ふ', 'べ': 'へ', 'ぼ': 'ほ',
            'ぱ': 'は', 'ぴ': 'ひ', 'ぷ': 'ふ', 'ぺ': 'へ', 'ぽ': 'ほ',
            'ぁ': 'あ', 'ぃ': 'い', 'ぅ': 'う', 'ぇ': 'え', 'ぉ': 'お',
            'っ': 'つ', 'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ',
        };
        return map[c] || c;
    };

    const normalizedFocusedChar = normalizeChar(focusedChar);

    // cipherTypeに基づいてタブを自動切り替え
    React.useEffect(() => {
        if (cipherType === 'braille') {
            setActiveTab('braille');
        } else if (cipherType === 'morse') {
            setActiveTab('morse');
        } else if (cipherType === 'caesar' || cipherType === 'anagram') {
            setActiveTab('hiragana');
        }
    }, [cipherType]);

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === 'hiragana' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('hiragana')}
                >
                    五十音
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'braille' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('braille')}
                >
                    点字
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'morse' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('morse')}
                >
                    モールス
                </button>
            </div>
            
            <div className={styles.content}>
                <div className={styles.tableContainer}>
                    {GOJUON_ROWS.map((column, colIdx) => (
                        <div key={colIdx} className={styles.column}>
                            {column.map((char, charIdx) => {
                                // 空文字のセルも枠線を表示するかどうか。
                                // 通常の空文字はセルとしてレンダリングするが、必要に応じてスタイル調整
                                return (
                                    <div 
                                        key={charIdx} 
                                        className={`${styles.cell} ${normalizedFocusedChar === char ? styles.focused : ''}`}
                                    >
                                        {char && (
                                            activeTab === 'hiragana' ? (
                                                <span className={styles.char}>{char}</span>
                                            ) : activeTab === 'braille' ? (
                                                <>
                                                    <SpecialText className={styles.char} variant="bnl">{char}</SpecialText>
                                                    <span className={styles.subChar}>{char}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className={styles.char} style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
                                                        {toMorseCode(char)}
                                                    </span>
                                                    <span className={styles.subChar}>{char}</span>
                                                </>
                                            )
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                <p className={styles.note}>
                    {activeTab === 'hiragana' ? '読み方の確認に使ってください。' :
                     activeTab === 'braille' ? 'ひらがなに対応する点字です。' :
                     'ひらがなに対応するモールス信号です。'}
                </p>
            </div>
        </div>
    );

};
