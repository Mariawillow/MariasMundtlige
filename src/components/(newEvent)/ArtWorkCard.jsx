export default function ArtworkCard({ artwork, selected, onClick }) {
  const isSelected = selected.includes(artwork.object_number);
  const title = artwork.titles?.[0]?.title || "Uden titel";
  const thumbnail = artwork.image_thumbnail || "/fallback.jpg"; // hvis billede mangler

  return (
    <div onClick={() => onClick(artwork.object_number)} className={`aspect-square cursor-pointer transition ${isSelected ? "border-[3px] border-[#C4FF00]" : "border-gray-200"}`}>
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
    </div>
  );
}
