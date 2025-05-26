import Header from "@/components/(header)/Header";
import MakeNewEvent from "@/components/(newEvent)/MakeNewEvent";

export default function newEvent() {
  return (
    <div>
      <Header />
      <h1 className="text-center">Opret Event</h1>
      <MakeNewEvent />
    </div>
  );
}
