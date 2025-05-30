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

  const increase = () => {
    if (!disablePlus) {
      addItem(item);
    }
  };

  const decrease = () => {
    if (quantity > 0) {
      updateItemQuantity(itemId, item.eventId, quantity - 1);
    }
  };

  return (
    <div>
      <div className="flex items-center place-self-end justify-between gap-2">
        <button
          onClick={decrease}
          disabled={quantity === 0}
          className={`w-10 h-10 border border-black text-xl flex items-center justify-center transition ${quantity === 0 ? "opacity-30 hover:border-black cursor-not-allowed" : "hover:border-[#C4FF00] cursor-pointer"
            }`}
        >
          −
        </button>

        <span className="text-2xl w-8 text-center tabular-nums">{quantity}</span>

        <button
          onClick={increase}
          disabled={disablePlus}
          className={`w-10 h-10 border border-black text-xl flex items-center justify-center transition ${disablePlus ? "opacity-30 hover:border-black cursor-not-allowed" : "hover:border-[#C4FF00] cursor-pointer"
            }`}
        >
          +
        </button>
      </div>
    </div>
  );
}
