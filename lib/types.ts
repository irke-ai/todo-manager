export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

export type SortType = 'date' | 'priority' | 'dueDate';