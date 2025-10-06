import { useTasks } from '@/lib/hooks/useCRUD';
import { useState } from 'react';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const { refetch } = useTasks(searchValue, true);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
      </form>
    </div>
  );
}
