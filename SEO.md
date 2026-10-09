# 공개 운영 및 검색 노출

## 반영된 항목
- 로그인 없이 홈과 모든 생활 정보 열람.
- 글별 고유 주소 `/tips/[slug]`와 정적 HTML 본문.
- 홈에서 개별 글로 연결되는 실제 링크, 관련 글 내부 링크.
- 글별 title / description / canonical.
- 한국어 lang 및 Open Graph locale.
- Open Graph / Twitter 공유 이미지 (1200×630 PNG).
- Article 구조화 데이터 (보이는 본문과 일치).
- production 도메인 기준 sitemap.xml 및 robots.txt.
- 로컬·Vercel preview는 noindex, production은 검색 허용.

## 배포 시 확인
1. Vercel production 사이트를 익명 방문자가 로그인 없이 열 수 있는지 확인.
2. NEXT_PUBLIC_SITE_URL에 최종 대표 주소 설정. 미설정 시 VERCEL_PROJECT_PRODUCTION_URL을 사용.
3. robots.txt에 Allow: /와 올바른 Sitemap URL 확인.
4. sitemap.xml의 모든 글 주소가 HTTP 200인지 확인.
5. 각 글의 canonical이 자기 주소인지 확인.
6. 없는 글은 404를 반환하는지 확인.
7. Google Search Console 소유권 확인 후 sitemap.xml 제출.
8. URL 검사로 크롤링/색인 상태 확인. 네이버 서치어드바이저도 같은 순서로 등록.

Google Search Console 소유권 검증값이 발급되면 환경변수로 적용할 수 있도록 후속 작업한다. 현재 Search Console 등록과 실제 검색 색인은 미완료다. 검색 노출과 순위는 보장하지 않는다.

## 콘텐츠 운영
- 같은 키워드를 반복한 얇은 페이지를 늘리지 않는다.
- 정책 글에는 공식 출처와 실제 확인 날짜를 추가한다.
- 수집일을 내용 검수일로 표시하지 않는다.
- 지원 금액·기준은 원문을 확인한 후 기록하고 바뀐 내용은 수정한다.
- 사이트맵 수정일은 실제 콘텐츠 변경 시에만 추가한다.

공식 참고:
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
