'use client'

import { useState } from 'react'

export default function TodoForm() {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Step 2에서 실제 기능 구현
    console.log('Todo added:', title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        새로운 할 일 추가
      </h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md 
                     hover:bg-blue-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          추가
        </button>
      </div>
    </form>
  )
}