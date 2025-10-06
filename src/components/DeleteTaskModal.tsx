import { useDeleteTask } from '@/lib/hooks/useCRUD';

export interface DeleteTaskModalProps {
  isOpen?: boolean;
  title?: string;
  id?: string;
  onClose?: () => void;
}

export default function DeleteTaskModal({ isOpen, title, id, onClose }: DeleteTaskModalProps) {
  const deleteTask = useDeleteTask();
  if (isOpen === false) return null;

  const handleDelete = () => {
    deleteTask.mutate(id!);
    if (onClose) onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl animate-fadeIn"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Confirm Delete
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this task:{' '}
          <span className="font-medium text-gray-900 dark:text-gray-100">{title}</span>? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
