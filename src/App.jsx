import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Playlist from './pages/Playlist';
import Album from './pages/Album';
import Genre from './pages/Genre';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PlayerControls from './components/PlayerControls';
import { PlayerProvider } from './context/PlayerContext';

function App() {
  return (
    <PlayerProvider>
      <Router>
        <div className="flex h-screen bg-gray-900 text-white">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/playlist/:id" element={<Playlist />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/genre/:name" element={<Genre />} />
              </Routes>
            </div>

            {/* Sticky Music Player */}
            <PlayerControls />
          </div>
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;
