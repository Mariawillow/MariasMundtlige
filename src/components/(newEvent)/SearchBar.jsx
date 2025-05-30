"use client"

import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    onSearch(value); // Giver søgeteksten videre op
  };

  return (
    <div className="input-wrapper">
      <IoIosSearch id="search-icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
      <input placeholder="Søg efter kunstnere her..." value={input} onChange={(e) => handleChange(e.target.value)} className="w-full border rounded px-3 py-2 pr-10" />
    </div>
  );
};
