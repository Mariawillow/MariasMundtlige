"use client";

import ButtonSecondary from "@/components/ButtonSecondary";
import Stepper from "@/components/Stepper";
import useCartStore from "@/app/store/cartStore";
import { format } from "date-fns";
import { da } from "date-fns/locale";


const SingleCard = ({ eventData }) => {
  const { items } = useCartStore((state) => state);
  const formattedDate = format(new Date(eventData.date), "d. MMMM yyyy", { locale: da });


  const availableTickets = [
    { id: "1", name: "Voksne", price: 170 },
    { id: "2", name: "Studerende", price: 90 },
  ];

  const remainingTickets = eventData.totalTickets - eventData.bookedTickets;

  return (
    <section className="px-4">
      {/* Titel og dato */}
      <div className="mb-4">
        <h1 className="font-semibold text-2xl">{eventData.title}</h1>
        <h3 className="font-light text-lg">{formattedDate}</h3>
      </div>


      {/* Info + billetter */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 mt-10">
        {/* Om eventet */}
        <section className="flex flex-col gap-4">
          <div>
            <h4 className="font-semibold">Om Eventet</h4>
            <p className="font-light">{eventData.description}</p>
          </div>
          <div>
            <h4 className="font-semibold">Lokation</h4>
            <p>
              {eventData.location.name}, {eventData.location.address}
            </p>
          </div>
        </section>

        {/* Billetter */}
        <section className="flex flex-col gap-6">
          {availableTickets.map((ticket) => {
            const cartItem = items.find((i) => i.id === ticket.id && i.eventId === eventData.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <div key={ticket.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <p className="font-semibold">{ticket.name}</p>
                  <p className="font-light">Pris {ticket.price} DKK</p>
                </div>
                <div className="justify-self-end">
                  <Stepper
                    itemId={ticket.id}
                    quantity={quantity}
                    item={{
                      id: ticket.id,
                      name: ticket.name,
                      price: ticket.price,
                      eventId: eventData.id,
                      eventTitle: eventData.title,
                      remainingTickets: eventData.totalTickets - eventData.bookedTickets,
                    }}
                  />
                </div>
              </div>
            );
          })}

          <div className="flex justify-end">
            <ButtonSecondary />
          </div>
        </section>
      </div>
    </section>
  );
};

export default SingleCard;
