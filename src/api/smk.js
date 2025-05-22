// Henter alle kunstværker fra SMK, som har billede og ikke er udstillet
export async function getArts() {
  const res = await fetch("https://api.smk.dk/api/v1/art/search/?keys=*&filters=[has_image:true],[on_display:false],[public_domain:true]&offset=0&rows=200");
  const data = await res.json();
  return data.items || [];
}

// Henter detaljer om et specifikt kunstværk baseret på objectNumber
export async function getArtDetails(objectNumber) {
  const url = `https://api.smk.dk/api/v1/art/?object_number=${objectNumber}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items?.[0]; // Returnér det første (og burde være eneste) match
}
