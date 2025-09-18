import { useCreateTask } from '@/lib/hooks/react-query';
import { ITaskCard } from '@/lib/types/types';
import { useState } from 'react';

interface AddTaskModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}
export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const createTask = useCreateTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | undefined>('medium');
  const [error, setError] = useState('');

  if (isOpen === false) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') {
      setError('Title is required');
      return;
    } else {
      setError('');
    }
    const newTask: ITaskCard = {
      title,
      description,
      isCompleted: false,
      priority,
      tags: [],
    };
    createTask.mutate(newTask, {
      onSuccess: () => {
        setTitle('');
        setDescription('');
        if (onClose) onClose();
      },
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4  ">
          <div>
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                setError('');
              }}
              className={`border p-2 rounded mb-2 w-full text-black ${
                error ? 'border-red-500' : ''
              }`}
            />
            {error && <p className="text-red-500 text-sm p-0">{error}</p>}
          </div>

          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border p-2 rounded mb-2 w-full  text-black"
            rows={4}
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="border p-2 rounded mb-2 w-full  text-black"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border bg-gray-200 hover:bg-gray-300 transition-colors duration-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded border bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-400"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
