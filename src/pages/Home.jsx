import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import PlaylistCard from "../components/PlaylistCard";
import AlbumCard from "../components/AlbumCard";
import GenreCard from "../components/GenreCard";

// ✅ Import images from src/assets
import playlist1 from "../assets/playlist1.jpg";
import playlist2 from "../assets/playlist2.jpg";
import album1 from "../assets/album1.jpg";
import album2 from "../assets/album2.jpg";
import genre1 from "../assets/genre1.jpg";
import genre2 from "../assets/genre2.jpg";

const playlists = [
  {
    id: "37i9dQZF1DX4Wsb4d7NKfP",
    title: "Top Hits",
    image: playlist1,
  },
  {
    id: "37i9dQZF1DWXRqgorJj26U",
    title: "Mood Booster",
    image: playlist2,
  },
];

const albums = [
  {
    id: "4aawyAB9vmqN3uQ7FjRGTy",
    title: "Starboy",
    image: album1,
  },
  {
    id: "6JWc4iAiJ9FjyK0B59ABb4",
    title: "After Hours",
    image: album2,
  },
];

const genres = [
  {
    name: "pop",
    title: "Pop",
    image: genre1,
  },
  {
    name: "hiphop",
    title: "Hip Hop",
    image: genre2,
  },
];

const Home = () => {
  return (
    <div className="p-6 space-y-12">
      {/* Playlists */}
      <div>
        <SectionHeader title="Playlists" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
              <PlaylistCard title={playlist.title} image={playlist.image} />
            </Link>
          ))}
        </div>
      </div>

      {/* Albums */}
      <div>
        <SectionHeader title="Albums" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {albums.map((album) => (
            <Link to={`/album/${album.id}`} key={album.id}>
              <AlbumCard title={album.title} image={album.image} />
            </Link>
          ))}
        </div>
      </div>

      {/* Genres */}
      <div>
        <SectionHeader title="Genres" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link to={`/genre/${genre.name}`} key={genre.name}>
              <GenreCard title={genre.title} image={genre.image} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
