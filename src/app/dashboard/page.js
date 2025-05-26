"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getEvents } from "@/api/localhost";
import { getArtDetails } from "@/api/smk";
import DashCard from "@/components/(dashboard)/DashCard";
import Header from "@/components/(header)/Header";
import ButtonPrimary from "@/components/ButtonPrimary";

const Dashboard = () => {
  const { user } = useUser();
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchUserEvents = async () => {
      const allEvents = await getEvents();
      const filtered = allEvents.filter((event) => event.userId === user.id);

      const enriched = await Promise.all(
        filtered.map(async (event) => {
          const firstArtworkId = event.artworkIds?.[0];
          let thumbnailImage = null;

          if (firstArtworkId) {
            try {
              const art = await getArtDetails(firstArtworkId);
              thumbnailImage = art?.image_thumbnail || null;
            } catch (error) {
              console.error("Fejl ved hentning af værk:", error);
            }
          }

          return {
            ...event,
            thumbnailImage,
          };
        })
      );

      setUserEvents(enriched);
    };

    fetchUserEvents();
  }, [user]);

  return (
    <article>
      <Header />
      <h1 className="mb-6">Dashboard</h1>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Dine oprettede events</h3>
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
