import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePlayer } from '../context/PlayerContext';

const Playlist = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const { playSong } = usePlayer();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get(
          `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=20`,
          {
            headers: {
              'x-rapidapi-host': 'spotify23.p.rapidapi.com',
              'x-rapidapi-key': 'YOUR_API_KEY_HERE',
            },
          }
        );
        const items = res.data.items.map((item) => ({
          id: item.track.id,
          title: item.track.name,
          artist: item.track.artists?.[0]?.name || 'Unknown',
          image: item.track.album.images?.[0]?.url,
          previewUrl: item.track.preview_url,
        }));
        setTracks(items);
      } catch (err) {
        console.error('Playlist fetch error:', err);
      }
    };

    fetchPlaylist();
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Playlist Tracks</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => playSong(track)}
          >
            <img src={track.image} alt={track.title} className="w-full h-40 object-cover rounded mb-3" />
            <h3 className="text-lg font-semibold">{track.title}</h3>
            <p className="text-sm text-gray-400">{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
