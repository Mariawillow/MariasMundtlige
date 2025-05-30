import Header from "@/components/(header)/Header";
import SingleCard from "@/components/(event)/SingleCard";
import EventArtClient from "@/components/(event)/EventArtClient";
import ButtonBack from "@/components/ButtonBack";
import Link from "next/link";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { getArtDetails } from "@/api/smk";

const EventSingleView = async ({ params }) => {
  //Denne første del burde vi overveje at flytte til API-side (localhost.js) – meeeen vi kan ikke lige finde ud af hvordan
  const { id } = await params;

  const res = await fetch(`http://localhost:8080/events/${id} `); //https://smk-4l23.onrender.com/events/${id}
  const eventData = await res.json();

  // Hent kunstværkerne fra SMK API (eller specifikke værker baseret på IDs)
  const artworkIds = eventData.artworkIds || [];

  // Hent kun de værker, der matcher de ønskede artworkIds
  const artFetches = artworkIds.map((id) => getArtDetails(id));
  const arts = await Promise.all(artFetches); //Promise.all kører alle API-kald parallelt og returnerer, når alle er færdige.

  return (
    <div className="flex flex-col gap-6">
      <Header></Header>

      <ButtonBack>Tilbage</ButtonBack>

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
