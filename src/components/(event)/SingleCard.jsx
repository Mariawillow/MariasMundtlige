"use client";

import ButtonSecondary from "@/components/ButtonSecondary";
import Stepper from "@/components/Stepper";
import useCartStore from "@/app/store/cartStore";

const SingleCard = ({ eventData }) => {
  const { items } = useCartStore((state) => state);
  const availableTickets = [
    { id: "1", name: "Voksne", price: 170 },
    { id: "2", name: "Studerende", price: 90 },
  ];
  

  return (
    <section>
      {/* Top: Titel og Dato */}
      <div>
        <h1 className="font-semibold">{eventData.title}</h1>
        <h3 className="font-light ml-60">{eventData.date}</h3>
      </div>

      {/* Nederste sektion i to kolonner */}
      <div className="grid grid-cols-2 gap-8">
        {/* Om Eventet */}
        <section className="flex flex-col gap-4">
          <div>
            <h4 className="font-semibold">Om Eventet</h4>
            <p className="font-light">{eventData.description}</p>
            <p className="font-light">Eventet er arrangeret af kurator {eventData.curator}</p>
          </div>
          <div>
            <h4 className="font-semibold">Lokation</h4>
            <p>
              {eventData.location.name}, {eventData.location.address}
            </p>
          </div>
        </section>

        {/* Billetter */}
        <section className="flex flex-col gap-4">
        {availableTickets.map((ticket) => {
          const cartItem = items.find(
            (i) => i.id === ticket.id && i.eventId === eventData.id 
          );
          const quantity = cartItem?.quantity || 0;

            return (
              <div key={ticket.id} className="grid grid-cols-2">
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
            eventId: eventData.id, // 💡 Her tilføjes det!
            eventTitle: eventData.title,
          }}
        />
            </div>
              </div>
            );
          })}

          <ButtonSecondary />
        </section>
      </div>
    </section>
  );
};

export default SingleCard;
