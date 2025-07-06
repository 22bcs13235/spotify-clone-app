import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { usePlayer } from "../context/PlayerContext";

const Genre = () => {
  const { name } = useParams();
  const [tracks, setTracks] = useState([]);
  const { playSong } = usePlayer();

  useEffect(() => {
    const fetchGenreTracks = async () => {
      try {
        const response = await axios.get(
          `https://spotify23.p.rapidapi.com/search/`,
          {
            params: {
              q: name,
              type: "tracks",
              offset: "0",
              limit: "10",
              numberOfTopResults: "5",
            },
            headers: {
              "x-rapidapi-host": "spotify23.p.rapidapi.com",
              "x-rapidapi-key": "YOUR_API_KEY_HERE",
            },
          }
        );

        const items = response.data.tracks?.items || [];
        const cleaned = items
          .map((i) => i.data)
          .filter((t) => t?.name && t?.artists?.items?.length > 0);

        setTracks(cleaned);
      } catch (err) {
        console.error("Genre fetch error:", err);
      }
    };

    fetchGenreTracks();
  }, [name]);

  return (
    <div className="p-6 space-y-6 text-white">
      <h2 className="text-2xl font-bold mb-4">{name} Songs</h2>
      <ul className="space-y-4">
        {tracks.map((track, index) => {
          const artistNames = track.artists.items.map((a) => a.profile.name).join(", ");
          return (
            <li
              key={index}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
              onClick={() =>
                playSong({
                  name: track.name,
                  artist: artistNames,
                  preview_url: track.previewUrl || null,
                })
              }
            >
              <p className="text-lg font-bold">{track.name}</p>
              <p className="text-sm text-gray-400">{artistNames}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Genre;
