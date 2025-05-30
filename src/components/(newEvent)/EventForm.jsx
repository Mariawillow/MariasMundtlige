"use client"

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ArtworkCard from "./ArtworkCard";

const EventForm = ({ eventName, setEventName, eventDescription, setEventDescription, selectedArtworks, location, filteredArtworks, toggleArtwork }) => {
  const selectedWrapperRef = useRef();

  useEffect(() => {
    if (selectedWrapperRef.current) {
      if (selectedArtworks.length > 0) {
        gsap.fromTo(selectedWrapperRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });
      } else {
        gsap.to(selectedWrapperRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  }, [selectedArtworks.length]);

  return (
    <div>
      <form>
        <label className="text-sm font-medium">Eventnavn</label>
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full border px-3 py-2" />
      </form>

      <form>
        <label className="text-sm font-medium">Beskrivelse</label>
        <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className="w-full border px-3 py-2" rows={4} />
      </form>

      <label>Vælg værker</label>

      <p>
        For valgte lokation kan du maks vælge <span className="font-bold">{location?.maxArtworks}</span> værker
      </p>

      <p className="mt-8">
        <span className="font-bold">
          {selectedArtworks.length}/{location?.maxArtworks}
        </span>{" "}
        værker valgt
      </p>

      {/* Fade-in/ud container */}
      <div className="mt-4" ref={selectedWrapperRef}>
        {selectedArtworks.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-space-s">
              {selectedArtworks.map((id) => {
                const artwork = filteredArtworks.find((art) => art.object_number === id);
                if (!artwork) return null;
                return <ArtworkCard key={id} artwork={artwork} selected={selectedArtworks} onClick={() => toggleArtwork(id)} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventForm;
