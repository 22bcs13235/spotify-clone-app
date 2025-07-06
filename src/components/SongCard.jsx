import { usePlayer } from '../context/PlayerContext';

const SongCard = ({ song }) => {
  const { playTrack } = usePlayer();

  return (
    <div
      onClick={() => playTrack(song)}
      className="cursor-pointer p-4 bg-gray-800 rounded hover:bg-gray-700"
    >
      <img src={song.image} alt={song.title} className="w-full h-40 object-cover rounded mb-2" />
      <p className="text-lg font-semibold">{song.title}</p>
      <p className="text-sm text-gray-400">{song.artist}</p>
    </div>
  );
};

export default SongCard;
