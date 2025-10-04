'use client';

import AddTaskModal from '@/components/AddTaskModal';
import { useState } from 'react';

export default function NavBar() {
   const [IsModalOpen, setIsModalOpen] = useState(false);
   return (
      <div>
         <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-auto shrink-0"
         >
            + Add Task
         </button>

         <AddTaskModal isOpen={IsModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
   );
}
