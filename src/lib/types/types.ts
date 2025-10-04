export interface ITaskCard {
   isCompleted?: boolean;
   priority?: 'low' | 'medium' | 'high';
   subtasks?: string[];
   tags?: string[];
   title: string;
   description?: string;
   userId?: string;
   _id?: string;
}
