"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function SortingDropdown({ onSortChange }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* Triggeren åbner/lukker menuen */}
      {/* Vi bruger `asChild` for selv at kunne styre hvilket element der bruges som trigger.
          Uden `asChild` ville DropdownMenuTrigger selv lave en <button>, og så får vi ulovlig HTML
          med en <button> inde i en anden <button> – det giver en fejl i browseren og i Next.js (hydration error) */}
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer flex items-center gap-2 text-[20px] font-light text-black bg-transparent focus:outline-none">
          Sorter
          {/* Pil der roterer når dropdown er åben */}
          <IoIosArrowDown className={`text-[20px] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel className="text-black">Kategorier</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onSortChange("popularity")}>Popularitet</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange("alphabetical")}>A-Å</DropdownMenuItem>
        <DropdownMenuItem className="mt-5 italic" onClick={() => onSortChange(null)}>
          Nulstil sortering
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
