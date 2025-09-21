import { useUpdateTask } from '@/lib/hooks/react-query';
import { ITaskCard } from '@/lib/types/types';
import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import { useHasChanges } from '@/lib/hooks/useHasChanges';
import DeleteTaskModal from '@/components/DeleteTaskModal';

export default function TaskCard(task: ITaskCard) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task);
  const updateTask = useUpdateTask();
  const ref = useRef<HTMLDivElement | null>(null);
  const hasChanges = useHasChanges(draft, task);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setDraft(task);
  }, [task]);

  const saveChanges = () => {
    if (!hasChanges) return setIsEditing(false);
    const { _id, ...cleanTask } = draft;
    updateTask.mutate({ taskID: _id!, newTask: cleanTask });
    setIsEditing(false);
  };

  useClickOutside(ref, () => {
    if (isEditing) {
      saveChanges();
    }
  });

  return (
    <div ref={ref}>
      <li className="bg-white/95 max-w-60 min-h-72 max-h-90 dark:bg-gray-800 rounded-2xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700">
        {/* Title*/}
        <input
          type="text"
          value={draft.title}
          onChange={e => setDraft({ ...draft, title: e.target.value })}
          onClick={() => setIsEditing(true)}
          className={`font-semibold text-lg w-full bg-transparent border-b focus:outline-none ${
            isEditing ? 'border-blue-400' : 'border-transparent'
          } text-gray-900 dark:text-gray-100`}
          readOnly={!isEditing}
        />

        {/* Description*/}
        <textarea
          placeholder="Description"
          value={draft.description}
          onChange={e => setDraft({ ...draft, description: e.target.value })}
          onClick={() => setIsEditing(true)}
          className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2 overflow-y-auto text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
          readOnly={!isEditing}
        />

        {/* Completed*/}
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 ">
          <input
            type="checkbox"
            checked={draft.isCompleted}
            onChange={e => setDraft({ ...draft, isCompleted: e.target.checked })}
            onClick={() => setIsEditing(true)}
            className="h-4 w-4 accent-green-500"
          />
          Completed
        </label>

        {/* Priority*/}
        <select
          value={draft.priority}
          onChange={e =>
            setDraft({
              ...draft,
              priority: e.target.value as 'low' | 'medium' | 'high' | undefined,
            })
          }
          onClick={() => setIsEditing(true)}
          className="rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm p-2 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-400"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        {/* Tags UI */}
        <div className="flex flex-wrap gap-2 mt-1 overflow-y-auto">
          {draft.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 dark:bg-blue-300 text-blue-700 px-2 py-1 rounded text-xs flex items-center gap-1"
            >
              #{tag}
              {isEditing && (
                <button
                  type="button"
                  className="ml-1 text-red-500 hover:text-red-700"
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
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-lg text-xs focus:outline-none"
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
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className=" text-black bg-gray-300 hover:bg-gray-600 dark:text-white hover:text-black dark:bg-transparent dark:hover:bg-white transition-all duration-200 rounded-xl"
        >
          🗑 Delete
        </button>
        <DeleteTaskModal
          isOpen={isModalOpen}
          title={draft.title}
          id={draft._id}
          onClose={() => setIsModalOpen(false)}
        />
      </li>
    </div>
  );
}
