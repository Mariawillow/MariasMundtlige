"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getEvents } from "@/api/events";
import { firstArtImgHelper } from "@/lib/firstArtImgHelper";
import DashCard from "@/components/(dashboard)/DashCard";
import Header from "@/components/(header)/Header";
import ButtonPrimary from "@/components/ButtonPrimary";

// Her hentes den aktuelle bruger (user), og der oprettes et state til at gemme brugerens events.
const Dashboard = () => {
  const { user } = useUser(); //En clerk hook, der giver adgang til den loggede ind bruger.
  const [userEvents, setUserEvents] = useState([]); //State, der gemmer en liste over events oprettet af brugeren.

  //useEffect bestemmer hvornår koden køres.
  useEffect(() => {
    //Finder personlig userId og kobler til dashboard.
    if (!user?.id) return; // Hvis ikke der er noget useId så afbrød funktionen

    // Asynkron funktion der henter ALLE events fra API’et og gemmer dem i allEvents.
    // Vi bruger await, fordi getEvents() er et API-kald som kan tage tid.
    const fetchUserEvents = async () => {
      const allEvents = await getEvents(); // Henter alle events fra serveren

      // Filtrér events, så kun dem der tilhører den aktuelle bruger (user.id) vises
      const filtered = allEvents.filter((event) => event.userId === user.id);

      // For hvert event: hent det første kunstværks billede hvis muligt med helper-funktion
      const eventsWithImages = await Promise.all(
        // Promise.all kører alle async-kald (billede-hentning) samtidig og venter på at ALLE er færdige.
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
    <article className="px-4 sm:px-4">
      <title>Dashboard</title>
      <Header />
      <h1 className="mb-6 mt-10">Dashboard</h1>

      <div className="flex flex-col md:flex-row justify-between mb-4">
        <h3 className="text-xl order-1 md:order-0 font-semibold mt-6">{userEvents.length > 0 ? "Dine oprettede events" : "Du har ingen oprettede events..."}</h3>
        <div className="self-end">
          <ButtonPrimary href="/newEvent">Opret event</ButtonPrimary>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userEvents.map((event) => (
          <DashCard key={event.id} event={event} />
        ))}
      </div>
    </article>
  );
};

export default Dashboard;
