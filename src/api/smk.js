// Henter op til 2000 malerier fra SMK’s API,
// som har billeder, ikke er udstillet, og er i public domain
export async function getArts() {
  // Array med tre filterbetingelser
  const baseFilters = ["has_image:true", "on_display:false", "public_domain:true"];
  // Mapper hver filter-streng, sætter [] omkring og sætter sammen til én lang streng. Resultat: "[has_image:true],[on_display:false],[public_domain:true]
  const filterString = baseFilters.map((f) => `[${f}]`).join(",");
  // Samler URL'en
  const url = `https://api.smk.dk/api/v1/art/search/?keys=maleri&filters=${filterString}&offset=0&rows=2000`;

  //Kalder API
  const res = await fetch(url);
  //Omdanner fra JSON til et JavaScript-objekt.
  const data = await res.json();
  // Retunerer listen over kunstværker – tomt objekt hvis fejl
  return data.items || [];
}

// Henter detaljer om et specifikt kunstværk baseret på objectNumber
export async function getArtDetails(objectNumber) {
  const url = `https://api.smk.dk/api/v1/art/?object_number=${objectNumber}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items?.[0]; // Returnér det første (og burde være eneste) match
}
