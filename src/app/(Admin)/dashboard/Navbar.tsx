'use client';

import AddTaskModal from '@/components/AddTaskModal';
import { useState } from 'react';

export default function NavBar() {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Task Dashboard</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-auto shrink-0"
      >
        Create
      </button>

      <AddTaskModal isOpen={IsModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
