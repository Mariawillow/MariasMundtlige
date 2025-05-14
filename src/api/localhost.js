import SingleCard from "@/components/(event)/SingleCard";

//Denne henter dummy events fra Dannie
export async function getEvents() {
  const events = await fetch("http://localhost:8080/events", {}).then((res) => res.json());
  return events;
}

//Denne henter alle SMK's værker som har et billede og IKKE er udstillet (display)
export async function getArts() {
  const arts = await fetch("https://api.smk.dk/api/v1/art/search/?keys=*&filters=[has_image:true],[on_display:false],[public_domain:true]&offset=0&rows=1", {}).then((res) => res.json());
  return arts;
}
