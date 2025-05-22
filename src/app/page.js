import Image from "next/image";
import Header from "@/components/(header)/Header";
import ButtonPrimary from "@/components/ButtonPrimary";
import statuePic from "@/images/statuePic.svg"; // Importer billedet som modul
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[url('/images/statuePic.svg')] bg-cover bg-no-repeat">
      <Image src={statuePic} alt="Statue" layout="fill" objectFit="cover" className="scale-x-[-1]" />
      <div className="col-start-2 bg-cover bg-no-repeat bg-center relative">
        <Header className="relative z-10" />

        <h1 className="text-[#C4FF00] leading-relaxed font-light mt-space-2xl">
          Oplev Storartet Kunst <br /> På Flere Måder
        </h1>

        <ButtonPrimary href="/events" size="large">
          Se events
        </ButtonPrimary>

        <ButtonPrimary href="/events" size="small">
          Se events
        </ButtonPrimary>
      </div>
    </div>
  );
}
