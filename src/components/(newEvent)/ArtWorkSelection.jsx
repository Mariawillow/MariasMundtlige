"use client";
import { useEffect, useState } from "react";
import { getArts } from "@/api/smk";
import { makeNewEvent } from "@/api/localhost";
import ButtonPrimary from "../ButtonPrimary";
import ArtworkGrid from "./ArtWorkGrid";
import { useRouter } from "next/navigation";
import { filterArtworksByPeriod } from "@/api/periods";

export default function ArtworkSelection({ date, location, period }) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [allArtworks, setAllArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  // Hent alle værker én gang
  useEffect(() => {
    setLoading(true);
    getArts()
      .then((data) => setAllArtworks(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filtrer værker, når perioden ændrer sig
  useEffect(() => {
    if (!period || allArtworks.length === 0) return;

    const filtered = filterArtworksByPeriod(allArtworks, period);
    setFilteredArtworks(filtered);
  }, [period, allArtworks]);

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
      await makeNewEvent({
        title: eventName,
        description: eventDescription,
        date,
        locationId: location.id,
        artworkIds: selectedArtworks,
        period: period?.id,
      });

      setShowSuccess(true);
      setTimeout(() => router.push("/dashboard"), 800);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert("Noget gik galt under oprettelsen af eventet");
    }
  };

  return (
    <div className="space-y-8 mt-8">
      <h3 className="text-center">STEP 2: Information om dit event</h3>

      {loading ? (
        <p className="text-center text-gray-400">Henter værker...</p>
      ) : (
        <>
          <input type="text" placeholder="Søg efter værker..." className="w-full border rounded px-3 py-2" />

          <p className="text-sm text-gray-600">
            {selectedArtworks.length}/{location?.maxArtworks || 3} værker valgt
          </p>

          {selectedArtworks.length === (location?.maxArtworks || 3) && (
            <p className="text-sm text-red-500">Du har valgt maks antal værker.</p>
          )}

          <ArtworkGrid
            artworks={filteredArtworks}
            selectedArtworks={selectedArtworks}
            toggleArtwork={toggleArtwork}
          />
        </>
      )}

      <div className="space-y-4">
        <form>
          <label className="text-sm font-medium">Eventnavn</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </form>

        <form>
          <label className="text-sm font-medium">Beskrivelse</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </form>
      </div>

      <ButtonPrimary href="/dashboard"
        variant="default"
        onClick={handleMakeNewEvent}
        disabled={!eventName || !eventDescription || selectedArtworks.length === 0}
      >
        Opret event
      </ButtonPrimary>
      {showSuccess && (
        <div className="fixed top-6 right-6 bg-lime-400 text-white px-4 py-2 rounded shadow-lg transition-all z-50">
          Eventet blev oprettet!
        </div>
      )}
    </div>
  );
}
