"use client";

import Image from "next/image";
import Header from "@/components/(header)/Header";
import StatuePic from "@/images/statuePic.svg";
import { FaTicketAlt } from "react-icons/fa";
import Price from "@/components/(basket)/Price";
import useCartStore from "@/app/store/cartStore";
import { useState } from "react";
import Popup from "@/components/(basket)/Popup";
import ButtonSecondary from "@/components/ButtonSecondary";
import { updateTickets } from "@/api/localhost";

const Basket = () => {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [showPopup, setShowPopup] = useState(false);
  const [totalTickets, setTotalTickets] = useState(0);

  //funktionen der fortæller hvad der sker når brugeren klikker på "køb"-knappen.
  const handleBuyClick = async () => {
    //først tjekkes om der er billetter i kurven. alert(besked) vises hvis ikke.
    if (items.length === 0) {
      alert("Du har ikke valgt nogen billetter!");
      return;
    }

    //Ny funktion "try" der håndtere fejl.
    try {
      //En Løkke som går igennem hvert enkelt element i items-arrayet (hver billet-type eller event)
      for (const item of items) {
        //Henter antallet (quantity) af billetter brugeren vil købe for den aktuelle item og konverterer det til et tal.
        //Hvis quantity er falsy (fx undefined eller tom), sættes det til 0
        const qty = Number(item.quantity) || 0;

        //Kalder funktionen "updatedTickets"
        //opdatere serverens data med det antal billetter (qty) der skal bookes til eventet med ID item.eventId
        await updateTickets({
          id: item.eventId,
          tickets: qty,
        });
      }

      // Beregn total billetter OG gem i state
      const total = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
      setTotalTickets(total);

      //If-statement til at tjekke om clearCart virker og er en function.
      if (typeof clearCart === "function") {
        //Kør funktionen (rydder basket)
        clearCart();
      }

      //Popup af "tak for køb" funktion.
      setShowPopup(true);
    } catch (error) {
      console.error("Fejl ved opdatering af billetter:", error);
      alert("Der skete en fejl under købet. Prøv igen.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-[url('/images/statuePic.svg')] bg-cover bg-no-repeat">
      <div className="block md:hidden absolute inset-0">
        <Image src={StatuePic} alt="Statue" layout="fill" objectFit="cover" priority />
        <div className="absolute inset-0 bg-white opacity-60"></div>
      </div>

      <div className="relative z-10 w-full">
        <Header />

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
              <ButtonSecondary onClick={handleBuyClick}>Køb billetter</ButtonSecondary>
            </div>
          </div>
        </section>

        {showPopup && <Popup onClose={handleClosePopup} totalTickets={totalTickets} />}
      </div>
    </div>
  );
};

export default Basket;
