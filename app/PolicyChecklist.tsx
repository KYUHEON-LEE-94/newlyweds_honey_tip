import type { Article } from "../lib/content";
export default function PolicyChecklist({ article: a }: { article: Article }) {
  return (
    <>
      {a.status === "closed" && (
        <p className="closed-notice">
          이 글에서 안내하는 모집은 종료되었습니다. 다음 모집은 공식 기관의 새
          공고를 확인해 주세요.
        </p>
      )}
      {a.checklist && (
        <aside className="policy-checklist">
          <h3>확인할 항목</h3>
          <ul>
            {a.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      )}
      {a.relatedSource && (
        <a
          className="official"
          href={a.relatedSource.url}
          target="_blank"
          rel="noreferrer"
        >
          {a.relatedSource.label} ↗
        </a>
      )}
    </>
  );
}
