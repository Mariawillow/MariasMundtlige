"use client";

import { useRef, useEffect } from "react";
import ArtworkCard from "./ArtworkCard";

const EventForm = ({ eventName, setEventName, eventDescription, setEventDescription, formErrors, setFormErrors, selectedArtworks, location, filteredArtworks, toggleArtwork }) => {
  useEffect(() => {
    if (eventName.trim() !== "" && formErrors.name) {
      setFormErrors((prev) => ({ ...prev, name: false }));
    }

    if (eventDescription.trim() !== "" && formErrors.description) {
      setFormErrors((prev) => ({ ...prev, description: false }));
    }

    if (selectedArtworks.length > 0 && formErrors.artworks) {
      setFormErrors((prev) => ({ ...prev, artworks: false }));
    }
  }, [eventName, eventDescription, selectedArtworks.length, formErrors.name, formErrors.description, formErrors.artworks, setFormErrors]);

  const selectedWrapperRef = useRef();

  return (
    <div className="flex flex-col gap-4">
      <form>
        <label className="text-sm font-medium">
          Eventnavn *
          <input required type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className={`w-full border px-3 py-2 ${formErrors?.name ? "border-red-500" : ""}`} />
        </label>
      </form>

      <form>
        <label className="text-sm font-medium mt-2">
          Beskrivelse *
          <textarea required value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className={`w-full border px-3 py-2 ${formErrors?.description ? "border-red-500" : ""}`} rows={4} />
        </label>
      </form>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Vælg værker *</label>
        <label className="text-s">
          For valgte lokation kan du maks vælge <span className="font-bold">{location?.maxArtworks}</span> værker
        </label>

        <p className="mt-2">
          <span className="font-bold">
            {selectedArtworks.length}/{location?.maxArtworks}
          </span>{" "}
          værker valgt
        </p>
        {formErrors.artworks && <p className="text-red-500 text-sm mt-2">Du skal vælge mindst ét værk.</p>}
      </div>

      {/* Fade-in/ud container */}
      <div className="mt-4" ref={selectedWrapperRef}>
        {selectedArtworks.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-space-s">
              {selectedArtworks.map((id) => {
                const artwork = filteredArtworks.find((art) => art.object_number === id);
                if (!artwork) return null;
                return <ArtworkCard key={id} artwork={artwork} selectedIds={selectedArtworks} onClick={toggleArtwork} disableSelect={false} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventForm;
