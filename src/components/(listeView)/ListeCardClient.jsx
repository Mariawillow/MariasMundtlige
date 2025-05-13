"use client";
import ListeCard from "./ListeCard";

const ListeCardClient = ({ events }) => {
  return (
    <div className="flex gap-4 mt-4 flex-wrap justify-center items-center">
      {events.map((event) => (
        <ListeCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default ListeCardClient;
