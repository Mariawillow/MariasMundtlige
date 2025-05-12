import Image from "next/image";
import StatuePic from "@/images/statuePic.svg"
import { HiOutlineArrowLongLeft } from "react-icons/hi2";


const artSingleView = () => {
    return ( <div>
        
        <div className="inline-block text-center">
  <p className="text-[#C4FF00] font-semibold inline-block">Tilbage</p>
  <div className="relative h-6 mt-1">
    <HiOutlineArrowLongLeft 
      className="text-[#C4FF00] absolute left-0 top-0 w-full scale-x-[1.0] scale-y-[2]" 
    />
  </div>
</div>

        <section className="grid grid-cols-2 gap-4">
        <div className="w-[300px] h-[200px]">

        <Image
      src={StatuePic}
      alt="statuebillede"
      width={300}
      height={200}
      className="w-full h-full object-cover"
    />
        </div>
    <div>
        <h1 className="font-semibold">Augustus og den tiburtinske sibylle</h1>
        <h3 className="font-light">1500 - 1550</h3>
        <p className="font-light">Værket er fremstillet med teknikken clairobscur-træsnit trykt med to stokke, og hører til Den Kongelige Kobbersamlinf</p>
        <h4 className="font-semibold">Kunstner</h4>
        <p className="font-light">Antonio da Trento, 1503 - 1540, italiensk</p>
    </div>

    </section>



    </div> );
}
 
export default artSingleView;