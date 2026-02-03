import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './BottomNav.module.css';

interface NavItem {
  href: string;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
}

interface BottomNavProps {
  items: NavItem[];
}

export function BottomNav({ items }: BottomNavProps) {
  return (
    <nav className={styles.navbar}>
      {items.map((item, index) => (
        <Link 
          key={index}
          href={item.href} 
          className={`${styles.navItem} ${item.isActive ? styles.navItemActive : ''}`}
        >
          <span className={styles.navIcon}>{item.icon}</span>
          <span className={styles.navLabel}>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
