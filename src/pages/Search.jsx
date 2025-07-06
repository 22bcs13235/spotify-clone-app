import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SongCard from '../components/SongCard';
import { usePlayer } from '../context/PlayerContext';

const Search = () => {
  const query = new URLSearchParams(useLocation().search).get('q') || '';
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { playSong } = usePlayer();

  const fetchSearchResults = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(
          query
        )}&type=multi&offset=0&limit=10&numberOfTopResults=5`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'spotify23.p.rapidapi.com',
            'x-rapidapi-key': 'YOUR_API_KEY_HERE',
          },
        }
      );

      const data = await response.json();

      const trackResults = data.tracks?.items?.map((item) => {
        const track = item.data;
        return {
          id: track.id,
          title: track.name,
          artist: track.artists?.items?.[0]?.profile?.name || 'Unknown Artist',
          image:
            track.albumOfTrack?.coverArt?.sources?.[0]?.url ||
            '/assets/default.jpg',
          audio: track.previewUrl || null,
        };
      });

      setSongs(trackResults || []);
    } catch (err) {
      console.error('Search error:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for "{query}"
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : songs.length === 0 ? (
        <p className="text-gray-400">No songs found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {songs.map((song) => (
            <div
              key={song.id}
              className="cursor-pointer"
              onClick={() => playSong(song)}
            >
              <SongCard song={song} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
