"use client";

import useCartStore from "@/app/store/cartStore";
import { useState, useEffect } from "react";

export default function Stepper({ itemId, quantity, item }) {
  const addItem = useCartStore((state) => state.addItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const items = useCartStore((state) => state.items);

  const [error, setError] = useState(null);
  const [disablePlus, setDisablePlus] = useState(false);

  // Beregn samlet antal billetter for event
  const totalQuantityForEvent = items.filter((i) => i.eventId === item.eventId).reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    if (totalQuantityForEvent >= item.remainingTickets) {
      setDisablePlus(true);
      setError("Der er ikke flere billetter tilgængelige.");
    } else {
      setDisablePlus(false);
      setError(null);
    }
  }, [totalQuantityForEvent, item.remainingTickets]);

  const increment = () => {
    if (!disablePlus) {
      addItem(item);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      updateItemQuantity(itemId, item.eventId, quantity - 1);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 text-2xl place-self-end w-[150px] justify-between">
        <button onClick={decrement} disabled={quantity === 0} className={`px-3 py-1 border border-black transition ${quantity === 0 ? "opacity-50 hover:border-black hover:cursor-default" : "hover:border-[#C4FF00] cursor-pointer"}`}>
          −
        </button>

        <span className="w-8 text-center tabular-nums">{quantity}</span>

        <button onClick={increment} disabled={disablePlus} className={`px-3 py-1 border border-black transition ${disablePlus ? "opacity-50 hover:border-black hover:cursor-default" : "hover:border-[#C4FF00] cursor-pointer"}`}>
          +
        </button>
      </div>

      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
}
