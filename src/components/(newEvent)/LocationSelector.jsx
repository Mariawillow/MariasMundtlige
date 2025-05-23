"use client";
import { useEffect, useState } from "react";
import { getLocations, getEvents } from "@/api/localhost";

export default function LocationSelector({ location, setLocation, date }) {
  const [locations, setLocations] = useState([]);
  const [bookedLocationsIds, setbookedLocationsIds] = useState([]);

  useEffect(() => {
    getLocations().then(setLocations);
  }, []);

  useEffect(() => {
    if (!date) return;
    getEvents().then((events) => {
      const booked = events.filter((event) => event.date === date).map((event) => event.location?.id || event.locationId);
      setbookedLocationsIds(booked);
    });
  }, [date]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Lokation</label>
      <select
        value={location?.id || ""}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selectedLocation = locations.find((loc) => loc.id === selectedId);
          setLocation(selectedLocation);
        }}
        className="border rounded px-3 py-2"
      >
        <option value="" disabled>
          Vælg lokation
        </option>
        {locations.map((loc) => {
          const isBooked = bookedLocationsIds.includes(loc.id);
          return (
            <option key={loc.id} value={loc.id} disabled={isBooked} className={isBooked ? "text-gray-400 bg-gray-100" : ""}>
              {loc.address} {isBooked ? "(optaget)" : ""}
            </option>
          );
        })}
      </select>
    </div>
  );
}
