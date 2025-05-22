import ArtworkCard from "./ArtWorkCard";

// export default function ArtworkGrid({ artworks, selectedArtworks, toggleArtwork }) {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {artworks.map((artwork) => (
//         <ArtworkCard key={artwork.id} artwork={artwork} selected={selectedArtworks} onClick={toggleArtwork} />
//       ))}
//     </div>
//   );
// }

export default function ArtworkGrid({ artworks, selectedArtworks, toggleArtwork }) {
  if (!artworks.length) {
    return <p className="text-center text-gray-500">Ingen værker fundet i den valgte periode.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} selected={selectedArtworks} onClick={toggleArtwork} />
      ))}
    </div>
  );
}
