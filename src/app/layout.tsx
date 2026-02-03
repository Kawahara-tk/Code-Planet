import type { Metadata } from "next";
import { M_PLUS_Rounded_1c, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const mPlusRounded = M_PLUS_Rounded_1c({
  variable: "--font-m-plus",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ひらめきコード | 遊んで学べる暗号チャレンジ",
  description: "小学生・中学生向けの暗号学習サイト。パズルや謎解きを楽しみながら、シーザー暗号やモールス信号をマスターしよう！ステージクリア型で楽しく学習できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${mPlusRounded.variable} ${notoSansJP.variable}`}>
        {children}
      </body>
    </html>
  );
}
