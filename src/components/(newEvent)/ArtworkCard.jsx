import { useRef } from "react";
import gsap from "gsap";

export default function ArtworkCard({ artwork, selected, onClick }) {
  // Referencen til DOM-elementet, så vi kan animere det med GSAP
  const cardRef = useRef();

  const isSelected = selected.includes(artwork.object_number);
  const title = artwork.titles?.[0]?.title || "Uden titel";
  const thumbnail = artwork.image_thumbnail || "/fallback.jpg";

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
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
    </div>
  );
}
