import Image from "next/image";
import StatuePic from "@/images/statuePic.svg";
import Link from "next/link";

const ListeCardNy = ({ event }) => {

  //minusser totalToickes fra bookedTickets - bruges til bagde så man kn se om man ska skynde sig. 
  const remainingTickets = event.totalTickets - event.bookedTickets;


  return (
    <Link href={`/event/${event.id}`} className="group w-full cursor-pointer">
      <div className="relative aspect-[3/2]">
        <Image
          src={StatuePic}
          alt="statuebillede"
          width={300}
          height={200}
          className="w-full h-full object-cover transition duration-300 group-hover:bg-[#DAD6DD] group-hover:opacity-40 group-hover:border-[3px] group-hover:border-[#C4FF00]"
        />

 {/* BADGE: Vis kun hvis < 10 billetter */}
 {remainingTickets < 10 && (
          <div className="absolute top-2 right-2 bg-gray-50 text-black text-xs font-bold px-2 py-1 z-10">
            Få billetter tilbage
          </div>
        )}

        {/* Overlay text (hidden on small screens) */}
        <div className="hidden sm:flex absolute inset-0 flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300">
          <h4 className="text-black font-semibold">{event.title}</h4>
          <h3 className="text-black font-light">459 DKK</h3>
          <p className="text-black font-semibold">{event.date}</p>
        </div>
      </div>

      {/* Text below image (visible only on small screens) */}
      <div className="sm:hidden mt-2 text-center">
        <h4 className="text-black font-semibold">{event.title}</h4>
        <h3 className="text-black font-light">459 DKK</h3>
        <p className="text-black font-semibold">{event.date}</p>
      </div>
    </Link>
  );
};

export default ListeCardNy;
