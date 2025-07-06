import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-[#1e1e1e] text-white p-6 space-y-6 shadow-lg">
      <h1 className="text-2xl font-bold tracking-wide">Spotify 2.0</h1>
      <nav className="space-y-3 text-gray-300">
        <Link to="/" className="block hover:text-[#1db954] transition">Home</Link>
        <Link to="/search" className="block hover:text-[#1db954] transition">Search</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
