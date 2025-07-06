import SongCard from './SongCard';
import SectionHeader from './SectionHeader';

const TrendingSection = ({ songs }) => {
  return (
    <div className="mb-12">
      <SectionHeader title="Trending songs" />
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
        {songs.map((song) => (
          <div key={song.id} className="min-w-[160px]">
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
