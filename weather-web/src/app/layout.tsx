import type { Metadata } from "next";
import { M_PLUS_1p, Sen } from "next/font/google";
import "./globals.css";

const mPlus1p = M_PLUS_1p({
  variable: "--font-m-plus-1p",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
});

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Muddy",
  description: "自分だけのオリジナルMuddyを育てよう!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${mPlus1p.variable} ${sen.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
