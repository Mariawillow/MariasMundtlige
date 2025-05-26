import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { da } from "date-fns/locale";

import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import StatuePic from "@/images/statuePic.svg";
import { deleteEvent } from "@/api/localhost";

const DashCard = ({ event }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm("Er du sikker på, at du vil slette dette event?");
    if (!confirmed) return;

    try {
      await deleteEvent(event.id);
      window.location.reload(); // alternativ: brug state til at fjerne elementet
    } catch (error) {
      console.error("Sletning fejlede:", error);
      alert("Noget gik galt under sletning.");
    }
  };

  const imageUrl = event.thumbnailImage || StatuePic;

  return (
    <div className="relative aspect-[3/2] group w-full cursor-pointer">
      {/* Billedlink til event */}
      <Link href={`/event/${event.id}`}>
        <Image src={imageUrl} alt={`Eventbillede: ${event.title}`} width={300} height={200} className="w-full h-full object-cover transition duration-300 group-hover:opacity-40" />
      </Link>

      {/* Tom hover-overlay der ikke fanger klik */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* Indhold under billedet */}
      <div className="mt-4 px-2 space-y-1">
        <div className="flex justify-between items-center">
          <h4 className="text-black font-semibold break-words hyphens-auto">{event.title}</h4>

          <div className="flex gap-4">
            <button onClick={handleDelete} className="text-red-600 hover:text-red-800" aria-label="Slet event">
              <FaTrashCan size={20} />
            </button>
            <Link href={`/editEvent/${event.id}`} className="text-black hover:text-[#C4FF00]" aria-label="Rediger event">
              <FaPen size={20} />
            </Link>
          </div>
        </div>

        <p className="text-black font-medium">{format(parseISO(event.date), "d. MMMM yyyy", { locale: da })}</p>
      </div>
    </div>
  );
};

export default DashCard;
