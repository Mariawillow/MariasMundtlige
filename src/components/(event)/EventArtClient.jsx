"use client";
import EventArt from "./EventArt";

const EventArtClient = ({ artworkIds, arts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {artworkIds.map((artworkId) => {
        // Find det matchende kunstværk baseret på ID
        const matchedArt = arts.find((art) => typeof art?.object_number === "string" && typeof artworkId === "string" && art.object_number.toLowerCase() === artworkId.toLowerCase());
        console.log("Matched art:", matchedArt);

        return matchedArt ? <EventArt key={artworkId} art={matchedArt} /> : <div key={artworkId}>Kunstværk ikke fundet: {artworkId}</div>;
      })}
    </div>
  );
};

export default EventArtClient;
