"use client";
import ListeCardNy from "./ListeCardNy";

const ListeCardClient = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {events.map((event) => (
        <ListeCardNy key={event.id} event={event} />
      ))}
    </div>
  );
};

export default ListeCardClient;
