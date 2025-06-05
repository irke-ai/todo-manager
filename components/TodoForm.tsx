'use client'

import { useState } from 'react'
import { useTodoStore } from '@/lib/store'

export default function TodoForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      addTodo(title.trim(), description.trim() || undefined)
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        새로운 할 일 추가
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명 (선택사항)"
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     resize-none"
        />
        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-500 text-white rounded-md 
                     hover:bg-blue-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          할 일 추가
        </button>
      </div>
    </form>
  )
}