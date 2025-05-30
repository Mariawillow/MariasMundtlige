import { useRef } from "react";
import gsap from "gsap";

export default function ArtworkCard({ artwork, selected, onClick, disableSelect }) {
  // Referencen til DOM-elementet, så vi kan animere det med GSAP
  const cardRef = useRef();

  const isSelected = selected.includes(artwork.object_number);
  const title = artwork.titles?.[0]?.title || "Uden titel";
  const thumbnail = artwork.image_thumbnail || "/fallback.jpg";

  // Funktioner der animere kort og kalder onClick callback, når animationen er færdig
  const handleClick = () => {
    // Hvis kortet allerede er valgt → vi TILLADER man kan fjerne det!
    if (isSelected) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 10,
        duration: 0.4,
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
      y: 10,
      duration: 0.4,
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
      className={`aspect-square transition
        ${isSelected ? "border-[3px] border-[#C4FF00]" : "border-gray-200"}
        ${disableSelect && !isSelected ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
    </div>
  );

}
