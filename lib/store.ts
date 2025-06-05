import { create } from 'zustand'
import { Todo } from './types'

interface TodoStore {
  todos: Todo[]
  addTodo: (title: string, description?: string, priority?: Todo['priority'], dueDate?: Date) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  updateTodo: (id: string, updates: Partial<Todo>) => void
  
  // 필터링 상태
  filter: {
    status: 'all' | 'active' | 'completed'
    priority: 'all' | Todo['priority']
  }
  setFilter: (filter: Partial<TodoStore['filter']>) => void
  
  // 정렬 상태
  sortBy: 'createdAt' | 'dueDate' | 'priority'
  sortOrder: 'asc' | 'desc'
  setSort: (sortBy: TodoStore['sortBy'], sortOrder?: TodoStore['sortOrder']) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  filter: { status: 'all', priority: 'all' },
  sortBy: 'createdAt',
  sortOrder: 'desc',
  
  addTodo: (title, description, priority = 'medium', dueDate) => set((state) => ({
    todos: [
      ...state.todos,
      {
        id: Date.now().toString(),
        title,
        description,
        priority,
        dueDate,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })),
  
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ),
  })),
  
  updateTodo: (id, updates) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id
        ? { ...todo, ...updates, updatedAt: new Date() }
        : todo
    ),
  })),
  
  setFilter: (filter) => set((state) => ({
    filter: { ...state.filter, ...filter },
  })),
  
  setSort: (sortBy, sortOrder) => set((state) => ({
    sortBy,
    sortOrder: sortOrder || state.sortOrder,
  })),
}))

// 필터링된 할 일 목록을 반환하는 selector
export const useFilteredTodos = () => {
  const { todos, filter, sortBy, sortOrder } = useTodoStore()
  
  // 필터링
  let filtered = todos.filter((todo) => {
    if (filter.status !== 'all') {
      if (filter.status === 'active' && todo.completed) return false
      if (filter.status === 'completed' && !todo.completed) return false
    }
    if (filter.priority !== 'all' && todo.priority !== filter.priority) {
      return false
    }
    return true
  })
  
  // 정렬
  filtered.sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'createdAt':
        comparison = a.createdAt.getTime() - b.createdAt.getTime()
        break
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) comparison = 0
        else if (!a.dueDate) comparison = 1
        else if (!b.dueDate) comparison = -1
        else comparison = a.dueDate.getTime() - b.dueDate.getTime()
        break
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })
  
  return filtered
}