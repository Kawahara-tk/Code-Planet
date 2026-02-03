import React from 'react'
import localFont from 'next/font/local'
import { ReactNode } from 'react'

// Load the fonts using next/font/local
// Adjust the path if your directory structure is different
const bnlFont = localFont({
  src: '../app/fonts/BNLbrail.ttf',
  variable: '--font-bnl-brail',
  display: 'swap',
})

const bwlFont = localFont({
  src: '../app/fonts/BWLbrail.ttf',
  variable: '--font-bwl-brail',
  display: 'swap',
})

import { preprocessBraille } from '@/lib/mappings/braille'

interface SpecialTextProps {
  /**
   * The text content to be displayed in the special font.
   */
  children: React.ReactNode
  /**
   * Optional CSS class names.
   */
  className?: string
  /**
   * The font variant to use. 'bnl' or 'bwl'. Defaults to 'bnl'.
   */
  variant?: 'bnl' | 'bwl'
}

/**
 * SpecialText Component
 * 
 * Displays text using the special Braille fonts (BNLbrail or BWLbrail).
 * 
 * Usage:
 * <SpecialText variant="bnl">Hello World</SpecialText>
 */
export const SpecialText = ({ children, className = '', variant = 'bnl' }: SpecialTextProps) => {
  const fontClass = variant === 'bwl' ? bwlFont.className : bnlFont.className
  
  // 文字列の場合は点字の前処理（濁点・半濁点の分解）を行う
  const renderContent = (content: React.ReactNode): React.ReactNode => {
    if (typeof content === 'string') {
      return preprocessBraille(content);
    }
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <React.Fragment key={index}>{renderContent(item)}</React.Fragment>
      ));
    }
    return content;
  };

  return (
    <span className={`${fontClass} ${className}`}>
      {renderContent(children)}
    </span>
  )
}
