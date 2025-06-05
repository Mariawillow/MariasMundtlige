"use client";

import useCartStore from "@/app/store/cartStore";
import Stepper from "@/components/Stepper";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";


const Price = () => {
  const { items } = useCartStore((state) => state);

  const getTotalPrice = () => {
    return items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);
  };

  const { removeItem } = useCartStore((state) => state);


  //output er vores opsamler af items 
  const groupedItems = items.reduce((output, item) => {
    const key = item.eventId;
    if (!output[key]) {
      output[key] = { eventTitle: item.eventTitle, tickets: [] };
    }
    output[key].tickets.push(item);
    return output;
  }, {});

  return (
    <article>
      <section className="gap-4 space-y-6">
        {Object.entries(groupedItems).map(([eventId, group]) => (
          <div key={eventId} className="border-b pb-4">
            <h4 className="font-semibold mt-5">{group.eventTitle}</h4>
            {group.tickets.map((item) => (
              <div key={item.id} className="grid grid-cols-2 items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="font-light">Pris {item.price} DKK</p>
                </div>
                <div className="justify-self-start sm:justify-self-end flex items-center-safe">
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
                  {/* //kryds der kalder på removeItem fra cardStore og fjerner billetterne. */}
                    <RxCross2 size={30} width={20} onClick={() => removeItem(item.id, item.eventId)} className="hover:text-red-600 transition cursor-pointer ml-2" />
                </div>
              </div>
            ))}

            <Link href={`/event/${eventId}`}>
              <button className="mt-2 text-sm text-[#C4FF00] underline hover:opacity-80 hover:cursor-pointer">Gå til event</button>
            </Link>
          </div>
        ))}
        <div className="flex items-center gap-4 mt-5">
          <h4 className="font-semibold ml-auto">Total: {getTotalPrice()} DKK</h4>
        </div>
      </section>
    </article>
  );
};

export default Price;
