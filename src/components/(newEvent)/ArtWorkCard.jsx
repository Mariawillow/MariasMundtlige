export default function ArtworkCard({ artwork, selected, onClick }) {
  const isSelected = selected.includes(artwork.id);

  return (
    <div onClick={() => onClick(artwork.id)} className={`aspect-square cursor-pointer rounded overflow-hidden border transition ${isSelected ? "ring-4 ring-lime-400 border-lime-500" : "border-gray-200"}`}>
      <img src={artwork.image_thumbnail} alt={artwork.titles.title} className="w-full h-full object-cover" />
      <h3>{artwork.titles.title}</h3>
    </div>
  );
}
