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

  if (isOpen === false) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: ITaskCard = {
      title,
      description,
      isCompleted: false,
      priority: 'medium',
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

  //  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  //     <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
  //       <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
  //       <form onSubmit={handleSubmit} className="flex flex-col gap-4"></form>
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4  ">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 rounded mb-2 w-full  text-black"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border p-2 rounded mb-2 w-full  text-black"
            rows={4}
          />
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
