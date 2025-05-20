//Samler ALT på siden
"use client";

import { useState, useEffect } from "react";
import EventFilters from "@/components/(newEvent)/EventFilters";
import ArtworkSelection from "./ArtWorkSelection";
import { format } from "date-fns";

export default function MakeNewEvent() {
  //Dato og location gemmes i useState
  const [date, setDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null); // String
  const [location, setLocation] = useState(null);

  const isReady = date && location;

  useEffect(() => {
    if (date) {
      const formatted = format(date, "yyyy-MM-dd");
      setFormattedDate(formatted);
    }
  }, [date]);

  return (
    <section>
      <EventFilters date={date} setDate={setDate} location={location} setLocation={setLocation} /> {/* Vi sender dato og location med videre til komponentet */}
      {isReady && <ArtworkSelection date={formattedDate} location={location} />}
    </section>
  );
}
