'use client'

import TodoItem from './TodoItem'
import { Todo } from '@/lib/types'

// Step 1에서는 하드코딩된 데이터 사용
const mockTodos: Todo[] = [
  {
    id: '1',
    title: '프로젝트 기획서 작성',
    description: '새로운 할 일 관리 앱 기획',
    priority: 'high',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: '장보기',
    description: '우유, 빵, 계란',
    priority: 'medium',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: '운동하기',
    priority: 'low',
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function TodoList() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        할 일 목록
      </h2>
      <div className="space-y-2">
        {mockTodos.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            할 일이 없습니다. 새로운 할 일을 추가해보세요!
          </p>
        ) : (
          mockTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        )}
      </div>
    </div>
  )
}