import { useDeleteTask, useUpdateTask } from '@/lib/hooks/react-query';
import { ITaskCard } from '@/lib/types/types';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/lib/hooks/useClickOutside';

export default function TaskCard(task: ITaskCard) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => {
    if (isEditing) {
      const { _id, ...cleanTask } = draft;
      // if (!_id) throw new Error('Task has no _id'); // it's 100% sure that _id exists here, so I commented this out, and use non-null assertion below
      const taskID = _id!;
      updateTask.mutate({ taskID, newTask: cleanTask });
      setIsEditing(false);
    }
  });
  const handleDeleteTask = () => {
    const confirmDelete = window.confirm(`Удалить задачу "${task.title}"?`);
    if (!confirmDelete) return;
    deleteTask.mutate(task._id!);
  };

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
          <button type="button" onClick={handleDeleteTask}>
            delete
          </button>
        </li>
      )}
    </div>
  );
}
