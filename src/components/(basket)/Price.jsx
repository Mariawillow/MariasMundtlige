"use client";

import useCartStore from "@/app/store/cartStore";
import Stepper from "@/components/Stepper";
import Link from "next/link";

const Price = () => {
  const { items } = useCartStore((state) => state);

  const getTotalPrice = () => {
    return items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);
  };

  const groupedItems = items.reduce((acc, item) => {
    const key = item.eventId;
    if (!acc[key]) {
      acc[key] = { eventTitle: item.eventTitle, tickets: [] };
    }
    acc[key].tickets.push(item);
    return acc;
  }, {});

  return (
    <article>
      <section className="flex flex-col gap-4">
        {Object.entries(groupedItems).map(([eventId, group]) => (
          <div key={eventId}>
            <h4 className="font-semibold mt-5">{group.eventTitle}</h4>
            {group.tickets.map((item) => (
              <div key={item.id} className="grid grid-cols-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="font-light">Pris {item.price} DKK</p>
                </div>
                <div className="justify-self-end">
                  <Stepper
                    itemId={item.id}
                    quantity={item.quantity}
                    item={{
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      eventId: item.eventId,
                      eventTitle: item.eventTitle,
                      remainingTickets: item.remainingTickets,
                      bookedTickets: item.bookedTickets,
                    }}
                    remainingTickets={item.remainingTickets}
                  />
                </div>
              </div>
            ))}
            <Link href={`/event/${eventId}`}>
              <button className="mt-2 text-sm text-[#C4FF00] underline hover:opacity-80 hover:cursor-pointer">Gå til event</button>
            </Link>
          </div>
        ))}
        <div className="flex items-center gap-4 mt-5">
          <h4 className="font-semibold">Total: {getTotalPrice()} DKK</h4>
        </div>
      </section>
    </article>
  );
};

export default Price;
