import { useDeleteTask } from '@/lib/hooks/react-query';

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
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg"
      >
        <p>{`Are you sure you want to delete this task "${title}"?`}</p>

        <button onClick={handleDelete} className="">
          Delete
        </button>
        <button onClick={onClose} className="ml-4">
          Cancel
        </button>
      </div>
    </div>
  );
}
