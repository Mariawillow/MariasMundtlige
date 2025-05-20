"use client";
import { useEffect, useState } from "react";
import { getArts } from "@/api/smk";
import { makeNewEvent } from "@/api/localhost";
import ButtonPrimary from "../ButtonPrimary";
import ArtworkGrid from "./ArtWorkGrid";
import { useRouter } from "next/navigation";


export default function ArtworkSelection({ date, location }) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [artworks, setArtworks] = useState([]);
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();



  useEffect(() => {
    getArts().then(setArtworks).catch(console.error);
  }, []);

  //Funktion som håndterer maks grænse for valg af værker (taller 3 skal skiftes ud senere)
  const toggleArtwork = (id) => {
    setSelectedArtworks((prev) => {
      if (prev.includes(id)) {
        // Fjern hvis det allerede er valgt
        return prev.filter((i) => i !== id);
      } else {
        // Tilføj kun hvis der er plads
        if (prev.length >= 3) return prev;
        return [...prev, id];
      }
    });
  };

  //Funktion som håndterer opret event
  const handleMakeNewEvent = async () => {
    console.log("forsøg på at ...", handleMakeNewEvent);
    try {
      const res = await makeNewEvent({
        title: eventName,
        description: eventDescription,
        date,
        locationId: location,
        artworkIds: selectedArtworks,
      });

      console.log("Event oprettet:", res);
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 800); // tid det går før kurator bliver sendt til dashboard
      setTimeout(() => setShowSuccess(false), 5000); // Skjul efter 5 sekunder



      // Her kan du evt. redirecte eller nulstille formen
    } catch (error) {
      console.error(error);
      alert("Noget gik galt under oprettelsen");
    }
  };

  return (
    <div className="space-y-8 mt-8">
      <h2 className="text-xl font-semibold">Vælg værker</h2>

      {/* Søge-felt */}
      <input type="text" placeholder="Søg efter værker..." className="w-full border rounded px-3 py-2" />

      {/* Status */}
      <p className="text-sm text-gray-600">{selectedArtworks.length}/3 værker valgt</p>
      {selectedArtworks.length === 3 && <p className="text-sm text-red-500">Du har valgt maks antal værker.</p>}

      {/* Værk grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ArtworkGrid artworks={artworks} selectedArtworks={selectedArtworks} toggleArtwork={toggleArtwork} />
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

      {/* Knap */}
      <ButtonPrimary variant="default" onClick={handleMakeNewEvent} disabled={!eventName || !eventDescription || selectedArtworks.length === 0}>
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
