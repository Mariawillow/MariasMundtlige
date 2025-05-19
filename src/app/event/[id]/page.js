import Header from "@/components/Header";
import SingleCard from "@/components/(event)/SingleCard";
import EventArtClient from "@/components/(event)/EventArtClient";
import { getArtDetails } from "@/api/smk";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Link from 'next/link';


const EventSingleView = async ({ params }) => {
  //Denne første del burde vi overveje at flytte til API-side (localhost.js) – meeeen vi kan ikke lige finde ud af hvordan
  const { id } = params;

  const res = await fetch(`http://localhost:8080/events/${id}`);
  const eventData = await res.json();

  // Hent kunstværkerne fra SMK API (eller specifikke værker baseret på IDs)
  const artworkIds = eventData.artworkIds || [];

  // Hent kun de værker, der matcher de ønskede artworkIds
  const artFetches = artworkIds.map((id) => getArtDetails(id));
  const arts = await Promise.all(artFetches); //Promise.all kører alle API-kald parallelt og returnerer, når alle er færdige.

  return (
    <div className="flex flex-col gap-6">
      <Header variant="black"></Header>

      
     {/* Tilbage-knap */}
     <div className="inline-block text-center mb-[var(--space-m)]">
  <Link href="/events" className="inline-block text-[#C4FF00] font-semibold">
    Tilbage
    <div className="relative h-6 mt-1">
      <HiOutlineArrowLongLeft className="text-[#C4FF00] absolute left-0 top-0 w-full scale-x-100 scale-y-200" />
    </div>
  </Link>
</div>

      <SingleCard eventData={eventData}></SingleCard>


      <section>
        <h3 className="font-ligth">Oplev disse værker til eventet</h3>
        <div>
          {/* Send de hentede kunstværker til EventArtClient */}
          <EventArtClient artworkIds={artworkIds} arts={arts} />
        </div>
      </section>
    </div>
  );
};

export default EventSingleView;
