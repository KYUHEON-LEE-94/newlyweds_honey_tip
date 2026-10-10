import type { Article } from "../lib/content";
export default function ArticleFacts({
  article: a,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "article-facts compact" : "article-facts"}>
      <span>{a.region === "전국" ? "전국 공통" : a.region}</span>
      {a.status && (
        <span
          className={a.status === "closed" ? "status-closed" : "status-guide"}
        >
          {a.status === "closed"
            ? "접수 종료"
            : a.status === "check"
              ? "접수 여부 확인"
              : "제도 안내"}
        </span>
      )}
      {a.checkedAt && (
        <span>
          출처 확인 <time dateTime={a.checkedAt}>{a.checkedAt}</time>
        </span>
      )}
      {!compact && a.applicationEnd && (
        <span>해당 회차 접수 마감 {a.applicationEnd}</span>
      )}
    </div>
  );
}
