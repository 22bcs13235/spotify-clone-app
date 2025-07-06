import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex items-center bg-[#2a2a2a] border border-[#444] rounded-full px-4 py-2 shadow w-full max-w-md">
      <FaSearch className="text-gray-400 text-sm mr-2" />
      <input
        type="text"
        placeholder="Search music..."
        className="bg-transparent outline-none text-sm text-white placeholder-gray-400 flex-1"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />
    </div>
  );
};

export default SearchBar;
