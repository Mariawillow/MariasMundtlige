"use client";
import EventInformation from "@/components/(newEvent)/EventInformation";
import Header from "@/components/(header)/Header";
import EventFilters from "@/components/(newEvent)/EventFilters";

import { use, useEffect, useState } from "react";

import { getEvents, updateEvent } from "@/api/events";
import { getPeriodById } from "@/api/periods";

const EditEventPage = ({ params }) => {
  const { id } = use(params);
  const [event, setEvent] = useState(null);
  const [period, setPeriod] = useState(null);
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents();
      const found = events.find((e) => e.id === id);
      if (!found) return;

      // Find lokationen som objekt.
      const locationObj = found.location || {
        id: found.locationId,
        name: "Ukendt lokation",
        maxArtworks: 6, //Det mindste antal værker der kan være på en lokation.
      };

      setEvent({
        ...found,
        location: locationObj,
      });

      setDate(found.date);
      setLocation(locationObj);

      const matchedPeriod = getPeriodById(found.period);
      setPeriod(matchedPeriod ?? null);
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (updatedFields) => {
    try {
      await updateEvent({ id, ...updatedFields });
    } catch (err) {
      alert("Noget gik galt under opdatering af event");
    }
  };

  if (!event) return <p className="text-center mt-12">Indlæser event...</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <h1 className="text-3xl font-bold text-center my-8">Rediger event</h1>
      <EventFilters date={date} setDate={setDate} location={location} setLocation={setLocation} period={period} setPeriod={setPeriod} />

      <EventInformation mode="edit" defaultData={event} date={date} location={location} period={period} setPeriod={setPeriod} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditEventPage;
