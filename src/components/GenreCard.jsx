const GenreCard = ({ name, image }) => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg shadow hover:bg-[#2a2a2a] transition-all">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-2" />
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  );
};

export default GenreCard;
