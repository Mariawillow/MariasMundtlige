import Image from "next/image";
import StatuePic from "@/images/statuePic.svg"


const EventArt = () => {
  return <div>
<div className="w-[300px] h-[200px] relative group">
    <Image
      src={StatuePic}
      alt="statuebillede"
      width={300}
      height={200}
      className="w-full h-full object-cover transition duration-300 group-hover:bg-[#DAD6DD] group-hover:opacity-40 group-hover:border group-hover:border-[#C4FF00]"
    />
   
  </div>
  </div>;
  
};

export default EventArt;
