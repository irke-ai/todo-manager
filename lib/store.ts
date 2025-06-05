import { create } from 'zustand'
import { Todo } from './types'

interface TodoStore {
  todos: Todo[]
  addTodo: (title: string, description?: string) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  updateTodo: (id: string, updates: Partial<Todo>) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  
  addTodo: (title, description) => set((state) => ({
    todos: [
      ...state.todos,
      {
        id: Date.now().toString(),
        title,
        description,
        priority: 'medium' as const,
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
}))