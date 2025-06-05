'use client'

import { useTodoStore } from '@/lib/store'

export default function TodoFilters() {
  const { filter, sortBy, sortOrder, setFilter, setSort } = useTodoStore()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 상태 필터 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            상태
          </label>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ status: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">전체</option>
            <option value="active">진행 중</option>
            <option value="completed">완료</option>
          </select>
        </div>

        {/* 우선순위 필터 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            우선순위
          </label>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ priority: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">전체</option>
            <option value="high">높음</option>
            <option value="medium">중간</option>
            <option value="low">낮음</option>
          </select>
        </div>

        {/* 정렬 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            정렬
          </label>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSort(e.target.value as any)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="createdAt">생성일</option>
              <option value="dueDate">마감일</option>
              <option value="priority">우선순위</option>
            </select>
            <button
              onClick={() => setSort(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              title={sortOrder === 'asc' ? '오름차순' : '내림차순'}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}