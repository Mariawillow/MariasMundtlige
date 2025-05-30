import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { firstArtImgHelper } from "@/lib/firstArtImgHelper"; // Importér din helper
import artPlaceholder from "@/images/artPlaceholder.png";

export default function ArtworkCard({ artwork, selected, onClick }) {
  // Referencen til DOM-elementet, så vi kan animere det med GSAP
  const cardRef = useRef();

  // State til thumbnail-URL, vi henter den asynkront via helperen
  const [thumbnail, setThumbnail] = useState(artPlaceholder.src || artPlaceholder);

  // Tjek om dette artwork er valgt
  const isSelected = selected.includes(artwork.object_number);

  // Titel fallback
  const title = artwork.titles?.[0]?.title || "Uden titel";

  useEffect(() => {
    // Hent billed-URL ved hjælp af helperen, som tager artworkIds
    // Her laver vi et array med kun dette artworks ID (da helper forventer artworkIds-array)
    async function fetchThumbnail() {
      const url = await firstArtImgHelper([artwork.object_number]);
      setThumbnail(url);
    }

    fetchThumbnail();
  }, [artwork.object_number]);

  const imgUrl = thumbnail;

  // Funktioner der animere kort og kalder onClick callback, når animationen er færdig
  const handleClick = () => {
    if (!cardRef.current) return; // Sikkerhedstjek: hvis DOM-elementet ikke findes, gør ingenting
    gsap.to(cardRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        // Når animationen er færdig, kald onClick callback med objektets nummer
        onClick(artwork.object_number); // Fjern kortet efter animation
      },
    });
  };

  return (
    <div ref={cardRef} onClick={handleClick} className={`aspect-square cursor-pointer transition ${isSelected ? "border-[3px] border-[#C4FF00]" : "border-gray-200"}`}>
      <img src={imgUrl} alt={title} className="w-full h-full object-cover" />
    </div>
  );
}
