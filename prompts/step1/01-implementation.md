# Step 1: 기본 설정 및 UI 구조 구현

## 목표
Next.js 프로젝트를 초기화하고 기본적인 UI 구조를 구현합니다.

## 참조 문서
- 프로젝트 기획: /projects/todo-manager/docs/planning.md
- 개발 명세: /projects/todo-manager/docs/development.md
- Next.js 가이드: /references/frameworks/frontend/nextjs/README.md

## 구현 작업

### 1. Next.js 프로젝트 생성
```bash
cd projects/todo-manager
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*"
```

### 2. 프로젝트 구조 설정
다음 폴더와 파일을 생성하세요:
- components/ - React 컴포넌트
- lib/ - 유틸리티 및 타입 정의
- 불필요한 파일 정리

### 3. 기본 타입 정의
lib/types.ts 파일을 생성하고 Todo 인터페이스를 정의하세요.

### 4. 레이아웃 구현
app/layout.tsx를 수정하여:
- 모던한 폰트 적용 (Inter)
- 기본 메타데이터 설정
- 전역 스타일 적용

### 5. 메인 페이지 구조
app/page.tsx를 수정하여:
- 페이지 제목
- TodoForm 컴포넌트 위치
- TodoList 컴포넌트 위치

### 6. 컴포넌트 구현
다음 컴포넌트들을 구현하세요:
- components/TodoForm.tsx - 할 일 추가 폼 (UI만)
- components/TodoList.tsx - 할 일 목록 컨테이너 (하드코딩된 데이터)
- components/TodoItem.tsx - 개별 할 일 항목 표시

### 7. 스타일링
Tailwind CSS를 사용하여:
- 모던하고 깔끔한 디자인
- 카드 기반 레이아웃
- 적절한 여백과 그림자
- 반응형 디자인 기초

## 주의사항
- 이번 Step에서는 UI 구조만 구현합니다
- 상태관리나 실제 기능은 다음 Step에서 구현합니다
- 하드코딩된 샘플 데이터를 사용해도 괜찮습니다

## 완료 조건
- 개발 서버가 정상적으로 실행됨
- 기본 UI 구조가 화면에 표시됨
- 모든 컴포넌트가 렌더링됨
- TypeScript 에러가 없음