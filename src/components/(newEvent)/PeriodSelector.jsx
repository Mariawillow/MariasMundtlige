"use client";

import { useEffect, useState } from "react";

// Kunstperioder (kan flyttes ud i separat fil senere hvis ønsket)
const periods = [
  { id: "barok", name: "Barok", from: 1600, to: 1750 },
  { id: "guldalder", name: "Guldalder", from: 1800, to: 1850 },
  { id: "modernisme", name: "Modernisme", from: 1900, to: 1950 },
  { id: "samtidskunst", name: "Samtidskunst", from: 1950, to: 2025 },
];

// Gør perioden tilgængelig udenfor komponent
export function getPeriodById(id) {
  return periods.find((p) => p.id === id);
}

export default function PeriodSelector({ period, setPeriod }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Kunstperiode</label>
      <select
        value={period?.id || ""}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selected = periods.find((p) => p.id === selectedId);
          setPeriod(selected);
        }}
        className="border rounded px-3 py-2"
      >
        <option value="" disabled>
          Vælg periode
        </option>
        {periods.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
