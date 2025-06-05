# Todo Manager

효율적인 할 일 관리를 위한 웹 애플리케이션

## 🚀 주요 기능

- ✅ **할 일 관리**: 추가, 수정, 삭제, 완료 체크
- 🎯 **우선순위 설정**: 높음/중간/낮음 3단계
- 📅 **마감일 관리**: 날짜 및 시간 설정, 기한 초과 알림
- 🔍 **필터링 & 정렬**: 상태별, 우선순위별 필터 및 다양한 정렬 옵션
- 💾 **자동 저장**: LocalStorage를 통한 데이터 영속성
- 🌓 **다크모드**: 시스템 테마 연동 및 수동 전환
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Deployment**: Vercel

## 🏃‍♂️ 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

## 📸 스크린샷

### 라이트 모드
- 깔끔하고 밝은 인터페이스
- 직관적인 UI/UX

### 다크 모드
- 눈의 피로를 줄이는 어두운 테마
- 모든 컴포넌트 다크모드 최적화

## 🔧 주요 컴포넌트

- `TodoForm`: 할 일 추가 폼
- `TodoList`: 할 일 목록 컨테이너
- `TodoItem`: 개별 할 일 아이템
- `TodoFilters`: 필터 및 정렬 컨트롤
- `ThemeToggle`: 다크모드 전환 버튼

## 📝 개발 과정

이 프로젝트는 5단계로 개발되었습니다:

1. **Step 1**: 기본 UI 구조 및 컴포넌트 설계
2. **Step 2**: CRUD 기능 구현 (Zustand)
3. **Step 3**: 고급 기능 추가 (우선순위, 마감일, 필터링)
4. **Step 4**: 데이터 영속성 및 다크모드
5. **Step 5**: 최적화 및 배포

## 🚀 배포

이 프로젝트는 Vercel에 배포되어 있습니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/irke-ai/todo-manager)

## 📄 라이선스

MIT License

---

Made with ❤️ by [irke-ai](https://github.com/irke-ai)