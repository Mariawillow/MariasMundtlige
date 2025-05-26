"use client";
import { useEffect, useState } from "react";
import { getArts } from "@/api/smk";
import { makeNewEvent } from "@/api/localhost";
import ArtworkGrid from "./ArtWorkGrid";
import { useRouter } from "next/navigation";
import { filterArtworksByPeriod } from "@/api/periods";
import Image from "next/image";
import arrowLong from "@/images/arrowLong.svg";
import { useUser } from "@clerk/nextjs";
import { SearchBar } from "./SearchBar";
import SearchResultsList from "./SearchResultsList";

export default function ArtworkSelection({ date, location, period, defaultData = {}, mode = "create", onSubmit }) {
  // const [eventName, setEventName] = useState("");
  // const [eventDescription, setEventDescription] = useState("");
  const [allArtworks, setAllArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  // const [selectedArtworks, setSelectedArtworks] = useState([]);
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

  // const handleMakeNewEvent = async () => {
  //   try {
  //     await makeNewEvent({
  //       title: eventName,
  //       description: eventDescription,
  //       date,
  //       locationId: location.id,
  //       artworkIds: selectedArtworks,
  //       period: period?.id,
  //       userId: user?.id,
  //     });

  //     setShowSuccess(true);
  //     setTimeout(() => router.push("/dashboard"), 800);
  //     setTimeout(() => setShowSuccess(false), 5000);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Noget gik galt under oprettelsen af eventet");
  //   }
  // };
  
  const [results, setResults] = useState ([]);

  const handleMakeNewEvent = async () => {
    const payload = {
      title: eventName,
      description: eventDescription,
      date,
      locationId: location.id,
      artworkIds: selectedArtworks,
      period: period?.id,
    };


    try {
      if (mode === "edit" && onSubmit) {
        await onSubmit(payload); // PATCH – redigering
        setShowSuccess(true);
        setTimeout(() => router.push("/dashboard"), 800);
        return;
      }

      // Opret nyt event
      await makeNewEvent({ ...payload, userId: user?.id });
      setShowSuccess(true);
      setTimeout(() => router.push("/dashboard"), 800);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Fejl:", error);
      alert("Noget gik galt under oprettelsen/redigeringen af eventet");
    }
  };


  return (
    <div className="space-y-8 mt-8">
      <h3 className="text-center">STEP 2: Information om dit event</h3>

      <div className="md:grid md:grid-cols-[1fr_2fr] gap-space-l">
        <div>
          <form>
            <label className="text-sm font-medium">Eventnavn</label>
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full border rounded px-3 py-2" />
          </form>

          <form>
            <label className="text-sm font-medium">Beskrivelse</label>
            <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={4} />
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
        </div>

        <div>
          {loading ? (
            <p className="text-center text-gray-400">Henter værker...</p>
          ) : (
            <>
              {/* <div className="relative w-[400px] my-4 md:place-self-end">
                <input type="text" placeholder="Søg efter værker..." className="w-full border rounded px-3 py-2 pr-10" />
                <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div> */}
 
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
            <span className="text-4xl font-bold px-8">
              {mode === "edit" ? "Gem ændringer" : "Opret event"}
            </span>
            <Image src={arrowLong} alt="pil" className="self-end transition-transform group-hover:translate-x-1 group-disabled:translate-x-0" />
          </span>
        </button>
      </div>

      {showSuccess && <div className="fixed top-6 right-6 bg-lime-400 text-white px-4 py-2 rounded shadow-lg transition-all z-50">Eventet blev oprettet!</div>}
    </div>
  );
}
