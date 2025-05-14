"use client";
import EventArt from "./EventArt";

const EventArtClient = ({ arts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {arts.map((art) => (
        <EventArt key={art.id} event={art} />
      ))}
    </div>
  );
};

export default EventArtClient;
