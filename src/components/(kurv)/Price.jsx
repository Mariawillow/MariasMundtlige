import useCartStore from "@/app/store/cartStore"
import Stepper from "@/components/Stepper";
import ButtonSecondary from "@/components/ButtonSecondary";


const Price = () => {
// Henter arrayet 'items' (varer i kurven) fra Zustand-staten
const { items } = useCartStore((state) => state);

// Funktion der beregner den samlede pris for alle items i arrayet (kurven)
const getTotalPrice = () => {
  return items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0).toFixed(2); // Beregner den totale pris baseret på prisen på varen og antal af varen. Starter med 0 som udgangspunkt. Sørger for at resultatet vises med 2 decimaler.
};

    return ( <article>
        
          {/* Billetter */}
          <section className="flex flex-col gap-4">
            <h4 className="font-semibold mt-5">Abstrakt Aften</h4>
            <div className="grid grid-cols-2">
              <div>
                <p className="font-semibold">Voksen</p>
                <p className="font-light">Pris 170 DKK</p>
              </div>
              <div className="justify-self-end">
                <Stepper />
              </div>{" "}
            </div>
            <div className="grid grid-cols-2">
              <div>
                <p className="font-semibold">Studenter</p>
                <p className="font-light">Pris 90 DKK</p>
              </div>
              <div className="justify-self-end">
                <Stepper />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-5">
              <h4 className="font-semibold">Total: {getTotalPrice()} DKK</h4>{/* Viser den samlede pris */}

              <ButtonSecondary />
            </div>
            </section>
    </article> 
    );
}
 
export default Price;


