"use client";


import ButtonSecondary from "@/components/ButtonSecondary";
import Stepper from "@/components/Stepper";
import useCartStore from "@/app/store/cartStore";


const SingleCard = ({ eventData }) => {
  const { items } = useCartStore((state) => state);

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
    <ButtonSecondary />
      </section>
        </div>
          </section>
  );
};

export default SingleCard;
