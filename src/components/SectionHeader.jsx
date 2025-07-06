const SectionHeader = ({ title }) => {
  if (!title || typeof title !== 'string' || title.trim() === '') return null;

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <button className="text-sm text-gray-400 hover:underline">Show all</button>
    </div>
  );
};

export default SectionHeader;
