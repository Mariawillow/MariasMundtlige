"use client";
import { useEffect, useState } from "react";
import { getLocations } from "@/api/localhost";

export default function LocationSelector({ location, setLocation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations().then(setLocations).catch(console.error);
  }, []);

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
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.address}
          </option>
        ))}
      </select>
    </div>
  );
}
