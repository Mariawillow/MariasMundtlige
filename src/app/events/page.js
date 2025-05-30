"use client";

import ListeCardWrapper from "@/components/(events)/ListeCardWrapper";
import Header from "@/components/(header)/Header";
import LocationDropdown from "@/components/(events)/DropdownLocation";
import SortingDropdown from "@/components/(events)/DropDownSorter";

import { useEffect, useState } from "react";
import { getEvents, getLocations } from "@/api/events"; // Henter event data
import { getArtDetails } from "@/api/smk"; //Henter værk data
import { cityShorten } from "@/lib/cityHelpers";

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

      // Finder eventets med thumbnail fra SMK API
      const firstArtImg = await Promise.all(
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

      setEvents(firstArtImg);
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
    const shorten = cityShorten[selectedCity] || [selectedCity.toLowerCase()]; // Find forkortelse for by
    // Tjek om lokationsadressen indeholder et af forkortelse (case-insensitive)
    return shorten.some((shorten) => location.address.toLowerCase().includes(shorten));
  });

  //Vi sortere nu bogstaverne alfabetisk fra a-å og efter de populæreste:
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOrder === "alphabetical") {
      return a.title.localeCompare(b.title, "da");
    }
    if (sortOrder === "popularity") {
      const remainingA = a.totalTickets - a.bookedTickets;
      const remainingB = b.totalTickets - b.bookedTickets;

      const isSoldOutA = remainingA <= 0;
      const isSoldOutB = remainingB <= 0;

      // Hvis A er udsolgt og B ikke er, skal A komme efter B
      if (isSoldOutA && !isSoldOutB) return 1;
      if (!isSoldOutA && isSoldOutB) return -1;

      // Hvis begge har billetter, sorter efter popularitet (højst først)
      const popularityA = a.bookedTickets / a.totalTickets || 0;
      const popularityB = b.bookedTickets / b.totalTickets || 0;
      return popularityB - popularityA;
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
      <ListeCardWrapper events={sortedEvents} />
    </div>
  );
}
