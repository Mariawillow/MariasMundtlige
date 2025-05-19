"use client";
import React, { useState, useEffect } from "react";
import { getTickets } from "@/api/localhost";
import { IoIosArrowDown } from "react-icons/io";


import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";




export default function SortingDropdown() {
  // Her holder vi styr på, om dropdownen er åben eller lukket
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
        setFilteredTickets(data);
      } catch (error) {
        console.error("Fejl ved hentning af lokationer:", error);
      }
    };
    fetchTickets();
  }, []);
  

  
  


  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* Triggeren åbner/lukker menuen */}
      {/* Vi bruger `asChild` for selv at kunne styre hvilket element der bruges som trigger.
          Uden `asChild` ville DropdownMenuTrigger selv lave en <button>, og så får vi ulovlig HTML
          med en <button> inde i en anden <button> – det giver en fejl i browseren og i Next.js (hydration error) */}
      <DropdownMenuTrigger asChild>
        <button
          className="cursor-pointer flex items-center gap-2 text-[32px] font-light text-black bg-transparent focus:outline-none"
        >
          Sorter
          {/* Pil der roterer når dropdown er åben */}
          <IoIosArrowDown
            className={`text-[32px] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
              }`}
          />
        </button>
      </DropdownMenuTrigger>

      {/* Indholdet i dropdown-menuen */}
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel className="text-black">Kategorier</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Popularitet</DropdownMenuItem>
        <DropdownMenuItem>A-Å</DropdownMenuItem>
        <DropdownMenuItem>??</DropdownMenuItem>
        <DropdownMenuItem>??</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
