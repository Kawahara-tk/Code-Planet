"use client";
import { SpecialText } from "@/components/SpecialText";
import Link from "next/link";
import {
  LightbulbIcon,
  StarIcon,
  BookIcon,
  ScrollIcon,
  SparkleIcon,
  TrophyIcon,
  ChartIcon,
  KeyIcon,
  ShuffleIcon,
  BrailleIcon,
  SignalIcon,
  HomeIcon,
  TargetIcon,
  CollectionIcon,
  SettingsIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { PlayerStatus, StageCard, BottomNav, CipherProgress } from "@/components/home";
import styles from "./page.module.css";

// ダミーデータ（実装イメージ用）
const PLAYER_DATA = {
  level: 5,
  currentExp: 350,
  nextLevelExp: 500,
};

// 暗号別進捗データ
const CIPHER_PROGRESS = [
  { name: "シーザー暗号", icon: <KeyIcon />, progress: 80, color: "#5c7cfa" },
  { name: "アナグラム", icon: <ShuffleIcon />, progress: 45, color: "#ff6b9d" },
  { name: "点字暗号", icon: <BrailleIcon />, progress: 20, color: "#ffa94d" },
  { name: "モールス信号", icon: <SignalIcon />, progress: 0, color: "#22b8cf" },
];

// ナビゲーションアイテム
const NAV_ITEMS = [
  { href: "/", icon: <HomeIcon />, label: "ホーム", isActive: true },
  { href: "/cipher-game", icon: <TargetIcon />, label: "ステージ" },
  { href: "#", icon: <CollectionIcon />, label: "ずかん" },
  { href: "#", icon: <SettingsIcon />, label: "せってい" },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <SpecialText variant="bnl">あ</SpecialText>
      <SpecialText variant="bwl">ぴゃ
      </SpecialText>
      <div className={styles.contentWrapper}>
        {/* 左パネル: ステータス・ナビゲーション */}
        <div className={styles.leftPanel}>
            <header className={styles.header}>
                <div className={styles.logo}>
                <div className={styles.logoIcon}>
                    <LightbulbIcon />
                </div>
                <h1 className={styles.title}>ひらめきコード</h1>
                </div>
                <p className={styles.subtitle}>遊んで学べる暗号チャレンジ</p>
            </header>

            <PlayerStatus
                level={PLAYER_DATA.level}
                currentExp={PLAYER_DATA.currentExp}
                nextLevelExp={PLAYER_DATA.nextLevelExp}
                starIcon={<StarIcon />}
            />

            {/* タブレット用ナビゲーション (Desktop only) */}
            <nav className={styles.desktopNav}>
                {NAV_ITEMS.map((item, index) => (
                    <Link key={index} href={item.href} className={`${styles.desktopNavItem} ${item.isActive ? styles.desktopNavActive : ''}`}>
                        <span className={styles.desktopNavIcon}>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>

        {/* 右パネル: メインコンテンツ */}
        <div className={styles.rightPanel}>
            {/* メインストーリーステージ */}
            <section className={styles.stageSection}>
                <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}><BookIcon /></span>
                <h2 className={styles.sectionTitle}>メインストーリー</h2>
                </div>
                <StageCard
                href="/cipher-game"
                icon={<ScrollIcon />}
                iconStyle="story"
                title="第1章：暗号の扉"
                description="シーザー暗号をマスターしよう！"
                stars={{ total: 5, active: 3 }}
                starIcon={<StarIcon />}
                arrowIcon={<ArrowRightIcon />}
                />
            </section>

            {/* デイリー＆チャレンジ */}
            <section className={styles.stageSection}>
                <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}><TargetIcon /></span>
                <h2 className={styles.sectionTitle}>きょうのチャレンジ</h2>
                </div>
                <div className={styles.stageGrid}>
                <Link href="/cipher-game?mode=daily" className={styles.stageGridCard}>
                    <div className={`${styles.stageGridIcon} ${styles.stageIconDaily}`}>
                    <SparkleIcon />
                    </div>
                    <span className={styles.stageGridName}>デイリー</span>
                    <span className={`${styles.stageGridStatus} ${styles.statusNew}`}>NEW!</span>
                </Link>

                <Link href="/cipher-game?mode=challenge" className={styles.stageGridCard}>
                    <div className={`${styles.stageGridIcon} ${styles.stageIconChallenge}`}>
                    <TrophyIcon />
                    </div>
                    <span className={styles.stageGridName}>チャレンジ</span>
                    <span className={`${styles.stageGridStatus} ${styles.statusCleared}`}>クリア</span>
                </Link>
                </div>
            </section>

            {/* 暗号別進捗 */}
            <CipherProgress items={CIPHER_PROGRESS} titleIcon={<ChartIcon />} />
        </div>
      </div>

      {/* 下部ナビゲーション (Mobile only) */}
      <div className={styles.mobileNavWrapper}>
        <BottomNav items={NAV_ITEMS} />
      </div>
    </main>

  );
}
