import Image from "next/image";
import Header from "@/components/Header";
import StatuePic from "@/images/statuePic.svg";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const artSingleView = () => {
  return (
    <div className="relative px-[var(--space-s)] py-[var(--space-l)] overflow-hidden">
      <Header variant="black"></Header>
      {/* Tilbage-knap */}
      <div className="inline-block text-center mb-[var(--space-m)]">
        <p className="text-[#C4FF00] font-semibold inline-block">Tilbage</p>
        <div className="relative h-6 mt-1">
          <HiOutlineArrowLongLeft className="text-[#C4FF00] absolute left-0 top-0 w-full scale-x-100 scale-y-200" />
        </div>
      </div>

      {/* Grid-indhold – responsive kolonner */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-l)] relative z-10">
        {/* VENSTRE: billede + farvekasser */}
        <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
          {/* Grøn firkant oppe til venstre */}
          <div className="absolute w-1/3 h-1/3 -left-[10%] -top-[10%] bg-[#b6b442] -z-10" />
          {/* Brun firkant nede til højre */}
          <div className="absolute w-1/2 h-1/2 left-3/5 -bottom-[15%] bg-[#8b6b3a] -z-10" />

          {/* Billedet */}
          <Image src={StatuePic} alt="statuebillede" fill className="object-cover" />
        </div>

        {/* HØJRE: tekst */}
        <div className="relative z-10">
          <h1 className="font-semibold text-[var(--step-4)]">Augustus og den tiburtinske sibylle</h1>
          <h3 className="font-light text-[var(--step-2)]">1500 - 1550</h3>
          <p className="font-light mt-space-s">Værket er fremstillet med teknikken clairobscur-træsnit trykt med to stokke, og hører til Den Kongelige Kobbersamling.</p>
          <h4 className="font-semibold mt-space-m">Kunstner</h4>
          <p className="font-light">Antonio da Trento, 1503 - 1540, italiensk</p>
        </div>
      </section>
    </div>
  );
};

export default artSingleView;
