# 둘의 생활 — 진행 기록

## 현재 상태

- 공개 사이트: https://newlyweds-honey-tip.vercel.app/
- GitHub: https://github.com/KYUHEON-LEE-94/newlyweds_honey_tip
- Vercel + Supabase 연결 및 첫 production 배포 완료.
- 공공 API 자동수집, 계정 간 저장 동기화, Search Console 소유권 확인/색인은 후속 작업.
- 아래 기록은 작업 경과이며 앞선 연결 오류는 해결됨.

## 2026-10-10 (Asia/Seoul)

### 합의한 방향

- 신혼부부 본인도 사용하는 정보 사이트.
- 지원금·주거 정책과 생활비·살림 팁을 함께 제공.
- 배포: Vercel. 데이터베이스: Supabase.
- Supabase 조직: My Personal Project. 새 프로젝트를 사용한다.
- 소스는 GitHub에 push하고 진행 상황을 Markdown으로 관리한다.
- 임시 서비스 이름: 둘의 생활. 지역은 미지정이므로 전국 공통으로 시작.

### 구현

- Next.js / React / TypeScript 앱 기본 구조.
- 반응형 메인 화면, 분류 필터, 검색, 상세 읽기.
- 브라우저 저장소 기반 보관함. 동기화 기능과 구분하여 표시.
- 생활 팁 6개와 정부24·LH 공식 정보 길잡이 2개.
- 정책 금액·소득 기준·마감일을 확인 없이 제시하지 않음.

### 연결 조사

- Vercel 계정의 팀 확인 완료. 기존 프로젝트 없음.
- Supabase 조직과 기존 프로젝트 확인 완료. 기존 앱 데이터 변경 없음.
- 새 프로젝트 비용 조회 호출 실패: `MCP tool get_cost was not returned by tools/list`.
- 비용 확인이 필요한 생성 절차가 막혀 새 DB는 아직 생성하지 않음.
- 공공 API 후보: 행정안전부 공공서비스 혜택 정보, LH 분양임대공고문 조회.
- 공공데이터포털 활용 신청과 인증키 발급 필요. 현재 API 수집 미구현.

### 남은 작업

- GitHub 저장소 생성/인증 및 최초 push 확인.
- TypeScript 및 production build 검증.
- Supabase 새 프로젝트 생성, 콘텐츠 및 개인 저장 목록 스키마/RLS 적용.
- Supabase 로그인 및 기기 간 저장 동기화.
- 공공 API 활용 승인 후 서버 수집·중복 제거·갱신 실패 처리.
- 원문 확인일과 데이터 수집 시각을 구분하여 표기.
- Vercel 연결, 환경변수 설정, 배포 및 실제 흐름 검증.

### 공식 API 자료

- https://www.data.go.kr/data/15113968/openapi.do
- https://www.data.go.kr/data/15058530/openapi.do

### 검증 결과
- `npm install`: 성공, 감사 결과 알려진 취약점 0개.
- `npm run build`: 성공 (Next.js 16.4.0, TypeScript 검사 및 정적 페이지 생성 통과).
- React 품질 가이드 검토: 이벤트 리스너 정리, 저장소 실패 처리, 키보드 닫기 및 대화상자 포커스 순환 구현.
- 실제 브라우저 기능/반응형 검증은 아직 수행하지 않음.

### GitHub 상태
- 연결 앱 계정 확인: KYUHEON-LEE-94.
- GitHub CLI 설치 완료. CLI 인증은 미완료.
- 제공된 GitHub 연결 도구에는 저장소 생성 기능 없음.
- 브라우저에서 새 저장소 생성 페이지를 열었으나 로그인 필요.
- 사용자에게 CLI 로그인 또는 기존 저장소 URL 요청. 인증정보는 문서에 기록하지 않음.

### 공개 운영 및 SEO 요청 반영
- 사용자가 다른 사람도 언제든 볼 수 있는 공개 사이트와 Google 등 검색 노출을 요청.
- 글 8개의 독립 URL 및 정적 본문, canonical, Open Graph, Article JSON-LD 추가.
- sitemap.xml / robots.txt 구현. production만 색인 허용.
- 공유 이미지 PNG 생성. 상세 체크리스트는 SEO.md.
- 수정 후 `npm run build` 재통과: 홈, 글 8개, robots, sitemap 생성.

### 연결 경로 변경
- 사용자가 지정한 저장소: https://github.com/KYUHEON-LEE-94/newlyweds_honey_tip
- 저장소는 사용자 생성 공개 저장소이며 기존 파일 없음 확인.
- 일반 git push는 터미널 인증 부재로 실패.
- GitHub 연결 앱 create_file은 403 Resource not accessible by integration으로 실패. 원격 파일 변경 없음.
- Vercel 연결 앱 create_project도 403으로 실패. 브라우저 연결 경로로 전환.
- 브라우저 Vercel에는 기존 앱이 표시되어 앞선 연결 도구의 빈 목록을 확정 상태로 신뢰하지 않음.
- Supabase 신규 화면: My Personal Project FREE, 프로젝트명 newlyweds-honey-tip, 새 테이블 자동 노출 해제, 자동 RLS 활성화.
- DB 비밀번호 생성·입력·제출은 사용자 직접 처리 대기. 비밀번호는 수집하지 않음.

