"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { firstArtImgHelper } from "@/lib/firstArtImgHelper"; // Importér din helper
import artPlaceholder from "@/images/artPlaceholder.png";

export default function ArtworkCard({ artwork, selectedIds = [], onClick, disableSelect = false }) {
  // Referencen til DOM-elementet, så vi kan animere det med GSAP
  const cardRef = useRef();

  // State til thumbnail-URL, vi henter den asynkront via helperen
  const [thumbnail, setThumbnail] = useState(artPlaceholder.src || artPlaceholder);

  // Tjek om dette artwork er valgt
  const isSelected = selectedIds.includes(artwork.object_number);

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

  // Funktioner der animere kort og kalder onClick callback, når animationen er færdig
  const handleClick = () => {
    if (disableSelect && !isSelected) return;

    // Klik-animation
    gsap.fromTo(
      cardRef.current,
      { scale: 1 },
      {
        scale: 0.95,
        duration: 0.2,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          onClick(artwork.object_number);
        },
      }
    );
  };

  return (
    <article>
      <div
        ref={cardRef}
        onClick={handleClick}
        className={`relative group aspect-square
        ${isSelected ? "border-[3px] border-[#C4FF00]" : ""}
        ${!disableSelect ? "hover:border-[3px] hover:border-[#C4FF00]" : ""}
        ${disableSelect && !isSelected ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      >
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />

        {/* Overlay, men kun hvis disableSelect er false */}
        {!disableSelect && <div className="absolute inset-0 bg-[#DAD6DD] opacity-0 group-hover:opacity-65 pointer-events-none"></div>}
      </div>
      <h6 className="truncate">{artwork.artist}</h6>
    </article>
  );
}
