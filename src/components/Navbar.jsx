import SearchBar from './SearchBar';
import userImage from '../assets/image1.png'; // ✅ Import the image

const Navbar = () => {
  return (
    <div className="bg-[#121212] px-6 py-4 flex justify-between items-center shadow-md z-10">
      {/* Search Bar */}
      <SearchBar />

      {/* Right Side: Button + Avatar */}
      <div className="ml-4 flex items-center gap-4">
        {/* Upgrade Button */}
        <button className="bg-[#1db954] text-black text-sm px-4 py-1.5 rounded-full font-semibold hover:bg-[#1ed760] transition-all shadow-sm">
          Upgrade
        </button>

        {/* Avatar */}
        <img
          src={userImage} // ✅ use imported image
          alt="User"
          className="w-9 h-9 rounded-full object-cover border border-gray-600 hover:scale-105 transition"
        />
      </div>
    </div>
  );
};

export default Navbar;
