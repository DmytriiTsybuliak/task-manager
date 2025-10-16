'use client';

import SearchBar from '@/app/(Admin)/dashboard/SearchBar';
import AddTaskModal from '@/components/AddTaskModal';
import Logout from '@/components/Logout';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-wrap justify-between items-center p-4 gap-6 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Task Dashboard</h1>
      <div className="flex gap-3 items-center ">
        <SearchBar />
        <Button onClick={() => setIsModalOpen(true)}>Create</Button>
      </div>
      <Logout />
      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
