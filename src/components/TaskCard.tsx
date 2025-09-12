import { useDeleteTask, useUpdateTask } from '@/lib/hooks/react-query';
import { ITaskCard } from '@/lib/types/types';
import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import { useHasChanges } from '@/lib/hooks/useHasChanges';

export default function TaskCard(task: ITaskCard) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const ref = useRef<HTMLDivElement | null>(null);
  const hasChanges = useHasChanges(draft, task);

  useEffect(() => {
    setDraft(task);
  }, [task]);

  useClickOutside(ref, () => {
    if (isEditing) {
      if (!hasChanges) {
        setIsEditing(false);
        return;
      }
      const { _id, ...cleanTask } = draft;
      // if (!_id) throw new Error('Task has no _id');
      // // it's 100% sure that _id exists here, so I commented this out, and use non-null assertion below
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
      <li className="border p-4 rounded shadow bg-black/95 flex flex-col gap-2">
        {/* bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow */}
        <input
          type="text"
          value={draft.title}
          onChange={e => setDraft({ ...draft, title: e.target.value })}
          onClick={() => setIsEditing(true)}
          className="border-b bg-transparent w-full text-white"
          readOnly={!isEditing}
        />
        <textarea
          placeholder="Description"
          value={draft.description}
          onChange={e => setDraft({ ...draft, description: e.target.value })}
          onClick={() => setIsEditing(true)}
          className="border p-2 rounded w-full  text-white"
          rows={3}
          readOnly={!isEditing}
        />
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={draft.isCompleted}
            onChange={e => setDraft({ ...draft, isCompleted: e.target.checked })}
            onClick={() => setIsEditing(true)}
          />
          Completed
        </label>
        {/* Priority UI */}
        <select
          value={draft.priority}
          onChange={e =>
            setDraft({
              ...draft,
              priority: e.target.value as 'low' | 'medium' | 'high' | undefined,
            })
          }
          onClick={() => setIsEditing(true)}
          className="border p-2 rounded bg-black/90 text-white"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        {/* Tags UI */}
        <div className="flex flex-wrap gap-2 mt-2">
          {draft.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
            >
              {tag}
              {isEditing && (
                <button
                  type="button"
                  className="ml-1 text-red-400"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      tags: draft.tags?.filter((_, i) => i !== idx),
                    })
                  }
                >
                  ×
                </button>
              )}
            </span>
          ))}
          {isEditing && (
            <input
              type="text"
              placeholder="Add tag"
              className="bg-gray-800 text-white px-2 py-1 rounded text-xs"
              onKeyDown={e => {
                if (
                  e.key === 'Enter' &&
                  e.currentTarget.value.trim() &&
                  (!draft.tags || !draft.tags.includes(e.currentTarget.value.trim()))
                ) {
                  setDraft({
                    ...draft,
                    tags: [...(draft.tags ?? []), e.currentTarget.value.trim()],
                  });
                  e.currentTarget.value = '';
                }
              }}
            />
          )}
        </div>

        <button type="button" onClick={handleDeleteTask} className="text-red-500">
          delete
        </button>
      </li>
    </div>
  );
}
