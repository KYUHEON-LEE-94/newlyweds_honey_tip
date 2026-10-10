"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { filterArticles } from "../lib/filter";
import ArticleFacts from "./ArticleFacts";
import PolicyChecklist from "./PolicyChecklist";
import { categories, type Article } from "../lib/content";
export default function Home({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState("전체");
  const [region, setRegion] = useState("전체 지역");
  const [includeNational, setIncludeNational] = useState(true);
  const [hideClosed, setHideClosed] = useState(false);
  const regions = [
    "전체 지역",
    "전국",
    ...Array.from(
      new Set(articles.map((a) => a.region).filter((r) => r !== "전국")),
    ).sort(),
  ];
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [selected, setSelected] = useState<Article | null>(null);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem("dul-saved-v1") || "[]");
      if (Array.isArray(value))
        setSaved(value.filter((x: unknown) => typeof x === "string"));
    } catch {
      setNotice(
        "저장 목록을 읽지 못했어요. 브라우저 저장 설정을 확인해 주세요.",
      );
    }
  }, []);
  useEffect(() => {
    if (!selected) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", handler);
    const trigger = document.activeElement as HTMLElement | null;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = old;
      trigger?.focus();
    };
  }, [selected]);
  function toggle(id: string) {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    try {
      localStorage.setItem("dul-saved-v1", JSON.stringify(next));
      setSaved(next);
      setNotice(
        next.includes(id)
          ? "이 브라우저의 보관함에 담았어요."
          : "보관함에서 지웠어요.",
      );
    } catch {
      setNotice("저장하지 못했어요. 브라우저 저장 공간을 확인해 주세요.");
    }
  }
  const filtered = filterArticles(articles, {
    category,
    region,
    includeNational,
    hideClosed,
    query,
    onlySaved,
    saved,
  });
  return (
    <>
      <header>
        <a className="brand" href="/" aria-label="둘의 생활 홈">
          <span className="brandmark">둘</span>둘의 생활
          <span className="beta">BETA</span>
        </a>
        <nav aria-label="주 메뉴">
          <button
            className={!onlySaved ? "active" : ""}
            onClick={() => setOnlySaved(false)}
          >
            생활 안내서
          </button>
          <button
            className={onlySaved ? "active" : ""}
            onClick={() => setOnlySaved(true)}
          >
            내 보관함 <span className="count">{saved.length}</span>
          </button>
        </nav>
        <span className="header-note">함께라서, 조금 더 쉬운 생활</span>
      </header>
      <main>
        <section className="hero">
          <div>
            <div className="eyebrow">A LITTLE GUIDE FOR TWO</div>
            <h1>
              둘이 시작하는 생활,
              <br />
              좋은 정보부터 함께.
            </h1>
            <p>
              놓치기 쉬운 지원 정보부터 매일 쓰는 살림 팁까지.
              <br />
              우리에게 필요한 것들을 하나씩 모아보세요.
            </p>
            <button
              className="primary"
              onClick={() =>
                document
                  .getElementById("browse")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              우리 생활에 필요한 팁 찾기 <span>↗</span>
            </button>
            <div className="hero-foot">
              <span>주거·지원</span>
              <i /> <span>생활비·살림</span>
              <i />
              <span>둘만의 생활 습관</span>
            </div>
          </div>
          <div className="illustration" aria-hidden="true">
            <div className="sun" />
            <div className="window">
              <div />
              <div />
              <div />
              <div />
            </div>
            <div className="shelf" />
            <div className="plant">
              <span />
              <span />
              <span />
              <b />
            </div>
            <div className="sofa">
              <i />
              <i />
              <b />
              <em />
            </div>
            <div className="rug" />
            <div className="table">
              <span />
              <b />
            </div>
            <div className="art-label">
              OUR FIRST CHAPTER <span>01</span>
            </div>
          </div>
        </section>
        <section className="quick">
          <div>
            <span className="tiny">먼저 알아두면 좋아요</span>
            <h2>우리 집의 든든한 출발점</h2>
          </div>
          <button
            onClick={() => {
              setCategory("주거·지원");
              setOnlySaved(false);
              document
                .getElementById("browse")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="quick-icon">⌂</span>
            <span>
              <b>주거·지원 정보</b>
              <small>공식 정보에서 시작하기</small>
            </span>
            <em>↗</em>
          </button>
          <button
            onClick={() => {
              setCategory("생활비");
              setOnlySaved(false);
              document
                .getElementById("browse")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="quick-icon peach">₩</span>
            <span>
              <b>둘이 쓰는 생활비</b>
              <small>작은 지출부터 점검하기</small>
            </span>
            <em>↗</em>
          </button>
        </section>
        <section id="browse">
          <div className="section-heading">
            <div>
              <div className="eyebrow">LIFE, TOGETHER</div>
              <h2>
                {onlySaved
                  ? "다시 꺼내볼, 우리 생활 팁"
                  : "지금 우리에게 필요한 이야기"}
              </h2>
            </div>
            <label className="search">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="생활 정보 검색"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="궁금한 생활 정보를 검색해 보세요"
              />
            </label>
          </div>
          <div className="filters" role="group" aria-label="정보 분류">
            {categories.map((c) => (
              <button
                key={c}
                aria-pressed={c === category}
                className={c === category ? "selected" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
            <span role="status">{filtered.length}개의 이야기</span>
          </div>
          <div className="region-filters">
            <label>
              관심 지역{" "}
              <select
                aria-label="관심 지역"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r === "전국" ? "전국 공통" : r}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeNational}
                onChange={(e) => setIncludeNational(e.target.checked)}
                disabled={region === "전체 지역" || region === "전국"}
              />{" "}
              전국 공통 정보 함께 보기
            </label>
            <label>
              <input
                type="checkbox"
                checked={hideClosed}
                onChange={(e) => setHideClosed(e.target.checked)}
              />{" "}
              종료된 모집 숨기기
            </label>
          </div>
          {onlySaved && (
            <p className="storage-note">
              보관함은 현재 브라우저에 저장됩니다. 기기 간 동기화는 아직
              지원하지 않아요.
            </p>
          )}
          <div className="cards">
            {filtered.map((a, i) => (
              <article className="card" key={a.id}>
                <div className={`cover ${a.color}`}>
                  <span>{a.category}</span>
                  <div className="cover-glyph" aria-hidden="true">
                    {a.category === "주거·지원"
                      ? "⌂"
                      : a.category === "생활비"
                        ? "₩"
                        : a.category === "살림"
                          ? "✳"
                          : "♡"}
                  </div>
                  <button
                    className="save"
                    aria-label={`${a.title} ${saved.includes(a.id) ? "저장 취소" : "저장"}`}
                    aria-pressed={saved.includes(a.id)}
                    onClick={() => toggle(a.id)}
                  >
                    {saved.includes(a.id) ? "♥" : "♡"}
                  </button>
                  <small>TIP {String(i + 1).padStart(2, "0")}</small>
                </div>
                <div className="card-body">
                  <div className="card-tag">{a.tag}</div>
                  <ArticleFacts article={a} compact />
                  <Link className="article-title" href={`/tips/${a.id}`}>
                    <h3>{a.title}</h3>
                  </Link>
                  <p>{a.summary}</p>
                  <div className="card-footer">
                    <span>{a.sourceName || "둘의 생활 편집 노트"}</span>
                    <button
                      onClick={() => setSelected(a)}
                      aria-label={`${a.title} 자세히 보기`}
                    >
                      읽어보기 ↗
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty">
              <h3>
                {onlySaved
                  ? "아직 담아둔 이야기가 없어요."
                  : "찾는 이야기가 없어요."}
              </h3>
              <p>
                검색어나 분류를 바꾸거나 마음에 드는 글의 하트를 눌러보세요.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("전체");
                  setOnlySaved(false);
                  setRegion("전체 지역");
                  setHideClosed(false);
                }}
              >
                모든 이야기 보기
              </button>
            </div>
          )}
        </section>
        <aside className="source-banner">
          <span>↗</span>
          <div>
            <h3>지원 정보의 마지막 확인은 공식 사이트에서</h3>
            <p>
              공식 출처를 확인해 정보를 정리합니다. 실시간 공고·지원금 자동
              수집은 연결 준비 중입니다.
            </p>
          </div>
          <a href="https://www.gov.kr/" target="_blank" rel="noreferrer">
            정부24 바로가기 ↗
          </a>
        </aside>
      </main>
      <footer>
        <b>둘의 생활</b>
        <span>두 사람이 함께 만드는, 매일의 작은 여유.</span>
        <small>© 2026 둘의 생활 · 첫 번째 버전</small>
      </footer>
      <div className="toast" role="status">
        {notice}
      </div>
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
            className="modal"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                const nodes =
                  e.currentTarget.querySelectorAll<HTMLElement>(
                    "button,a[href]",
                  );
                const first = nodes[0],
                  last = nodes[nodes.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <button
              autoFocus
              className="close"
              aria-label="상세 닫기"
              onClick={() => setSelected(null)}
            >
              ×
            </button>
            <div className="eyebrow">{selected.category}</div>
            <h2 id="detail-title">{selected.title}</h2>
            <p className="lead">{selected.summary}</p>
            <ArticleFacts article={selected} />
            <PolicyChecklist article={selected} />
            {selected.body.map((p, i) => (
              <div className="step" key={p}>
                <span>{i + 1}</span>
                <p>{p}</p>
              </div>
            ))}
            {selected.source && (
              <a
                className="official"
                href={selected.source}
                target="_blank"
                rel="noreferrer"
              >
                {selected.sourceName}에서 공식 안내 확인 ↗
              </a>
            )}
            <button className="primary" onClick={() => toggle(selected.id)}>
              {saved.includes(selected.id)
                ? "보관함에서 지우기"
                : "내 보관함에 담기"}
            </button>
            <p className="storage-note">
              생활 팁은 편집 제안입니다. 지원 자격·금액·접수 기간은 공식
              공고에서 확인하세요.
            </p>
          </section>
        </div>
      )}
    </>
  );
}
