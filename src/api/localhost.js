//Denne henter dummy events fra Dannie
export async function getEvents() {
  const events = await fetch("http://localhost:8080/events", {}).then((res) => res.json());
  return events;
}

//Denne henter dummy locations fra Dannie
export async function getLocations() {
  const locations = await fetch("http://localhost:8080/locations", {}).then((res) => res.json());
  return locations;
}

