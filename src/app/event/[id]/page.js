import Header from "@/components/Header";
import EventArt from "@/components/(event)/EventArt.jsx";
import SingleCard from "@/components/(event)/SingleCard";

const EventSingleView = async ({ eventData }) => {
  return (
    <div className="flex flex-col gap-6">
      <Header variant="black"></Header>

      <SingleCard></SingleCard>

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
