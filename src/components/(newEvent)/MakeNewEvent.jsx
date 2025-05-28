//Samler ALT på siden
"use client";

import { useState, useEffect } from "react";
import EventFilters from "@/components/(newEvent)/EventFilters";
import ArtworkSelection from "@/components/(newEvent)/ArtworkSelection";
import { format } from "date-fns";

export default function MakeNewEvent() {
  //Dato og location gemmes i useState
  const [date, setDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null); // String
  const [location, setLocation] = useState(null);
  const [period, setPeriod] = useState(null);

  const isReady = date && location && period;

  useEffect(() => {
    if (date) {
      const formatted = format(date, "yyyy-MM-dd");
      setFormattedDate(formatted);
    }
  }, [date]);

  return (
    <section>
      <EventFilters
        date={date}
        setDate={setDate}
        location={location}
        setLocation={setLocation}
        period={period}
        setPeriod={setPeriod} />
      {/* Vi sender dato og location med videre til komponentet */}
      {isReady && <ArtworkSelection
        date={formattedDate}
        location={location}
        period={period} />}
    </section>
  );
}
