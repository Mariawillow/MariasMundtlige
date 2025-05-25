"use client";

import ListeCardClient from "@/components/(events)/ListeCardClient";
import Header from "@/components/(header)/Header";
import LocationDropdown from "@/components/(events)/DropdownLocation";
import SortingDropdown from "@/components/(events)/DropDownSorter";

import { useEffect, useState } from "react";
import { getEvents, getLocations } from "@/api/localhost"; // Henter event data
import { getArtDetails } from "@/api/smk"; //Henter værk data

// Objekt over bynavne forkortelser – bruges til at oversætte/forstå varianter af bynavne
const cityAbbreviation = {
  København: ["københavn", "kbh"],
  Århus: ["århus", "aarhus"],
  Odense: ["odense"],
  Køge: ["køge"],
};

export default function ListeView() {
  const [events, setEvents] = useState([]); // Gemmer events
  const [locations, setLocations] = useState([]); // Gemmer lokationer
  const [selectedCity, setSelectedCity] = useState(null); // Gemmer by(city) brugeren vælger i dropdown
  const [sortOrder, setSortOrder] = useState(null); // Gemmer sorteringsrækkefølge

  // useEffect kører kun én gang, når komponenten loader
  // Her henter vi både events og lokationer fra API og gemmer i state
  useEffect(() => {
    const fetchData = async () => {
      const [eventsData, locationsData] = await Promise.all([getEvents(), getLocations()]);

      // Berig events med thumbnail fra SMK API
      const enrichedEvents = await Promise.all(
        eventsData.map(async (event) => {
          const firstArtworkId = event.artworkIds?.[0];
          let thumbnailImage = null;

          if (firstArtworkId) {
            try {
              const art = await getArtDetails(firstArtworkId);
              thumbnailImage = art?.image_thumbnail || null;
            } catch (error) {
              console.error("Fejl ved hentning af kunstværk:", error);
            }
          }

          return {
            ...event,
            thumbnailImage,
          };
        })
      );

      setEvents(enrichedEvents);
      setLocations(locationsData);
    };

    fetchData();
  }, []);

  // Hjælpefunktion: Find en lokation ud fra et locationId (for event)
  const getLocationById = (id) => locations.find((location) => location.id === id);

  // Filtrerer events baseret på valgt by i dropdown
  const filteredEvents = events.filter((event) => {
    if (!selectedCity) return true; // Ingen filter - vis alle
    const location = getLocationById(event.locationId); // Find lokationen til eventet
    if (!location) return false; // Hvis lokation ikke findes, skjul event
    const abbreviation = cityAbbreviation[selectedCity] || [selectedCity.toLowerCase()]; // Find forkortelse for by
    // Tjek om lokationsadressen indeholder et af forkortelse (case-insensitive)
    return abbreviation.some((abbreviation) => location.address.toLowerCase().includes(abbreviation));
  });

  //Vi sortere nu bogsteaverne alfabetisk fra a-å.
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOrder === "alphabetical") {
      return a.title.localeCompare(b.title, "da");
    }
    return 0;
  });

  return (
    <div>
      <Header />
      <div className="flex justify-end space-x-4">
        <LocationDropdown onSelectCity={setSelectedCity} />
        <SortingDropdown onSortChange={setSortOrder} />
      </div>
      <ListeCardClient events={sortedEvents} />
    </div>
  );
}
