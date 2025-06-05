import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Todo Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          효율적인 할 일 관리를 시작하세요
        </p>
      </div>

      <div className="space-y-6">
        <TodoForm />
        <TodoList />
      </div>
    </main>
  )
}