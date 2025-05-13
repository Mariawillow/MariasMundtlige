import Image from "next/image";
import Header from "@/components/Header";
import StatuePic from "@/images/statuePic.svg";
import { FaTicketAlt } from "react-icons/fa";
import Stepper from "@/components/Stepper";
import ButtonSecondary from "@/components/ButtonSecondary";

const Basket = () => {
  return (
    <div>
      <Header variant="black"></Header>
      <section className="grid grid-cols-2 gap-4">
        <div>
          <Image src={StatuePic} alt="statuebillede" width={300} height={200} className="w-full h-full object-cover" />
        </div>

        <div>
          <div className="text-center">
            <h1 className="font-semibold">Eventbilletter</h1>
            <p className="font-light">Du modtager eventbilletten med det samme efter bestilling på din e-mail (Modtager du ikke en mail indenfor for 5 minutter, så tjek dit SPAM-filter) Børn under 18 år kommer gratis ind til events.</p>
          </div>

          <div class=" w-100 h-1 bg-[#C4FF00] mx-auto mt-10 mb-10"></div>

          <div className="flex items-center">
            <FaTicketAlt className="text-[#C4FF00] scale-x-[3] scale-y-[3] m-5" />
            <h2 className="font-light">Billetter</h2>
          </div>

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

            <h4 className="font-semibold mt-10">Den Gyldne Dag</h4>
            <div className="grid grid-cols-2">
              <div>
                <p className="font-semibold">Voksen</p>
                <p className="font-light">Pris 170 DKK</p>
              </div>
              <div className="justify-self-end">
                <Stepper />
              </div>
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
              <h4 className="font-semibold">Total: 549 DKK</h4>
              <ButtonSecondary />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Basket;
