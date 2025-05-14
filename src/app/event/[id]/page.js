import Header from "@/components/Header";
import EventArt from "@/components/(event)/EventArt.jsx";
import SingleCard from "@/components/(event)/SingleCard";

const EventSingleView = async ({ params }) => {
  //Denne første del burde vi overveje at flytte til API-side (localhost.js) – meeeen vi kan ikke lige finde ud af hvordan
  const { id } = params;

  const res = await fetch(`http://localhost:8080/events/${id}`);
  const eventData = await res.json();

  return (
    <div className="flex flex-col gap-6">
      <Header variant="black"></Header>

      <SingleCard eventData={eventData}></SingleCard>

      <section>
        <h3 className="font-ligth">Oplev disse værker til eventet</h3>
        <div className="grid grid-cols-3 gap-4 ">
          {/* <EventArt artworkIds={event.artworkIds} /> */}
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
