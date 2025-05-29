import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function ArtworkCard({ artwork, selected, onClick }) {
  const cardRef = useRef();
  const [isFadingOut, setIsFadingOut] = useState(false);

  const isSelected = selected.includes(artwork.object_number);
  const title = artwork.titles?.[0]?.title || "Uden titel";
  const thumbnail = artwork.image_thumbnail || "/fallback.jpg";

  useEffect(() => {
    if (!isFadingOut) {
      gsap.fromTo(cardRef.current, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" });
    }
  }, [isFadingOut]);

  const handleClick = () => {
    setIsFadingOut(true);
    gsap.to(cardRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        onClick(artwork.object_number); //Fjerner først card, når animationen er færdig
      },
    });
  };

  return (
    <div ref={cardRef} onClick={handleClick} className={`aspect-square cursor-pointer transition ${isSelected ? "border-[3px] border-[#C4FF00]" : "border-gray-200"}`}>
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
    </div>
  );
}
