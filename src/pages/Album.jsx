import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePlayer } from "../context/PlayerContext";

const Album = () => {
  const { id } = useParams();
  const { playSong } = usePlayer();

  const [tracks, setTracks] = useState([]);
  const [albumName, setAlbumName] = useState("Album");
  const [albumImage, setAlbumImage] = useState("");

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        // 1. Fetch album tracks
        const trackRes = await axios.get(
          "https://spotify23.p.rapidapi.com/album_tracks/",
          {
            params: { id, offset: "0", limit: "20" },
            headers: {
              "X-RapidAPI-Key": "YOUR_API_KEY_HERE",
              "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
            },
          }
        );

        const trackItems = trackRes.data.data.album.tracks.items;
        setTracks(trackItems || []);

        // 2. Fetch album metadata (image, name)
        const metaRes = await axios.get(
          "https://spotify23.p.rapidapi.com/album_metadata/",
          {
            params: { id },
            headers: {
              "X-RapidAPI-Key": "261454fee3msh44a3ffec9f7083ep1b885fjsn6f9468954853",
              "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
            },
          }
        );

        const album = metaRes.data.data.album;
        setAlbumName(album.name || "Album");
        setAlbumImage(album.coverArt?.sources?.[0]?.url || "");
      } catch (error) {
        console.error("Album fetch error:", error);
      }
    };

    fetchAlbumData();
  }, [id]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-6 mb-6">
        {albumImage && (
          <img
            src={albumImage}
            alt={albumName}
            className="w-32 h-32 object-cover rounded-lg shadow"
          />
        )}
        <h1 className="text-3xl font-bold">{albumName}</h1>
      </div>

      {tracks.length === 0 ? (
        <p>No tracks found.</p>
      ) : (
        <ul className="space-y-4">
          {tracks.map((item, index) => {
            const track = item.track;
            const artistNames = Array.isArray(track?.artists)
              ? track.artists.map((a) => a.name).join(", ")
              : "Unknown Artist";

            return (
              <li
                key={index}
                className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                onClick={() =>
                  playSong({
                    title: track?.name || "Untitled",
                    artist: artistNames,
                    image: track?.album?.images?.[0]?.url || albumImage,
                    audio: track?.preview_url || "", // Optional: no preview in this API usually
                  })
                }
              >
                <p className="text-lg font-bold">{track?.name || "Untitled"}</p>
                <p className="text-sm text-gray-400">{artistNames}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Album;
