"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { getArts } from "@/api/smk";
import { getEvents } from "@/api/localhost";
import { filterArtworksByPeriod } from "@/api/periods";
import { handleEventAction } from "@/lib/eventHelpers"; // Håndterer oprettelse og opdatering af events

import ArtworkGrid from "./ArtworkGrid";
import arrowLong from "@/images/arrowLong.svg";
import { SearchBar } from "./SearchBar";
import EventForm from "./EventForm";

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

  // Hent alle værker én gang og sættes i allArtworks
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

  // Filtrer kunstværker yderligere efter tilgængelighed ift. events på samme dato
  useEffect(() => {
    const filterArtworksByAvailability = async () => {
      if (!period || !date || !location || allArtworks.length === 0) return;

      setLoading(true);
      try {
        // Filtrer først alle værker, så kun de fra den valgte periode er med
        const periodFiltered = filterArtworksByPeriod(allArtworks, period);

        // Hent alle events
        const allEvents = await getEvents();
        // Find events på samme dato som den valgte dato
        const sameDateEvents = allEvents.filter((event) => event.date === date);
        // Find alle kunstværker, der er booket på andre lokationer end den valgte, samme dato
        const conflictingArtworks = sameDateEvents.filter((event) => event.locationId !== location.id).flatMap((event) => event.artworkIds);
        // Fjern de konflikterende kunstværker fra de værker, som er fra perioden
        const availableArtworks = periodFiltered.filter((art) => !conflictingArtworks.includes(art.object_number));

        // Sæt de filtrerede og tilgængelige værker som de værker, der vises
        setFilteredArtworks(availableArtworks);
      } catch (err) {
        console.error("Fejl i værk-filtrering:", err);
      } finally {
        setLoading(false);
      }
    };

    filterArtworksByAvailability();
  }, [period, date, location, allArtworks]);

  // Funktion til at vælge og fravælge kunstværker
  const toggleArtwork = (objectNumber) => {
    setSelectedArtworks((prev) => {
      if (prev.includes(objectNumber)) {
        return prev.filter((i) => i !== objectNumber);
      } else {
        const maxArtwork = location?.maxArtworks;
        if (prev.length >= maxArtwork) return prev;
        return [...prev, objectNumber];
      }
    });
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer værker baseret på søgetekst (kunstner eller titel)
  const displayedArtworks = searchTerm
    ? filteredArtworks.filter((art) => {
        const title = art.titles?.[0]?.title?.toLowerCase() || "";
        const artist = art.production?.[0]?.artist?.name?.toLowerCase() || "";
        return title.includes(searchTerm.toLowerCase()) || artist.includes(searchTerm.toLowerCase());
      })
    : filteredArtworks;

  // Event håndtering: Opret eller opdater event
  // Samler alle data om event i eventInfo
  const handleMakeNewEvent = () => {
    const eventInfo = {
      title: eventName,
      description: eventDescription,
      date,
      locationId: location.id,
      artworkIds: selectedArtworks,
      period: period?.id,
    };

    // Kalder funktion som opretter eller opdaterer baseret på mode ("create" eller "edit"). Her håndteres også success-feedback
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
        <EventForm eventName={eventName} setEventName={setEventName} eventDescription={eventDescription} setEventDescription={setEventDescription} selectedArtworks={selectedArtworks} location={location} />

        <div>
          {loading ? (
            <p className="text-center text-gray-400">Henter værker...</p>
          ) : (
            <>
              <div className="relative w-[400px] my-4 md:place-self-end">
                <SearchBar onSearch={setSearchTerm} />
              </div>

              {selectedArtworks.length === location?.maxArtworks && <p className="text-sm text-red-500">Du har valgt maks antal værker.</p>}

              <ArtworkGrid artworks={displayedArtworks} selectedArtworks={selectedArtworks} toggleArtwork={toggleArtwork} />
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
