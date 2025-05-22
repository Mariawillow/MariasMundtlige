import ArtworkCard from "./ArtWorkCard";

export default function ArtworkGrid({ artworks, selectedArtworks, toggleArtwork }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} selected={selectedArtworks} onClick={toggleArtwork} />
      ))}
    </div>
  );
}
