import Image from "next/image";
// import Header from "@/components/Header";
// import ButtonPrimary from "@/components/ButtonPrimary";
// import DashCard from "@/components/(dashboard)/DashCard";
// import EventArt from "@/components/(eventSingleView)/EventArt";
// import DropdownLocation from "@/components/(listeView)/DropdownLocation";
// import DropdownSorter from "@/components/(listeView)/DropdownSorter";
// import ListeCard from "@/components/(listeView)/ListeCard";
// import ButtonSecondary from "@/components/ButtonSecondary";
// import Kurv from "@/components/Basket";
// import Popup from "@/components/Popup";
// import Footer from "@/components/Footer";
import { SignUp, SignIn, UserButton  } from "@clerk/nextjs";



export default function Home() {
  return (
    <div className="col-start-2">
      <header className="flex justify-between"> 
      <h1>Clover corp</h1>
      <UserButton showName />
      </header>
      <h1>Dav</h1>
      <h2>Dav</h2>
      <h3 className="mt-space-m">Dav</h3>
      <h4>Dav</h4>
      <h5>Dav</h5>
      <p>Dav</p>
       <SignIn />
      {/* <SignUp /> */}
{/* 

      <ButtonPrimary variant="primary">Primær</ButtonPrimary>
      <ButtonPrimary variant="secondary">Sekundær</ButtonPrimary>
      <ButtonPrimary variant="danger">Slet</ButtonPrimary>
      <ButtonPrimary variant="ukendt">Fallback</ButtonPrimary>
      <DashCard></DashCard>
      <EventArt></EventArt>
      <DropdownLocation></DropdownLocation>
      <DropdownSorter></DropdownSorter>
      <ListeCard></ListeCard>
      <ButtonSecondary></ButtonSecondary>
      <Kurv></Kurv>
      <Popup></Popup>
      <Footer></Footer> */}
    </div>
  );
}
