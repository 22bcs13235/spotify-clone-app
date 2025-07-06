import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
} from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';

const PlayerBar = () => {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying, currentTrack]);

  // Update progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [currentTrack]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const formatTime = (sec) => {
    if (isNaN(sec)) return '0:00';
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 text-white px-4 py-3 flex items-center justify-between">
      {/* Audio tag */}
      <audio ref={audioRef} src={currentTrack.audio} />

      {/* Left: Song Info */}
      <div className="flex items-center gap-4 w-1/3">
        <img
          src={currentTrack.image}
          alt={currentTrack.title}
          className="w-12 h-12 object-cover rounded"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{currentTrack.title}</span>
          <span className="text-sm text-gray-400">{currentTrack.artist}</span>
        </div>
      </div>

      {/* Center: Controls & Progress */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-6 mb-1">
          <button disabled><FaStepBackward size={16} /></button>
          <button onClick={togglePlay}>
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button disabled><FaStepForward size={16} /></button>
        </div>
        <div className="flex items-center gap-2 text-xs w-full">
          <span>{formatTime(progress)}</span>
          <div className="h-1 bg-gray-600 rounded w-full relative">
            <div
              className="h-1 bg-green-500 rounded absolute top-0 left-0"
              style={{ width: `${(progress / duration) * 100 || 0}%` }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume */}
      <div className="flex items-center gap-3 w-1/3 justify-end pr-4">
        <FaVolumeUp />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 h-1 accent-green-500"
        />
      </div>
    </div>
  );
};

export default PlayerBar;
