"use client";

export default function Stepper({ quantity, onQuantityChange, maxQuantity }) {
  const disablePlus = quantity >= maxQuantity;

  // onQuantityChange() bliver kaldt ved klik på +/–, som opdaterer state i SingleCard
  const increase = () => {
    if (!disablePlus) {
      onQuantityChange(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div>
      <div className="flex items-center place-self-end justify-between gap-2">
        <button
          onClick={decrease}
          disabled={quantity === 0}
          className={`w-10 h-10 border border-black text-xl flex items-center justify-center transition ${
            quantity === 0
              ? "opacity-30 hover:border-black cursor-not-allowed"
              : "hover:border-[#C4FF00] cursor-pointer"
          }`}
        >
          −
        </button>

        <span className="text-2xl w-8 text-center tabular-nums">{quantity}</span>

        <button
          onClick={increase}
          disabled={disablePlus}
          className={`w-10 h-10 border border-black text-xl flex items-center justify-center transition ${
            disablePlus
              ? "opacity-30 hover:border-black cursor-not-allowed"
              : "hover:border-[#C4FF00] cursor-pointer"
          }`}
        >
          +
        </button>
      </div>
    </div>
  );
}