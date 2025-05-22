"use client";
import { useEffect, useState } from "react";
import { getArts } from "@/api/smk";
import { makeNewEvent } from "@/api/localhost";
import ButtonPrimary from "../ButtonPrimary";
import ArtworkGrid from "./ArtWorkGrid";
import { useRouter } from "next/navigation";

export default function ArtworkSelection({ date, location, period }) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [artworks, setArtworks] = useState([]);
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]); // Filtrerede værker
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  // Hent værkerne når komponenten mountes
  useEffect(() => {
    getArts().then(setArtworks).catch(console.error);
  }, []);

  // Når periodens værdi ændres, filtrer værkerne
  useEffect(() => {
    if (period) {
      // Hvis der er en periode, filtrer kunstværkerne
      const filtered = artworks.filter((art) => {
        const [startYear, endYear] = art.production_date?.[0]?.period.split("-").map(Number);
        return startYear >= period.from && endYear <= period.to;
      });
      setFilteredArtworks(filtered);
    } else {
      // Hvis ingen periode er valgt, vis alle værker
      setFilteredArtworks(artworks);
    }
  }, [period, artworks]); // Lyt på ændringer i period og artworks

  // Funktion til at vælge/deselevere et værk
  const toggleArtwork = (id) => {
    setSelectedArtworks((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        const maxArtwork = location?.maxArtworks || 3;
        if (prev.length >= maxArtwork) return prev;
        return [...prev, id];
      }
    });
  };

  const handleMakeNewEvent = async () => {
    try {
      const res = await makeNewEvent({
        title: eventName,
        description: eventDescription,
        date,
        locationId: location.id,
        artworkIds: selectedArtworks,
        period: period?.id, // Brug den valgte periode
      });

      setShowSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert("Noget gik galt under oprettelsen af eventet");
    }
  };

  return (
    <div className="space-y-8 mt-8">
      <h3 className="text-center">STEP 2: Information om dit event</h3>

      <input type="text" placeholder="Søg efter værker..." className="w-full border rounded px-3 py-2" />

      <p className="text-sm text-gray-600">
        {selectedArtworks.length}/{location?.maxArtworks || 3} værker valgt
      </p>

      {selectedArtworks.length === (location?.maxArtworks || 3) && <p className="text-sm text-red-500">Du har valgt maks antal værker.</p>}

      {/* Værk grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ArtworkGrid artworks={filteredArtworks} selectedArtworks={selectedArtworks} toggleArtwork={toggleArtwork} />
      </div>

      {/* Event detaljer */}
      <div className="space-y-4">
        <form>
          <label className="text-sm font-medium">Eventnavn</label>
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full border rounded px-3 py-2" />
        </form>

        <form>
          <label className="text-sm font-medium">Beskrivelse</label>
          <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={4} />
        </form>
      </div>

      <ButtonPrimary variant="default" onClick={handleMakeNewEvent} disabled={!eventName || !eventDescription || selectedArtworks.length === 0}>
        Opret event
      </ButtonPrimary>
      {showSuccess && <div className="fixed top-6 right-6 bg-lime-400 text-white px-4 py-2 rounded shadow-lg transition-all z-50">Eventet blev oprettet!</div>}
    </div>
  );
}
