import ButtonSecondary from "@/components/ButtonSecondary";
import EventArt from "@/components/(eventSingleView)/EventArt.jsx";
import Stepper from "@/components/Stepper";

const EventSingleView = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Top: Titel og Dato */}
      <div>
        <h1 className=" font-semibold">Abstrakt Aften</h1>
        <h3 className="font-light  ml-60">Dato for eventet</h3>
      </div>

      {/* Nederste sektion i to kolonner */}
      <div className="grid grid-cols-2 gap-8">
        {/* Om Eventet */}
        <section className="flex flex-col gap-4">
          <div>
            <h4 className="font-semibold">Om Eventet</h4>
            <p className="font-light">Loreem wejfbknefnf n f f efn ekjfkejwnfknke kjenf fkjernfj k jrgj kjrg</p>
            <p className="font-light">ahhd habfewbifw</p>
          </div>
          <div>
            <h4 className="font-semibold">Lokation</h4>
            <p>Lokation og adresse for event</p>
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

      <section>
        <h3 className="font-ligth">Oplev disse værker til eventet</h3>
        <div className="grid grid-cols-3 gap-4 ">
          <EventArt />
          <EventArt />
          <EventArt />
          <EventArt />
          <EventArt />
          <EventArt />
          <EventArt />
          <EventArt />
        </div>
      </section>
    </div>
  );
};

export default EventSingleView;
