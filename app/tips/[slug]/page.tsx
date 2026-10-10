import type { Metadata } from "next";
import Link from "next/link";
import ArticleFacts from "../../ArticleFacts";
import PolicyChecklist from "../../PolicyChecklist";
import { notFound } from "next/navigation";
import { getArticles } from "../../../lib/articles";
import { siteUrl } from "../../../lib/site";
export const dynamicParams = true;
export const revalidate = 3600;
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getArticles();
  const a = articles.find((x) => x.id === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/tips/${a.id}` },
    openGraph: {
      title: a.title,
      description: a.summary,
      url: `/tips/${a.id}`,
      type: "article",
      locale: "ko_KR",
      siteName: "둘의 생활",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}
export default async function TipPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getArticles();
  const a = articles.find((x) => x.id === slug);
  if (!a) notFound();
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.summary,
    mainEntityOfPage: `${siteUrl}/tips/${a.id}`,
    author: { "@type": "Organization", name: "둘의 생활" },
    inLanguage: "ko-KR",
    articleSection: a.category,
    ...(a.modifiedAt ? { dateModified: a.modifiedAt } : {}),
  };
  return (
    <>
      <header>
        <Link className="brand" href="/">
          둘의 생활
        </Link>
        <Link href="/">← 전체 이야기</Link>
      </header>
      <main className="reading">
        <nav aria-label="이동 경로">
          <Link href="/">홈</Link>
          <span>/</span>
          <span>{a.category}</span>
        </nav>
        <article>
          <div className="eyebrow">{a.category}</div>
          <h1>{a.title}</h1>
          <p className="lead">{a.summary}</p>
          <p className="storage-note">둘의 생활 편집 노트</p>
          <ArticleFacts article={a} />
          <PolicyChecklist article={a} />
          {a.body.map((p, i) => (
            <section className="step" key={p}>
              <span>{i + 1}</span>
              <p>{p}</p>
            </section>
          ))}
          {a.source && (
            <a
              className="official"
              href={a.source}
              target="_blank"
              rel="noreferrer"
            >
              {a.sourceName}에서 공식 안내 확인 ↗
            </a>
          )}
          <p className="storage-note">
            지원 자격·금액·접수 기간은 공식 공고에서 확인하세요. 생활 팁은 편집
            제안입니다.
          </p>
        </article>
        <section>
          <h2>함께 읽으면 좋은 이야기</h2>
          {articles
            .filter(
              (x) =>
                x.id !== a.id &&
                x.category === a.category &&
                (x.region === a.region || x.region === "전국"),
            )
            .slice(0, 4)
            .map((x) => (
              <p key={x.id}>
                <Link className="official" href={`/tips/${x.id}`}>
                  {x.title} ↗
                </Link>
              </p>
            ))}
          <Link href="/">모든 생활 팁 보기 →</Link>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(json).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
