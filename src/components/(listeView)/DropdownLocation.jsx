"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import React, { useState } from "react";

export default function LocationDropdown() {
  // Her holder vi styr på, om dropdownen er åben eller lukket
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* Triggeren åbner/lukker menuen */}
      {/* Vi bruger `asChild` for selv at kunne styre hvilket element der bruges som trigger.
          Uden `asChild` ville DropdownMenuTrigger selv lave en <button>, og så får vi ulovlig HTML
          med en <button> inde i en anden <button> – det giver en fejl i browseren og i Next.js (hydration error) */}
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 text-[32px] font-light text-black bg-transparent border border-[#726572] focus:outline-none focus:ring-1 focus:ring-[#726572] focus:ring-offset-1"
        >
          Lokation
          {/* Pil der roterer når dropdown er åben */}
          <IoIosArrowDown
            className={`text-[32px] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
              }`}
          />
        </button>
      </DropdownMenuTrigger>

      {/* Indholdet i dropdown-menuen */}
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel className="text-black">Lokationer</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Århus</DropdownMenuItem>
        <DropdownMenuItem>København</DropdownMenuItem>
        <DropdownMenuItem>Køge</DropdownMenuItem>
        <DropdownMenuItem>Odense</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
