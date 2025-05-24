// import Image from "next/image";
// import StatuePic from "@/images/statuePic.svg";
// import Link from "next/link";
// import { FaPen } from "react-icons/fa";

// const DashCard = () => {
//   return (
//     <Link href={`/`} className="relative aspect-[3/2] group w-full cursor-pointer">
//       <Image src={StatuePic} alt="statuebillede" width={300} height={200} className="w-full h-full object-cover transition duration-300 group-hover:bg-[#DAD6DD] group-hover:opacity-40 group-hover:border-[3px] group-hover:border-[#C4FF00]" />
//       <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300"></div>
//       <div className="flex justify-between items-center">
//         <h4 className="text-black font-semibold">Title</h4>
//         <FaPen size={25} />
//       </div>
//       <p className="text-black font-semibold">Dato</p>
//     </Link>
//   );
// };

// export default DashCard;

// import Image from "next/image";
// import StatuePic from "@/images/statuePic.svg";
// import Link from "next/link";
// import { FaPen } from "react-icons/fa";
// import { FaTrashCan } from "react-icons/fa6";


// const DashCard = ({ event }) => {
//   return (
//     <Link href={`/events/${event.id}`} className="relative aspect-[3/2] group w-full cursor-pointer">
//       <Image
//         src={StatuePic}
//         alt="statuebillede"
//         width={300}
//         height={200}
//         className="w-full h-full object-cover transition duration-300 group-hover:bg-[#DAD6DD] group-hover:opacity-40 group-hover:border-[3px] group-hover:border-[#C4FF00]"
//       />
//       <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300"></div>
//       <div className="flex justify-between items-center mt-2">
//         <h4 className="text-black font-semibold">{event.title}</h4>
//         <div className="flex gap-8"> <FaTrashCan size={20} />
//           <FaPen size={20} />
//         </div>
//       </div>
//       <p className="text-black font-medium">{event.date}</p>
//     </Link>
//   );
// };

// export default DashCard;


import Image from "next/image";
import StatuePic from "@/images/statuePic.svg";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { deleteEvent } from "@/api/localhost"; // husk denne import
import { format, parseISO } from "date-fns";
import { da } from "date-fns/locale";

const DashCard = ({ event }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm("Er du sikker på, at du vil slette dette event?");
    if (!confirmed) return;

    try {
      await deleteEvent(event.id);
      window.location.reload(); // eller fjern fra UI med state
    } catch (error) {
      console.error("Sletning fejlede:", error);
      alert("Noget gik galt under sletning.");
    }
  };

  return (
    <div className="relative aspect-[3/2] group w-full cursor-pointer">
      {/* Kun billedet er klikbart */}
      <Link href={`/event/${event.id}`}>
        <Image
          src={StatuePic}
          alt="statuebillede"
          width={300}
          height={200}
          className="w-full h-full object-cover transition duration-300 group-hover:opacity-40"
        />
      </Link>

      {/* Hover-overlay må IKKE fange klik */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300"></div>

      {/* Indhold der må fange klik */}
      <div className="mt-4 px-2 space-y-1">
        <div className="flex justify-between items-center">
          <h4 className="text-black font-semibold break-words hyphens-auto">
            {event.title}
          </h4>
          <div className="flex gap-4">
            <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
              <FaTrashCan size={20} />
            </button>
            <Link href={`/editEvent/${event.id}`} className="text-black hover:text-lime-500">
              <FaPen size={20} />
            </Link>
          </div>
        </div>
        <p className="text-black font-medium">
          {format(parseISO(event.date), "d. MMMM yyyy", { locale: da })}
        </p>
      </div>
    </div>
  );
};

export default DashCard;



