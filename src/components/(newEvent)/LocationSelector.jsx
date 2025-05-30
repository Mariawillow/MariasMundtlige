"use client";
import { useEffect, useState } from "react";
import { getLocations, getEvents } from "@/api/events";
import { isSameDay, parseISO } from "date-fns";

export default function LocationSelector({ location, setLocation, date }) {
  const [locations, setLocations] = useState([]);
  const [bookedLocationsIds, setBookedLocationsIds] = useState([]); //id’er på lokationer, der er optaget på den valgte dato.

  // Henter alle lokationer ved mount og gemmer i locations
  useEffect(() => {
    getLocations()
      .then(setLocations)
      .catch((error) => console.error("Fejl ved hentning af lokationer:", error)); //Håndterer fejl ved API-kald
  }, []);

  // Opdaterer bookedLocationsIds og nulstil valgt location, hvis den er optaget
  useEffect(() => {
    if (!date) return;

    getEvents()
      .then((events) => {
        //Finder alle events på den valgte dato, mapper dem og gemmer i en konstant
        const booked = events.filter((event) => isSameDay(parseISO(event.date), date)).map((event) => event.location?.id || event.locationId);

        //Gemmer de optagede lokations-id'er i state
        setBookedLocationsIds(booked);
      })
      .catch((error) => console.error("Fejl ved hentning af events:", error)); //Håndterer fejl ved API-kald
  }, [date]);

  // Håndterer ændring af lokation
  // Når brugeren vælger en lokation, tjekkes det, om den er optaget (det burde den ikke være, men tjekkes som ekstra sikkerhed). Hvis ledig, sættes lokationen i parent komponent (via setLocation).
  const handleChange = (e) => {
    const selectedId = e.target.value;
    const selectedLocation = locations.find((loc) => loc.id === selectedId);
    if (bookedLocationsIds.includes(selectedLocation.id)) return; // Ignorer hvis optaget
    setLocation(selectedLocation);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Lokation</label>
      <select value={location?.id || ""} onChange={handleChange} className="border px-3 py-2">
        <option value="" disabled>
          Vælg lokation
        </option>
        {locations.map((location) => {
          const isBooked = bookedLocationsIds.includes(location.id);
          return (
            <option key={location.id} value={location.id} disabled={isBooked} className={isBooked ? "text-gray-400 bg-gray-100" : ""}>
              {location.address} {isBooked ? "(optaget)" : ""}
            </option>
          );
        })}
      </select>
    </div>
  );
}
