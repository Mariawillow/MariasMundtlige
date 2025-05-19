// *********** LOCALHOST ***********

//Denne henter dummy events fra Dannie
export async function getEvents() {
  const events = await fetch("http://localhost:8080/events", {}).then((res) => res.json());
  return events;
}

//Denne henter dummy locations fra Dannie
export async function getLocations() {
  const locations = await fetch("http://localhost:8080/locations", {
    next: {
      revalidate: 3600,
    },
  }).then((res) => res.json());
  return locations;
}

//Denne henter dummy dates fra Dannie
export async function getDates() {
  const dates = await fetch("http://localhost:8080/dates", {
    next: {
      revalidate: 3600,
    },
  }).then((res) => res.json());
  return dates;
}

export async function makeNewEvent({ title, description, date, locationId, artworkIds }) {
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, date, locationId, artworkIds }),
  });

  if (!response.ok) {
    throw new Error("Event could not be created");
  }

  return response.json();
}

// ********* RENDER ***********

//Denne henter events fra vores fjernserver på Render
// export async function getEvents() {
//   const events = await fetch("https://smk-4l23.onrender.com/events", {}).then((res) => res.json());
//   return events;
// }
