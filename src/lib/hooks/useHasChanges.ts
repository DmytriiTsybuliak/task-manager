import { ITaskCard } from '@/lib/types/types';
import { useMemo } from 'react';

export function useHasChanges(draft: ITaskCard, original: ITaskCard): boolean {
   return useMemo(() => {
      if (!original || !draft) return false;
      return (
         draft.title !== original.title ||
         draft.description !== original.description ||
         draft.isCompleted !== original.isCompleted ||
         draft.priority !== original.priority ||
         JSON.stringify(draft.tags) !== JSON.stringify(original.tags) ||
         JSON.stringify(draft.subtasks) !== JSON.stringify(original.subtasks)
      );
   }, [draft, original]);
}
