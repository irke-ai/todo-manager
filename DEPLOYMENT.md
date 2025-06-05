# 배포 가이드

## Vercel 배포 방법

### 방법 1: GitHub 연동 (권장)
1. [Vercel](https://vercel.com) 로그인
2. "New Project" 클릭
3. GitHub 저장소 선택: `irke-ai/todo-manager`
4. 프레임워크 자동 감지: Next.js
5. "Deploy" 클릭

### 방법 2: Vercel CLI
```bash
# Vercel CLI 설치 (이미 설치됨)
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 3: 원클릭 배포
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/irke-ai/todo-manager)

## 환경 변수
현재 프로젝트는 환경 변수가 필요하지 않습니다.

## 배포 후 확인사항
- [ ] 페이지 로딩 정상
- [ ] 할 일 추가/삭제/수정 기능
- [ ] LocalStorage 저장 확인
- [ ] 다크모드 전환
- [ ] 모바일 반응형 디자인

## 커스텀 도메인 설정
1. Vercel 대시보드 → Settings → Domains
2. 도메인 추가
3. DNS 설정 업데이트

## 성능 모니터링
Vercel Analytics를 통해 자동으로 성능 모니터링 가능