"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getEvents, updateEvent } from "@/api/localhost";
import ArtworkSelection from "@/components/(newEvent)/ArtWorkSelection";
import Header from "@/components/(header)/Header";
import { getPeriodById } from "@/api/periods";

const EditEventPage = ({ params }) => {
  const { id } = use(params);
  const [event, setEvent] = useState(null);
  const [period, setPeriod] = useState(null);
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
      // const periodObj = getPeriodById(found.period) || getPeriodById("");
      // console.log("periodeObj", periodObj);

      setEvent({
        ...found,
        location: locationObj,
      });

      const matchedPeriod = getPeriodById(found.period);
      console.log("found.period", found.period);
      console.log("matchedPeriod", getPeriodById(found.period));
      setPeriod(matchedPeriod ?? null);
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
      <Header></Header>
      <div>
        <h1 className="text-3xl font-bold text-center my-8">Rediger event</h1>
        <ArtworkSelection
          mode="edit"
          defaultData={event}
          date={event.date}
          location={event.location} // vigtig: skal være et objekt
          period={period} // tilpas hvis du bruger mere data
          setPeriod={setPeriod}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
};

export default EditEventPage;
