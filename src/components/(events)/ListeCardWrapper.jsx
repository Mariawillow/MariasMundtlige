"use client"

import ListeCard from "./ListeCard";

const ListeCardWrapper = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {events.map((event) => (
        <ListeCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default ListeCardWrapper;
