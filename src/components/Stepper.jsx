'use client';

import useCartStore from '@/app/store/cartStore';
import { useState } from 'react';

export default function Stepper({ itemId, quantity, item, remainingTickets }) {
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const [error, setError] = useState(null);

  // Beregn total antal billetter for dette event på tværs af alle typer
  const totalSelectedForEvent = items
    .filter(i => i.eventId === item.eventId)
    .reduce((sum, i) => sum + i.quantity, 0);

  
    const increment = () => {
      if (totalSelectedForEvent < remainingTickets) {
        setError(null);
        if (quantity === 0) {
          addItem(item);
        } else {
          updateItemQuantity(itemId, item.eventId, quantity + 1);
        }
      } else {
        setError("Der er ikke flere billetter tilgængelige.");
      }
    };

  const decrement = () => {
    if (quantity > 1) {
      updateItemQuantity(itemId, item.eventId, quantity - 1);
    } else if (quantity === 1) {
      updateItemQuantity(itemId, item.eventId, 0);
    }
    setError(null);
  };

  return (
    <div className="flex items-center gap-4 text-2xl">
            <div className="flex items-center gap-4 text-2xl">
      {quantity > 0 && (
        <>
          <button
            onClick={decrement}
            className="px-3 py-1 border border-black hover:border-lime-400 transition"
          >
            −
          </button>
          <span>{quantity}</span>
        </>
      )}
      <button
          onClick={increment}
          className="px-3 py-1 border border-black hover:border-lime-400 transition"
          disabled={totalSelectedForEvent >= remainingTickets}
        >
          +
        </button>
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
