# 둘의 생활

신혼부부를 위한 주거·지원 정보와 생활비·살림 팁을 모으는 한국어 사이트입니다.

## 현재 구현

카테고리·세부 주제·지역 필터, 다중 검색어 검색, 글 상세 보기, 브라우저 보관함이 동작하는 Next.js 초기 버전입니다. 공개 콘텐츠는 Supabase에서 서버가 읽어 제공하며 요청마다 DB 최신 내용을 조회합니다. 생활 팁은 편집 콘텐츠이며 주거·지원 글은 공식 사이트를 안내합니다. 실시간 모집 공고 또는 자동 자격 판정을 제공하지 않습니다.

## 실행

Node.js 22.6 이상에서:

```sh
npm ci
npm run build
npm start
```

개발 실행은 `npm run dev`입니다. 로컬에서 키가 없으면 초기 편집 콘텐츠를 표시합니다. Vercel production에서는 Supabase 공개 환경변수가 필수입니다. 이 버전의 보관함은 localStorage에만 저장되며 사용자 계정·다른 기기와 동기화되지 않습니다.

## 목표 구성

- Next.js + Vercel: 사이트 및 서버 API
- Supabase: 공개 콘텐츠 연결 완료, 로그인 및 개인 저장 동기화는 후속 작업
- 공공데이터포털: 정부 혜택 / LH 공고 수집 (활용 승인 및 구현 대기)

공개 콘텐츠 조회와 개인 저장을 구분하고, 개인 데이터에는 소유자 기준 RLS를 적용할 예정입니다. 공공 API 인증키와 Supabase 비밀 키를 브라우저에 전달하지 않습니다.

## 검증

```sh
npm run typecheck
npm run build
```

## 배포

GitHub 저장소를 Vercel에 import하고 Framework를 Next.js로 지정합니다. DB 연결 이후 `.env.example`의 공개 변수만 설정합니다. Supabase 관리용 비밀 키는 `NEXT_PUBLIC_` 변수에 넣지 않습니다.

실제 완료 상태와 막힌 작업은 [PROGRESS.md](./PROGRESS.md)에 기록합니다.

## 콘텐츠와 정책 상태

총 16개 글 중 신규 정책 안내 6건은 출처 확인일, 지역, 접수 상태와 확인 항목을 제공합니다. 지역 선택 시 전국 공통 정보 포함 여부와 종료 모집 숨김을 선택할 수 있습니다. 출처는 [SOURCES.md](./SOURCES.md), SEO 운영은 [SEO.md](./SEO.md)를 참고하세요.

정책 데이터 원본은 `data/policies.json`이며 현재 Supabase에 같은 내용을 반영했습니다. JSON만 변경하면 운영 DB가 자동 변경되지는 않습니다. 발행 전 검토 후 DB에 반영해야 합니다. 본문 데이터는 캐시하지 않고 서버에서 조회합니다. 데이터 원본은 data/policies.json, data/finance.json, data/editorial.json입니다.

콘텐츠 검증 및 매일 09:00 정기 점검 기준은 [CONTENT_POLICY.md](./CONTENT_POLICY.md)를 참고하세요.

`npm test`로 지역·종료 상태·저장·검색 조합 테스트를 실행합니다.
