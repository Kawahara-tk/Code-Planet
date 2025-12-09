"use client";

import { useAuth } from "@/hooks/useAuth";
import { loginWithGoogle, logout } from "@/lib/firebase/auth";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Code Planet</h1>
        <p className={styles.subtitle}>Next.js + Firebase Template</p>
      </div>

      <div className={styles.authContainer}>
        {loading ? (
          <p style={{color: '#94a3b8'}}>Loading...</p>
        ) : user ? (
          <>
            <div className={styles.userProfile}>
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  width={48}
                  height={48}
                  className={styles.avatar}
                />
              ) : (
                <div style={{width: 48, height: 48, background:'#334155', borderRadius:'50%'}}></div>
              )}
              <div className={styles.userInfo}>
                <p className={styles.userName}>{user.displayName || 'Anonymous User'}</p>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
            </div>
            <button onClick={logout} className={styles.signOutButton}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <p style={{marginBottom: '1.5rem', color: '#94a3b8', textAlign: 'center'}}>
              Get started by signing in to access the full template features.
            </p>
            <button onClick={loginWithGoogle} className={styles.primaryButton}>
              Sign In with Google
            </button>
          </>
        )}
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Authentication</h3>
          <p className={styles.cardDesc}>Pre-configured Firebase Auth with Google Sign-In and robust user state management via custom hooks.</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Firestore Ready</h3>
          <p className={styles.cardDesc}>Integrated Firestore instance with safe initialization pattern for server-side rendering support.</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Modern Stack</h3>
          <p className={styles.cardDesc}>Built on Next.js App Router, TypeScript, and CSS Modules for a clean, scalable codebase.</p>
        </div>
      </div>
    </main>
  );
}
