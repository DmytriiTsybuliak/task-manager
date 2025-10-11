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
    <div className="relative w-64 sm:w-80 md:w-96">
      <svg
        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
      </svg>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full rounded-lg py-2 pl-8 pr-4 text-sm text-gray-900  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </form>
    </div>
  );
}
