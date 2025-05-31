"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { firstArtImgHelper } from "@/lib/firstArtImgHelper"; // Importér din helper
import artPlaceholder from "@/images/artPlaceholder.png";

export default function ArtworkCard({ artwork, selected, onClick, disableSelect }) {
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
    // Hvis kortet allerede er valgt → vi TILLADER man kan fjerne det!
    if (isSelected) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          onClick(artwork.object_number);
        },
      });
      return;
    }

    // Hvis maks er nået → gør ingenting
    if (disableSelect) return;

    // Ellers normal animation
    gsap.to(cardRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        onClick(artwork.object_number);
      },
    });
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={`aspect-square transition hover:border-[3px] hover:border-[#C4FF00]
        ${isSelected ? "border-[3px] border-[#C4FF00]" : "border-gray-200"}
        ${disableSelect && !isSelected ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <img src={imgUrl} alt={title} className="w-full h-full object-cover" />
    </div>
  );
}
