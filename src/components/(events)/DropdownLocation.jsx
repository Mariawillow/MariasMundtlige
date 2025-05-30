"use client"

import React, { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { getLocations } from "@/api/events";
import { cityShorten } from "@/lib/cityHelpers";

// Definer listen af byer til dropdown
const cities = ["Aalborg", "Esbjerg", "Holstebro", "København", "Køge", "Lyngby", "Odense", "Silkeborg", "Århus"];

export default function LocationDropdown({ onSelectCity }) {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
        setFilteredLocations(data);
      } catch (error) {
        console.error("Fejl ved hentning af lokationer:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (!selectedCity) {
      setFilteredLocations(locations);
    } else {
      const shorten = cityShorten[selectedCity] || [selectedCity.toLowerCase()];
      const filtered = locations.filter((location) => shorten.some((shorten) => location.address.toLowerCase().includes(shorten)));
      setFilteredLocations(filtered);
    }

    // Send den valgte by til parent-komponenten via callback
    if (onSelectCity) {
      onSelectCity(selectedCity);
    }
  }, [selectedCity, locations, onSelectCity]);

  return (
    <div className="space-y-4">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer flex items-center gap-2 text-[20px] font-light text-black bg-transparent px-4 py-2 focus:outline-none">
            {selectedCity ?? "Lokation"}
            <IoIosArrowDown className={`text-[20px] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel className="text-black">Filtrer efter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSelectedCity(null)}>Alle byer</DropdownMenuItem>
          {cities.map((city) => (
            <DropdownMenuItem key={city} onClick={() => setSelectedCity(city)}>
              {city}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
