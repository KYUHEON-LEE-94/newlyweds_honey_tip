import { glossary } from '../lib/glossary';
import type { Article } from '../lib/content';
import { readingParagraphs, readingTokens, sectionTitles } from '../lib/reading';

export function ReadableText({ text }: { text: string }) {
  return <>{readingTokens(text).map((part, index) => part.kind === 'text'
    ? <span key={index}>{part.text}</span>
    : <strong key={index} className={part.kind === 'date' ? 'important-date' : undefined}>{part.text}</strong>)}</>;
}

export default function ArticleBody({ article, headingLevel = 3 }: { article: Article; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const text = [article.summary, ...article.body].join(" ");
  const terms = glossary.filter(([term]) => text.includes(term));
  return <div className="article-body">
    {article.body.map((text, index) => <section className="reading-section" key={`${article.id}-${index}`}>
      <Heading><span className="section-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{sectionTitles[article.id]?.[index] ?? `함께 확인할 내용 ${index + 1}`}</Heading>
      {readingParagraphs(text).map((paragraph, part) => <p key={part}><ReadableText text={paragraph} /></p>)}
    </section>)}
    {terms.length > 0 && <aside className="article-glossary" aria-label="어려운 말 쉽게 보기">
      <Heading>어려운 말 쉽게 보기</Heading>
      <dl>{terms.map(([term, meaning]) => <div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl>
    </aside>}
  </div>;
}
