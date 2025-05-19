import Header from "@/components/Header";
import MakeNewEvent from "@/components/(newEvent)/MakeNewEvent";

export default function newEvent() {
  // const NewEvent = () => {
  //   const [step, setStep] = useState(1); // denne indeholder vores "steps" på siden. Step 1 = vælg dato og lokation, step 2 = beskrivelse, værker, navn osv.

  return (
    <div>
      <Header />
      <h1 className="text-center">Opret Event</h1>
      <MakeNewEvent />
      {/* <MakeEventLocationServer /> */}
      {/* Knap */}
      {/* {date && selectedLocation && step === 1 && (
        <ButtonPrimary onClick={() => setStep(2)} className="mt-4 px-4 py-2 bg-lime-500 text-white rounded">
          Næste
        </ButtonPrimary>
      )} */}

      {/* Værkvalg */}
      {/* {step === 2 && (
        <section className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold">Vælg værker til eventet</h2>
          <p className="text-sm text-gray-600">(Her indsætter du en liste eller søgefelt til værker)</p>
        </section>
      )}*/}
    </div>
  );
}
