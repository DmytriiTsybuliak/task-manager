export interface ITaskCard {
  createdAt?: string;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
  subtasks?: string[];
  tags: string[];
  title: string;
  description?: string;
  updatedAt?: string;
  userId?: string;
  _id: number;
}
