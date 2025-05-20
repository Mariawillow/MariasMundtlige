"use client";


import ButtonSecondary from "@/components/ButtonSecondary";
import Stepper from "@/components/Stepper";
import useCartStore from "@/app/store/cartStore"


const SingleCard = ({ eventData }) => {
  const { updateItemQuantity } = useCartStore((state) => state);

//Funktion kaldes ved klik på minus
const handleDecrement = () => {
  //Tjekker om quantity er større end 1 – så den ALDRIG går ned på 0 eller negative tal.
  // Hvis betingelsen er opfyldt reduceres mængden med 1
  if (eventData.quantity > 1) {
    updateItemQuantity(eventData.id, eventData.quantity - 1);
  }
};

//Funktion kaldes ved klik på plus
const handleIncrement = () => {
  //Øger quantity med 1
  updateItemQuantity(eventData.id, eventData.quantity + 1);
};




  return (
    <section>
      {/* Top: Titel og Dato */}
      <div>
        <h1 className=" font-semibold">{eventData.title}</h1>
        <h3 className="font-light  ml-60">{eventData.date}</h3>
      </div>
      {/* Nederste sektion i to kolonner */}
      <div className="grid grid-cols-2 gap-8">
        {/* Om Eventet */}
        <section className="flex flex-col gap-4">
          <div>
            <h4 className="font-semibold">Om Eventet</h4>
            <p className="font-light">{eventData.description}</p>
            <p className="font-light">Eventet er arrangeret af kurator {eventData.curator}</p>
          </div>
          <div>
            <h4 className="font-semibold">Lokation</h4>
            <p>
              {eventData.location.name}, {eventData.location.address}
            </p>
          </div>
        </section>

        {/* Billetter */}
        <section className="flex flex-col gap-4">
          <h4 className="font-semibold">Billetter</h4>
          <div className="grid grid-cols-2">
            <div>
              <p className="font-semibold">Voksen</p>
              <p className="font-light">Pris 170 DKK</p>
            </div>
            <Stepper />
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="font-semibold">Studenter</p>
              <p className="font-light">Pris 90 DKK</p>
            </div>
            <Stepper />
          </div>

          <ButtonSecondary />
        </section>
      </div>
    </section>
  );
};

export default SingleCard;
