# 둘의 생활

신혼부부를 위한 주거·지원 정보와 생활비·살림 팁을 모으는 한국어 사이트입니다.

## 현재 구현

카테고리 검색, 글 상세 보기, 브라우저 보관함이 동작하는 Next.js 초기 버전입니다. 생활 팁은 편집 콘텐츠이며 주거·지원 글은 공식 사이트를 안내합니다. 실시간 모집 공고 또는 자동 자격 판정을 제공하지 않습니다.

## 실행

Node.js 20.9 이상에서:

```sh
npm ci
npm run build
npm start
```

개발 실행은 `npm run dev`입니다. 현재 화면은 외부 서비스 키 없이 동작합니다. 이 버전의 보관함은 localStorage에만 저장되며 사용자 계정·다른 기기와 동기화되지 않습니다.

## 목표 구성

- Next.js + Vercel: 사이트 및 서버 API
- Supabase: 콘텐츠, 로그인, 개인 저장 목록 (연결 대기)
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
