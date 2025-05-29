import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    onSearch(value); // Giver søgeteksten videre op
  };

  const fetchData = async (malerier) => {
    const baseFilters = ["has_image:true", "on_display:false", "public_domain:true"];
    const filterString = baseFilters.map((f) => `[${f}]`).join(",");
    const url = `https://api.smk.dk/api/v1/art/search/?keys=${malerier}&filters=${filterString}&offset=0&rows=2000`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error("Fejl ved hentning af data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <IoIosSearch id="serach-icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
      <input placeholder="Søg efter events her.." value={input} onChange={(e) => handleChange(e.target.value)} className="w-full border rounded px-3 py-2 pr-10" />
    </div>
  );
};
