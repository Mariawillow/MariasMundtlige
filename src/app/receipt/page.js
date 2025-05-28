"use client";

import { useEffect, useState } from "react";
import { getEventById } from "@/api/localhost";
import Header from "@/components/(header)/Header";
import ButtonSecondary from "@/components/ButtonSecondary";

export default function ReceiptPage() {
  const [receipt, setReceipt] = useState(null);
  const [events, setEvents] = useState({}); // Her gemmer vi alle events vi henter

  useEffect(() => {
    // 1. Hent kvittering fra sessionStorage
    const rawReceipt = sessionStorage.getItem("receipt");

    if (rawReceipt) {
      const parsedReceipt = JSON.parse(rawReceipt);
      setReceipt(parsedReceipt);

      // 2. Find alle unikke eventId'er
      const eventIds = [...new Set(parsedReceipt.items.map((item) => item.eventId))];

      // 3. Hent events én for én
      const fetchAllEvents = async () => {
        const fetchedEvents = {};
        for (const id of eventIds) {
          try {
            const data = await getEventById(id);
            fetchedEvents[id] = data;
          } catch (err) {
            console.error(`Kunne ikke hente event med id: ${id}`, err);
          }
        }
        setEvents(fetchedEvents);
      };

      fetchAllEvents();
    }
  }, []);

  if (!receipt) return <p>Indlæser kvittering...</p>;

  // 4. Gruppér billetter efter eventId
  const groupedTickets = {};
  receipt.items.forEach((ticket) => {
    if (!groupedTickets[ticket.eventId]) {
      groupedTickets[ticket.eventId] = [];
    }
    groupedTickets[ticket.eventId].push(ticket);
  });

  // 5. Beregn samlet pris
  const totalPrice = receipt.items.reduce((sum, ticket) => {
    return sum + (Number(ticket.price) || 0) * (Number(ticket.quantity) || 0);
  }, 0);

  return (
    <div>
      <Header />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Tak for din bestilling!</h1>
      </div>

      {/* Vis billetter pr. event */}
      {Object.keys(groupedTickets).map((eventId) => {
        const event = events[eventId];
        if (!event) return null;

        return (
          <div key={eventId} className="mb-10  p-6">
            <h2 className="text-2xl font-semibold">{event.title}</h2>
            <p className="text-gray-500 mb-4">Dato: {event.date}</p>
            <hr className="mb-4 border-[#C4FF00] border-t-2" />

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {groupedTickets[eventId].map((ticket, index) => (
                <div key={index} className="bg-white p-4">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <p className="font-medium">Billet-type:</p>
                      <p>{ticket.name}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium">Antal:</p>
                      <p>{ticket.quantity}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium">Pris pr. billet:</p>
                      <p>{ticket.price} kr</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-4 text-right space-y-4">
        <h3 className="font-bold">Total: {totalPrice} kr</h3>
        <div className="mt-4 mb-4">
          <ButtonSecondary href="/">
            <span className="block text-base text-center">Tilbage til forsiden</span>
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}
