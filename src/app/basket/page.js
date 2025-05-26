"use client";

import Image from "next/image";
import Header from "@/components/(header)/Header";
import StatuePic from "@/images/statuePic.svg";
import { FaTicketAlt } from "react-icons/fa";
import Price from "@/components/(kurv)/Price";
import useCartStore from "@/app/store/cartStore";
import { useState } from "react";
import Popup from "@/components/Popup";
import ButtonTertiary from "@/components/ButtonTertiary";
import { updateTickets } from "@/api/localhost";

const Basket = () => {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [showPopup, setShowPopup] = useState(false);

  const handleBuyClick = async () => {
    if (items.length === 0) {
      alert("Du har ikke valgt nogen billetter!");
      return;
    }

    try {
      for (const item of items) {
        const booked = Number(item.bookedTickets) || 0;
        const qty = Number(item.quantity) || 0;
        const updatedBooked = booked + qty;

        console.log(`Opdaterer eventId ${item.eventId} med bookedTickets: ${updatedBooked}`);

        await updateTickets({
          id: item.eventId,
          bookedTickets: updatedBooked,
        });
      }

      if (typeof clearCart === "function") {
        clearCart(); // Ryd kurven efter køb
      } else {
        console.warn("clearCart findes ikke som funktion i useCartStore");
      }

      setShowPopup(true);
    } catch (error) {
      console.error("Fejl ved opdatering af billetter:", error);
      alert("Der skete en fejl under købet. Prøv igen.");
    }
  };

  return (
    <div className="bg-[url('/images/statuePic.svg')] bg-cover bg-no-repeat">
      <div className="block md:hidden absolute inset-0 -z-10">
        <Image src={StatuePic} alt="Statue" layout="fill" objectFit="cover" className="scale-x-[-1]" priority />
      </div>

      <div className="relative z-10 w-full">
        <Header variant="black" />

        <section className="grid md:grid-cols-2 gap-4 min-h-[200px]">
          <div className="hidden md:block">
            <Image src={StatuePic} alt="statuebillede" width={300} height={200} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="text-center">
              <h1 className="font-semibold">Eventbilletter</h1>
              <p className="font-light">Du modtager eventbilletten med det samme efter bestilling på din e-mail (Modtager du ikke en mail indenfor for 5 minutter, så tjek dit SPAM-filter) Børn under 18 år kommer gratis ind til events.</p>
            </div>

            <div className=" w-100 h-1 bg-[#C4FF00] mx-auto mt-10 mb-10"></div>

            <div className="flex items-center">
              <FaTicketAlt className="text-[#C4FF00] scale-x-[3] scale-y-[3] m-5" />
              <h2 className="font-light">Billetter</h2>
            </div>

            {items.length === 0 && <p>Du har ikke valgt nogle billetter..</p>}

            <Price />

            <div className="mt-6 text-center">
              <ButtonTertiary onClick={handleBuyClick} />
            </div>
          </div>
        </section>

        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
};

export default Basket;
