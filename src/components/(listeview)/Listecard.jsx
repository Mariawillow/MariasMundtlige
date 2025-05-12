import Image from "next/image";
import StatuePic from "@/images/statuePic.svg"

const ListeCard = () => {
  return <div className="grid grid-cols-3 col-span-2  ">
  <div className="w-[300px] h-[200px] relative group">
    <Image
      src={StatuePic}
      alt="statuebillede"
      width={300}
      height={200}
      className="w-full h-full object-cover transition duration-300 group-hover:bg-[#DAD6DD] group-hover:opacity-40 group-hover:border group-hover:border-[#C4FF00]"
    />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300">
      <h4 className="text-black font-semibold">Abstrakt Aften</h4>
      <h3 className="text-black font-light">459 DKK</h3>
      <p className="text-black font-semibold">17/02/25</p>
    </div>
  </div>
  
  <div className="w-[300px] h-[200px] relative group">
    <Image
      src={StatuePic}
      alt="statuebillede"
      width={300}
      height={200}
      className="w-full h-full object-cover transition duration-300 group-hover:bg-[#DAD6DD] group-hover:opacity-40 group-hover:border group-hover:border-[#C4FF00]"
    />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300">
    <h4 className="text-black font-semibold">Abstrakt Aften</h4>
      <h3 className="text-black font-light">459 DKK</h3>
      <p className="text-black font-semibold">17/02/25</p>
    </div>
  </div>

  <div className="w-[300px] h-[200px] relative group">
    <Image
      src={StatuePic}
      alt="statuebillede"
      width={300}
      height={200}
      className="w-full h-full object-cover transition duration-300 group-hover:bg-[#DAD6DD] group-hover:opacity-40 group-hover:border group-hover:border-[#C4FF00]"
    />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300">
    <h4 className="text-black font-semibold">Abstrakt Aften</h4>
      <h3 className="text-black font-light">459 DKK</h3>
      <p className="text-black font-semibold">17/02/25</p>
    </div>
  </div>
          </div>;
};

export default ListeCard;
