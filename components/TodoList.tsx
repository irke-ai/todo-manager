'use client'

import TodoItem from './TodoItem'
import { useTodoStore } from '@/lib/store'

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        할 일 목록
      </h2>
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            할 일이 없습니다. 새로운 할 일을 추가해보세요!
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        )}
      </div>
    </div>
  )
}