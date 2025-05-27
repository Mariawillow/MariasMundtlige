"use client";
import { useEffect, useState } from "react";
import { getArts } from "@/api/smk";
import ArtworkGrid from "./ArtworkGrid";
import { useRouter } from "next/navigation";
import { filterArtworksByPeriod } from "@/api/periods";
import Image from "next/image";
import arrowLong from "@/images/arrowLong.svg";
import { useUser } from "@clerk/nextjs";
import { SearchBar } from "./SearchBar";
import SearchResultsList from "./SearchResultsList";
import { handleEventAction } from "@/lib/eventHelpers";

export default function ArtworkSelection({ date, location, period, defaultData = {}, mode = "create", onSubmit }) {
  const [allArtworks, setAllArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const { user } = useUser(); //giver adgang til allerede loggede ind brugere.
  const [eventName, setEventName] = useState(defaultData.title || "");
  const [eventDescription, setEventDescription] = useState(defaultData.description || "");
  const [selectedArtworks, setSelectedArtworks] = useState(defaultData.artworkIds || []);

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

  const toggleArtwork = (objectNumber) => {
    setSelectedArtworks((prev) => {
      if (prev.includes(objectNumber)) {
        return prev.filter((i) => i !== objectNumber);
      } else {
        const maxArtwork = location?.maxArtworks || 3;
        if (prev.length >= maxArtwork) return prev;
        return [...prev, objectNumber];
      }
    });
  };

  const [results, setResults] = useState([]);

  const handleMakeNewEvent = () => {
    const eventInfo = {
      title: eventName,
      description: eventDescription,
      date,
      locationId: location.id,
      artworkIds: selectedArtworks,
      period: period?.id,
    };

    handleEventAction({
      mode,
      onSubmit,
      user,
      router,
      eventInfo,
      setShowSuccess,
    });
  };



  return (
    <div className="space-y-8 mt-8">
      <h3 className="text-center">STEP 2: Information om dit event</h3>

      <div className="md:grid md:grid-cols-[1fr_2fr] gap-space-l">
        <EventForm />

        <div>
          {loading ? (
            <p className="text-center text-gray-400">Henter værker...</p>
          ) : (
            <>
              <div className="relative w-[400px] my-4 md:place-self-end">
                <SearchBar setResults={setResults} />
                <SearchResultsList results={results} />
              </div>

              {selectedArtworks.length === location?.maxArtworks && <p className="text-sm text-red-500">Du har valgt maks antal værker.</p>}

              <ArtworkGrid artworks={filteredArtworks} selectedArtworks={selectedArtworks} toggleArtwork={toggleArtwork} />
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="group inline-block text-[#C4FF00] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50" onClick={handleMakeNewEvent} disabled={!eventName || !eventDescription || selectedArtworks.length === 0}>
          <span className="inline-flex flex-col">
            {/* <span className="text-4xl font-bold px-8">Opret event</span> */}
            <span className="text-4xl font-bold px-8">{mode === "edit" ? "Gem ændringer" : "Opret event"}</span>
            <Image src={arrowLong} alt="pil" className="self-end transition-transform group-hover:translate-x-1 group-disabled:translate-x-0" />
          </span>
        </button>
      </div>

      {/* SuccessToast */}
      {showSuccess && <div className="fixed top-6 right-6 bg-[#C4FF00] text-white px-4 py-2 rounded shadow-lg transition-all z-50">Eventet blev oprettet!</div>}
    </div>
  );
}
