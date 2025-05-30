"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getEvents } from "@/api/events";
import { firstArtImgHelper } from "@/lib/firstArtImgHelper";
import DashCard from "@/components/(dashboard)/DashCard";
import Header from "@/components/(header)/Header";
import ButtonPrimary from "@/components/ButtonPrimary";

const Dashboard = () => {
  const { user } = useUser();
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    //Finder personlig userId og købler til dashboard.
    if (!user?.id) return; // Vent på at user er hentet og har id

    const fetchUserEvents = async () => {
      const allEvents = await getEvents();

      // Filtrér events, så kun dem der tilhører den aktuelle bruger (user.id)
      const filtered = allEvents.filter((event) => event.userId === user.id);

      // For hvert event: hent det første kunstværks billede hvis muligt med helper-funktion
      const eventsWithImages = await Promise.all(
        filtered.map(async (event) => {
          // Her bruger vi helper-funktionen som henter billed-URL eller fallback
          const thumbnailImage = await firstArtImgHelper(event.artworkIds);

          // Returner event med tilføjet thumbnailImage property
          return {
            ...event,
            thumbnailImage, // altid en string med URL
          };
        })
      );

      setUserEvents(eventsWithImages); // Opdater state med events + billeder
    };

    fetchUserEvents();
  }, [user]);

  return (
    <article>
      <Header />
      <h1 className="mb-6">Dashboard</h1>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{userEvents.length > 0 ? "Dine oprettede events" : "Du har ingen oprettede events..."}</h3>
        <ButtonPrimary href="/newEvent">Opret event</ButtonPrimary>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userEvents.map((event) => (
          <DashCard key={event.id} event={event} />
        ))}
      </div>
    </article>
  );
};

export default Dashboard;
