"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./DraggablePopup.module.css";

interface DraggablePopupProps {
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const DraggablePopup: React.FC<DraggablePopupProps> = ({ onClose, title = "Popup", children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Initial centering logic or random position could go here, 
  // but simpler to let CSS center it initially and then we take over with transform or top/left.
  // Actually, to make it draggable freely, we usually switch to absolute/fixed positioning with explicit logs.
  
  // Let's set initial position to some default if needed, or rely on the first render to set it?
  // For simplicity, we'll start with top/left 200px equivalent, but let's just use what's in CSS initially 
  // until we move it. Wait, if we use transform translate in CSS for centering, setting top/left might jump.
  // Better to use a specific initial state.
  
  useEffect(() => {
    // Set initial position to center of screen roughly if not set
    if (typeof window !== 'undefined') {
      setPosition({
        x: window.innerWidth / 2 - 150, // 300px width / 2
        y: window.innerHeight / 2 - 100 // 200px height / 2
      });
    }
  }, []);


  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (headerRef.current && headerRef.current.contains(e.target as Node)) {
        e.preventDefault();
        
        // Start long press timer
        timeoutRef.current = setTimeout(() => {
            setIsDragging(true);
            setDragOffset({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
            (e.target as Element).setPointerCapture(e.pointerId);
        }, 500); // 500ms long press
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // If we move too much before the timer fires, we should probably cancel?
    // For now, let's keep it simple. If dragging, move.
    if (isDragging) {
        setPosition({
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y
        });
    }
  };

  const cancelDrag = (e: React.PointerEvent<HTMLDivElement>) => {
      if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
      }
      if (isDragging) {
          setIsDragging(false);
          if (e && e.target) {
            (e.target as Element).releasePointerCapture(e.pointerId);
          }
      }
  };


  return (
    <div 
        className={styles.popup}
        style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            transform: 'none' // Override centering transform
        }}
    >

      <div 
        ref={headerRef}
        className={styles.header}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={cancelDrag}
        onPointerCancel={cancelDrag}
      >
        {title}
      </div>

      <div className={styles.content}>
        {children}
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </div>
  );
};
