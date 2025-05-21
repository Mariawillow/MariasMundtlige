import Image from "next/image";
import Header from "@/components/Header";
import ButtonPrimary from "@/components/ButtonPrimary";
import StatuePic from "@/images/statuePic.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="col-start-2 h-[800px] bg-[url(/images/statuePic.jpg)]  bg-cover bg-no-repeat bg-center relative">
      <Header />

      <h1 className="text-[#C4FF00] leading-relaxed font-light">
        Oplev Storartet Kunst <br /> På Feler Måder
      </h1>

      <Link href="/events">
        <ButtonPrimary size="small" className="absolute bottom-4 right-4">
          Events
        </ButtonPrimary>
      </Link>
    </div>
  );
}
