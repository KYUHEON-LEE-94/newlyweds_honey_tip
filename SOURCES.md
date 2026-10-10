# 정책 콘텐츠 출처 기록

확인일: 2026-10-10 (Asia/Seoul). 공공기관 공식 페이지와 검색엔진에 수집된 해당 공식 페이지 본문을 확인했다. 일부 기관 페이지는 직접 요청에 시간 초과를 반환하여 공식 페이지 검색 색인에서 내용을 확인했다. 이는 실시간 API 수집이나 신청 자격 심사 결과가 아니다.

| 글 | 공식 출처 | 확인 범위 |
| --- | --- | --- |
| 서울 임차보증금 이자지원 | https://news.seoul.go.kr/citybuild/archives/508747 | 제도 및 대상 조건 개요. 최신 변경 공지는 서울주거포털 별도 확인 필요 |
| 부산 주택융자·이자지원 | https://www.busan.go.kr/childcare/childcare010106 | 전용 공고 게시판, 2026년 변경 공고 존재. 현재 접수 가능 여부는 확정하지 않음 |
| 인천 천원주택 매입임대 | https://www.incheon.go.kr/housing/hou060102 | 월 임대료 3만원, 보증금·관리비 별도, 해당 회차 2026-05-15 접수 종료 |
| 경기 주거비·금융지원 | https://housing.gg.go.kr/html/51500.do | 청년·신혼 주거비·금융지원 안내 메뉴 |
| 행복주택 | https://m.myhome.go.kr/hws/portal/cont/selectHappyHouseView.do | 공공임대 제도와 신혼부부 대상 포함. 실제 모집은 개별 공고 확인 |
| 반환보증 보증료 지원 | https://www.khug.or.kr/jeonse/web/s05/s050601.jsp | 보증료 지원 제도 존재. 세부 금액·자격은 별도 확정하지 않음 |

서울의 변경 공지와 부산의 분기별 공고 때문에 접수 중이라는 자동 배지를 붙이지 않았다. 인천은 명시된 접수 종료일에 따라 종료로 표시한다. 다른 사업은 ‘제도 안내’ 또는 ‘접수 여부 확인’으로 표시한다.

추가 시 `data/policies.json`에 출처·확인일·지역·상태를 기록하고 Supabase `articles.content`에도 동일 자료를 반영한다. `updated_at`은 사이트 콘텐츠 수정 시각이고 `checkedAt`은 출처 확인일이다. 둘을 혼용하지 않는다.

## 부부 재테크 / 2026-10-10

- 금융위원회 발표의 KDI 게재 원문: https://eiec.kdi.re.kr/policy/materialView.do?num=268951 — 2025-07-22 발표, 예금보호한도 상향 2025-09-01 시행 확인. 가계 비상금 계산 예시는 자체 편집 제안.
- 금융위원회: https://www.fsc.go.kr/po010101/86973 — 2026-05-26 단일종목 레버리지 투자 위험 안내. 편입 자산 비교·부부 합의 방법은 자체 편집 제안.
- 공식 YouTube https://www.youtube.com/@FSCKorea — 위 금융위원회 원문 내 공식 링크로 계정 연결 확인. 특정 영상 사실 검증이나 자동 수집은 하지 않음.
- 품질/갱신/후속 조건 모델: CONTENT_POLICY.md. 현재 개인별 소득·자산 판정은 미구현.

## 청약 / 2026-10-10

- 국가법령정보센터 https://www.law.go.kr/LSW/admRulInfoP.do?admRulSeq=2100000282334&chrClsCd=010201 — 운용지침 제목·2026-07-08 시행 확인. 조문 전체가 웹 추출되지 않아 구체적 소득·혼인 기준을 단정하지 않음.
- LH https://apply.lh.or.kr/lhapply/cm/cntnts/cntntsView.do?cntntsId=1132&mi=1243 — 신혼희망타운 대상과 조건 항목·전용 대출 조건 확인. 과거 연도 표가 혼재하므로 수치를 현재 공통 기준으로 게시하지 않음.
- LH https://apply.lh.or.kr/lhapply/cm/cntnts/cntntsView.do?cntntsId=1234&mi=1306 — 분양주택 청약 연습 안내. 실제 모집 목록/개인 자격 심사와 구분.
