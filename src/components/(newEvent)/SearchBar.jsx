"use client";

import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    onSearch(value); // Giver søgeteksten videre op
  };

  return (
    <div>
      <label className="text-sm font-medium">Søg efter kunstnere blandt værkerne</label>
      <div className="relative">
        <span className="absolute inset-y-0 right-4 flex items-center pl-3 text-[#5D585E]">
          <IoIosSearch />
        </span>
        <input type="text" placeholder="Søg efter kunstnere her..." value={input} onChange={(e) => handleChange(e.target.value)} className="w-full border px-3 py-2 pr-3" />
      </div>
    </div>
  );
};
