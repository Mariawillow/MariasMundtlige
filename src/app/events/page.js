"use client";

import ListeCardClient from "@/components/(events)/ListeCardClient";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { getEvents, getLocations } from "@/api/localhost";
import LocationDropdown from "@/components/(events)/DropdownLocation";
import SortingDropdown from "@/components/(events)/DropDownSorter";

const cityAliases = {
  "København": ["københavn", "kbh"],
  "Århus": ["århus", "aarhus"],
  "Odense": ["odense"],
  "Køge": ["køge"],
};

export default function ListeView() {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [eventsData, locationsData] = await Promise.all([getEvents(), getLocations()]);
      setEvents(eventsData);
      setLocations(locationsData);
    };
    fetchData();
  }, []);

  // Find location for event
  const getLocationById = (id) => locations.find((loc) => loc.id === id);

  // Filtrering af events baseret på valgt by
  const filteredEvents = events.filter((event) => {
    if (!selectedCity) return true;
    const location = getLocationById(event.locationId);
    if (!location) return false;
    const aliases = cityAliases[selectedCity] || [selectedCity.toLowerCase()];
    return aliases.some((alias) => location.address.toLowerCase().includes(alias));
  });

  return (
    <div>
      <Header />
      <div className="flex justify-end space-x-4">
        {/* Sender callback til dropdown */}
        <LocationDropdown onSelectCity={setSelectedCity} />
        <SortingDropdown />
      </div>

      <ListeCardClient events={filteredEvents} />
    </div>
  );
}
