import type { Metadata } from "next";
import { siteUrl, isPublicSite } from "../lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "둘의 생활 | 신혼부부 주거·지원 정보와 생활 꿀팁",
    template: "%s | 둘의 생활",
  },
  description:
    "신혼부부를 위한 주거·지원 정보, 생활비 관리와 살림 팁. 우리에게 필요한 정보를 함께 모아보세요.",
  robots: { index: isPublicSite, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "둘의 생활",
    title: "둘의 생활 | 함께 시작하는 생활 안내서",
    description: "주거·지원 정보부터 생활비·살림 팁까지.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "둘의 생활 — 함께 시작하는 생활 안내서",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
