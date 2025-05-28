"use client";

import Image from "next/image";
import { useEffect, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { getArts } from "@/api/smk";
import { getEvents } from "@/api/localhost";
import { filterArtworksByPeriod } from "@/api/periods";
import arrowLong from "@/images/arrowLong.svg";

import ArtworkGrid from "./ArtworkGrid";
import { SearchBar } from "./SearchBar";
import SearchResultsList from "./SearchResultsList";
import EventForm from "./EventForm";

import { makeNewEvent } from "@/api/localhost"; // Sørg for at denne import findes

// Server-handling funktion til useActionState
async function submitEvent(_, formData) {
  try {
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      date: formData.get("date"),
      locationId: formData.get("locationId"),
      artworkIds: JSON.parse(formData.get("artworkIds")),
      period: formData.get("period"),
      userId: "dummy-id", // Tilføj evt. user.id her, hvis du har det fra Clerk
    };

    await makeNewEvent(data);

    return { success: true };
  } catch (err) {
    return { error: err.message || "Noget gik galt" };
  }
}

export default function ArtworkSelection({ date, location, period }) {
  const [allArtworks, setAllArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [selectedArtworks, setSelectedArtworks] = useState([]);

  const [results, setResults] = useState([]);
  const [state, formAction, isPending] = useActionState(submitEvent, {});

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getArts()
      .then(setAllArtworks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!period || allArtworks.length === 0) return;
    const filtered = filterArtworksByPeriod(allArtworks, period);
    setFilteredArtworks(filtered);
  }, [period, allArtworks]);

  useEffect(() => {
    const filterByAvailability = async () => {
      if (!period || !date || !location || allArtworks.length === 0) return;
      setLoading(true);
      try {
        const periodFiltered = filterArtworksByPeriod(allArtworks, period);
        const allEvents = await getEvents();
        const sameDateEvents = allEvents.filter((event) => event.date === date);
        const conflicts = sameDateEvents
          .filter((e) => e.locationId !== location.id)
          .flatMap((e) => e.artworkIds);

        const available = periodFiltered.filter((art) => !conflicts.includes(art.object_number));
        setFilteredArtworks(available);
      } finally {
        setLoading(false);
      }
    };
    filterByAvailability();
  }, [period, date, location, allArtworks]);

  // 👉 Naviger til dashboard efter success
  useEffect(() => {
    if (state?.success) {
      const timeout = setTimeout(() => {
        router.push("/dashboard");
      }, 2000); // 2 sekunder forsinkelse
      return () => clearTimeout(timeout);
    }
  }, [state?.success, router]);

  const toggleArtwork = (objectNumber) => {
    setSelectedArtworks((prev) => {
      if (prev.includes(objectNumber)) {
        return prev.filter((i) => i !== objectNumber);
      } else {
        if (prev.length >= location?.maxArtworks) return prev;
        return [...prev, objectNumber];
      }
    });
  };

  return (
    <div className="space-y-8 mt-8">
      <h3 className="text-center">STEP 2: Information om dit event</h3>

      <form action={formAction} className="md:grid md:grid-cols-[1fr_2fr] gap-space-l">
        <input type="hidden" name="date" value={date} />
        <input type="hidden" name="locationId" value={location.id} />
        <input type="hidden" name="period" value={period?.id} />
        <input type="hidden" name="artworkIds" value={JSON.stringify(selectedArtworks)} />

        <EventForm
          eventName={eventName}
          setEventName={setEventName}
          eventDescription={eventDescription}
          setEventDescription={setEventDescription}
          selectedArtworks={selectedArtworks}
          location={location}
        />

        <div>
          {loading ? (
            <p className="text-center text-gray-400">Henter værker...</p>
          ) : (
            <>
              <div className="relative w-[400px] my-4 md:place-self-end">
                <SearchBar setResults={setResults} />
                <SearchResultsList results={results} />
              </div>

              {selectedArtworks.length === location?.maxArtworks && (
                <p className="text-sm text-red-500">Du har valgt maks antal værker.</p>
              )}

              <ArtworkGrid
                artworks={filteredArtworks}
                selectedArtworks={selectedArtworks}
                toggleArtwork={toggleArtwork}
              />
            </>
          )}
        </div>

        <div className="flex justify-end col-span-2">
          <button
            className="group inline-block text-[#C4FF00] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={!eventName || !eventDescription || selectedArtworks.length === 0 || isPending}
          >
            <span className="inline-flex flex-col">
              <span className="text-4xl font-bold px-8">Opret event</span>
              <Image
                src={arrowLong}
                alt="pil"
                className="self-end transition-transform group-hover:translate-x-1"
              />
            </span>
          </button>
        </div>

        {state?.success && (
          <div className="fixed top-6 right-6 bg-[#C4FF00] text-white px-4 py-2 rounded shadow-lg z-50">
            Eventet blev oprettet!
          </div>
        )}
        {state?.error && (
          <div className="fixed top-6 right-6 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
            {state.error.includes("Location already in use") ? (
              <span>Lokationen er allerede booket på den valgte dato. Vælg en anden dato eller lokation.</span>
            ) : (
              <span>{state.error}</span>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
