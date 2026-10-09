import Link from "next/link";
export default function NotFound() {
  return (
    <main className="reading">
      <h1>이 이야기를 찾을 수 없어요.</h1>
      <p>주소를 확인하거나 전체 생활 팁을 둘러보세요.</p>
      <Link className="primary" href="/">
        생활 안내서로 돌아가기
      </Link>
    </main>
  );
}
