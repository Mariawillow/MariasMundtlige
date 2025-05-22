export const periods = [
  { id: "barok", name: "Barok", from: 1600, to: 1750 },
  { id: "guldalder", name: "Guldalder", from: 1800, to: 1850 },
  { id: "modernisme", name: "Modernisme", from: 1900, to: 1950 },
  { id: "samtidskunst", name: "Samtidskunst", from: 1950, to: 2025 },
];

export function getPeriodById(id) {
  return periods.find((p) => p.id === id);
}

export function filterArtworksByPeriod(artworks, period) {
  if (!period) return artworks;

  return artworks.filter((art) => {
    const range = art.production_date?.[0]?.period;
    if (!range) return false;

    const [startYear, endYear] = range.split("-").map(Number);
    return endYear >= period.from && startYear <= period.to; // overlap
  });
}
