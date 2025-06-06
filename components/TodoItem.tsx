'use client'

import { memo } from 'react'
import { Todo } from '@/lib/types'
import { useTodoStore } from '@/lib/store'

interface TodoItemProps {
  todo: Todo
}

const TodoItem = memo(function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore()
  const priorityColors = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  }

  return (
    <div className={`p-4 rounded-md border ${
      todo.completed 
        ? 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700' 
        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
    }`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          aria-label={`${todo.title} ${todo.completed ? '완료됨' : '미완료'}`}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-medium ${
              todo.completed 
                ? 'line-through text-gray-500 dark:text-gray-400' 
                : 'text-gray-900 dark:text-white'
            }`}>
              {todo.title}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>
              {todo.priority === 'high' ? '높음' : todo.priority === 'medium' ? '중간' : '낮음'}
            </span>
          </div>
          {todo.description && (
            <p className={`text-sm mt-1 ${
              todo.completed 
                ? 'text-gray-400 dark:text-gray-500' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {todo.description}
            </p>
          )}
          {todo.dueDate && (
            <p className={`text-xs mt-2 ${
              todo.completed 
                ? 'text-gray-400 dark:text-gray-500' 
                : new Date(todo.dueDate) < new Date() 
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400'
            }`}>
              마감일: {new Date(todo.dueDate).toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
              {!todo.completed && new Date(todo.dueDate) < new Date() && ' (기한 초과)'}
            </p>
          )}
        </div>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded
                     focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={`${todo.title} 삭제`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
})

export default TodoItem