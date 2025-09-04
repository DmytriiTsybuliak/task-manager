import { useUpdateTask } from '@/lib/hooks/react-query';
import { ITaskCard } from '@/lib/types/types';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/lib/hooks/useClickOutside';

export default function TaskCard(task: ITaskCard) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task);
  const updateTask = useUpdateTask();
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => {
    if (isEditing) {
      const taskID = draft._id!;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, createdAt, updatedAt, userId, ...cleanTask } = draft;
      updateTask.mutate({ taskID, newTask: cleanTask });
      setIsEditing(false);
    }
  });

  return (
    <div ref={ref}>
      {isEditing ? (
        <li className="border p-4 rounded shadow bg-black/95">
          <input
            type="text"
            value={draft.title}
            onChange={e => setDraft({ ...draft, title: e.target.value })}
            className="border-b bg-transparent w-full text-white"
            autoFocus
          />
        </li>
      ) : (
        <li className="border p-4 rounded shadow bg-black/95">
          <h3 onClick={() => setIsEditing(true)} className="text-lg text-white">
            {task.title}
          </h3>
        </li>
      )}
    </div>
  );
}
