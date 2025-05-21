'use client';

import useCartStore from '@/app/store/cartStore';

export default function Stepper({ itemId, quantity }) {
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const increment = () => updateItemQuantity(itemId, quantity + 1);
  const decrement = () => {
    if (quantity > 1) updateItemQuantity(itemId, quantity - 1);
  };

  

  return (
    <div className="flex items-center gap-4 text-2xl">
      {quantity > 1 && (
        <button
          onClick={decrement}
          className="px-3 py-1 border border-black hover:border-lime-400 transition"
        >
          −
        </button>
      )}
      <span>{quantity}</span>
      <button
        onClick={increment}
        className="px-3 py-1 border border-black hover:border-lime-400 transition"
      >
        +
      </button>
    </div>
  );
}
