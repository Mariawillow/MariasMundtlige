"use client";

import { periods } from "@/api/periods";


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
