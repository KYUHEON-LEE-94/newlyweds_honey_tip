import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "둘의 생활 | 함께 시작하는 생활 안내서",
  description: "신혼부부를 위한 주거·지원 정보와 생활비·살림 팁을 한곳에.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
