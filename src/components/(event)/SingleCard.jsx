import ButtonSecondary from "@/components/ButtonSecondary";
import Stepper from "@/components/Stepper";

const SingleCard = ({ eventData }) => {
  console.log("noget her", eventData);

  return (
    <section>
      {/* Top: Titel og Dato */}
      <div>
        <h1 className=" font-semibold">{eventData.id}</h1>
        <h3 className="font-light  ml-60">{}</h3>
      </div>
      {/* Nederste sektion i to kolonner */}
      <div className="grid grid-cols-2 gap-8">
        {/* Om Eventet */}
        <section className="flex flex-col gap-4">
          <div>
            <h4 className="font-semibold">Om Eventet</h4>
            <p className="font-light">{}</p>
            <p className="font-light">Eventet er arrangeret af kurator {}</p>
          </div>
          <div>
            <h4 className="font-semibold">Lokation</h4>
            <p>
              {}, {}
            </p>
          </div>
        </section>

        {/* Billetter */}
        <section className="flex flex-col gap-4">
          <h4 className="font-semibold">Billetter</h4>
          <div className="grid grid-cols-2">
            <div>
              <p className="font-light">Voksen</p>
              <p className="font-light">Pris 170 DKK</p>
            </div>
            <Stepper />
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="font-light">Studenter</p>
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