### 연결 완료 및 배포 준비
- Supabase 새 프로젝트 생성 확인: newlyweds-honey-tip (Tokyo).
- articles / bookmarks 테이블 생성 및 RLS 적용 완료.
- 공개 콘텐츠 8건 저장. 발행 글은 공개 읽기만 허용, 개인 보관함은 본인 행만 허용.
- 보안 점검에서 대시보드 자동 생성 RLS 함수의 공개 실행 권한을 발견해 회수.
- 사이트가 Supabase REST 공개 콘텐츠를 서버에서 읽도록 연결. 1시간 재검증.
- Supabase 연결 후 production build 및 TypeScript 통과.
- GitHub CLI 기기 인증 완료. main 브랜치 push 경로 정상 연결.
- Vercel Hobby 프로젝트 import 화면에 Next.js와 Supabase 공개 환경변수 설정. 배포 대기.
- 보관함 UI는 현재 브라우저 저장만 제공. DB 보관함 테이블은 후속 로그인 연동용.


### 첫 공개 배포 검증 완료
- 배포 커밋: 8f5af69, Vercel production READY.
- 비로그인 HTTP 접근: 홈과 글 8개 모두 200, 없는 글 404.
- robots.txt: Allow: /, production sitemap 주소 확인.
- sitemap의 9개 주소와 각 canonical 일치, noindex 없음.
- 실제 브라우저 검색, 카테고리 필터, 저장/해제, 새로고침 후 저장 유지, 개별 글 이동 확인.
- Supabase REST: 공개 글 8건 조회 200, 익명 개인 보관함 조회 401.
- RLS: 임시 비공개 콘텐츠를 트랜잭션 내 생성해 익명에게 숨겨짐 확인 후 롤백.
- Supabase security advisors: 경고 0개.

### 2차 — 지역 정책 확장
- 사용자의 다음 작업 요청에 따라 전국·서울·경기·인천·부산 정책 안내 6건 추가. 총 14건.
- 공식 출처와 확인 범위를 SOURCES.md에 기록. 직접 요청 실패 시 공식 페이지 검색 색인으로 보완한 점 명시.
- 인천 해당 회차의 2026-05-15 접수 종료를 명시하고 종료 배지 제공.
- 지역 선택, 전국 공통 포함, 종료 모집 숨김 기능 추가.
- 다중 검색어 AND 검색 및 영문 대소문자 무시.
- 글과 카드에 지역·출처 확인일·접수 상태, 상세에 준비 항목 추가.
- 신규 정책 JSON을 Supabase에 반영. 콘텐츠 수정 시각을 출처 확인일과 분리.
- `npm test`: 필터 조합 5개 통과. `npm run build`: 전체 글 14개 생성 성공.
- 공개 사이트 2차 배포 및 최종 검증 진행 중.

## 2026-10-10 콘텐츠·분류·정기 점검 보강

- 생활비에 비상금·목적자금 설계, 부부 투자 규칙 2개 상세 글 추가. 기존 편집 글 8개에 비교·계산·실행 예시 보강.
- 공개 콘텐츠 16개를 Supabase에 반영. 원문 기반 사실과 편집 예시를 구분하고 금융위원회 공식 YouTube 채널을 보조 링크로 연결.
- 세부 주제 필터 추가, 지역·대분류·검색어와 교집합 적용. 소득·혼인 기간 자격 판정은 구현 전이며 조건 모델을 CONTENT_POLICY.md에 기록.
- `/editorial-policy` 공개 페이지와 사이트맵 추가. 공식 출처 연결이 기관 인증이라는 오해를 방지하도록 표기.
- Codex heartbeat `automation` 활성화: 매일 09:00 Asia/Seoul 공식 원문 점검 및 검증된 변경 반영. 앱 환경에 의존하며 Vercel 서버 cron/실시간 API 수집은 아직 아님.
- DB 수정 후 오래된 fetch 캐시가 남지 않도록 공개 글 조회를 no-store로 변경. 서버 렌더링으로 검색엔진에 본문 제공하며 요청 내 중복 조회는 React cache로 합침.
- 필터 테스트 6개 통과. 최종 빌드/배포 검증은 아래 기록.
- 최종 `npm test` 6개 통과, `npm run build` 성공. 16개 콘텐츠의 서버 렌더링 및 운영 기준 페이지 생성 확인.
