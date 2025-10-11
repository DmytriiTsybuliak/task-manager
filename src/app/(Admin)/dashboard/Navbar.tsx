'use client';

import SearchBar from '@/app/(Admin)/dashboard/SearchBar';
import AddTaskModal from '@/components/AddTaskModal';
import { useState } from 'react';

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-wrap justify-between items-center p-4 gap-6 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Task Dashboard</h1>
      <SearchBar />
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-auto shrink-0"
      >
        Create
      </button>

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
