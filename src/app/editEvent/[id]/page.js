"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getEvents, updateEvent } from "@/api/localhost";
import ArtworkSelection from "@/components/(newEvent)/ArtworkSelection";

const EditEventPage = ({ params }) => {
  const { id } = use(params);
  const [event, setEvent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents();
      const found = events.find((e) => e.id === id);
      if (!found) return;

      // Find lokationen som objekt (hvis din ArtworkSelection forventer det)
      const locationObj = found.location || {
        id: found.locationId,
        name: "Ukendt lokation",
        maxArtworks: 3,
      };

      // Find eller gæt perioden som objekt
      const periodObj = found.period
        ? { id: found.period, from: 1800, to: 2025 } // Du kan sætte dine egne grænser her
        : { id: "modern", from: 1900, to: 2025 };

      setEvent({
        ...found,
        location: locationObj,
        period: periodObj, // læg det ind i event direkte
      });
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (updatedFields) => {
    try {
      await updateEvent({ id, ...updatedFields });
      router.push("/dashboard");
    } catch (err) {
      console.error("Fejl ved opdatering af event:", err);
      alert("Noget gik galt under opdatering");
    }
  };

  if (!event) return <p className="text-center mt-12">Indlæser event...</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Rediger event</h1>
      <ArtworkSelection
        mode="edit"
        defaultData={event}
        date={event.date}
        location={event.location} // vigtig: skal være et objekt
        period={event.period} // tilpas hvis du bruger mere data
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default EditEventPage;
