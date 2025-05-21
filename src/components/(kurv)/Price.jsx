"use client";

import useCartStore from "@/app/store/cartStore"
import Stepper from "@/components/Stepper";
import ButtonSecondary from "@/components/ButtonSecondary";

const Price = () => {
  const { items } = useCartStore((state) => state);

  // Funktion der beregner den samlede pris for alle items i arrayet (kurven)
  const getTotalPrice = () => {
    return items
      .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);
  };

  return (
    <article>
      <section className="flex flex-col gap-4">
        <h4 className="font-semibold mt-5">Abstrakaften</h4>

        {/* Map over items */}
        {items.map((item) => (
  <div key={item.id} className="grid grid-cols-2">
    <div>
      <p className="font-semibold">{item.name}</p>
      <p className="font-light">Pris {item.price} DKK</p>
    </div>
    <div className="justify-self-end">
      <Stepper itemId={item.id} quantity={item.quantity} />
    </div>
  </div>
))}

        <div className="flex items-center gap-4 mt-5">
          <h4 className="font-semibold">Total: {getTotalPrice()} DKK</h4>
          <ButtonSecondary />
        </div>
      </section>
    </article>
  );
};

export default Price;
