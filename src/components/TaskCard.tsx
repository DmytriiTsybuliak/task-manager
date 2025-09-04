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
      const taskID = draft._id;
      updateTask.mutate({ taskID, newTask: draft });
      setIsEditing(false);
    }
  });

  return (
    <div ref={ref}>
      <li className="border p-4 rounded shadow bg-black/95">
        <h3 className="text-lg text-white">{task.title}</h3>
        <p>{task.description}</p>
        <p>Priority: {task.priority}</p>
        <p>Completed: {task.isCompleted ? 'Yes' : 'No'}</p>
        {/* <p>Tags: {tags.join(', ')}</p> */}
        {/* <p>Subtasks: {subtasks ? subtasks.join(', ') : ''}</p> */}
        {/* <p>User ID: {userId}</p> */}
      </li>
    </div>
  );
}
