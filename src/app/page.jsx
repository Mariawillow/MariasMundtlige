import Image from "next/image";
import Header from "@/components/Header";
import ButtonPrimary from "@/components/ButtonPrimary";
import DashCard from "@/components/(dashboard)/DashCard"
import EventCrad from "@/components¨/(evventside)/EventCrad";
import EventetsVaerker from "@/components/(eventside)/EventetsVaerker";
import DropdownLokation from "@/components/(listeview)/DropdownLokation";
import DropdownSorter from "@/components/(listeview)/DropdownSorter";
import ListeCard from "@/components/(listeview)/ListeCard";
import VaerkSide from "@/components¨/(vaerkside)/VaerkSide";
import ButtonSecondary from "@/components¨/ButtonSecondary";
import Kurv from "@/components/Kurv";
import Popup from "@/components/Popup";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="col-start-2">
      <Header></Header>
      <h1>Dav</h1>
      <h2>Dav</h2>
      <h3 className="mt-space-m">Dav</h3>
      <h4>Dav</h4>
      <h5>Dav</h5>
      <p>Dav</p>
      <ButtonPrimary variant="primary">Primær</ButtonPrimary>
      <ButtonPrimary variant="secondary">Sekundær</ButtonPrimary>
      <ButtonPrimary variant="danger">Slet</ButtonPrimary>
      <ButtonPrimary variant="ukendt">Fallback</ButtonPrimary>
      <DashCard></DashCard>
      <EventCrad></EventCrad>
      <EventetsVaerker></EventetsVaerker>
      <DropdownLokation></DropdownLokation>
      <DropdownSorter></DropdownSorter>
      <ListeCard></ListeCard>
      <VaerkSide></VaerkSide>
      <ButtonSecondary></ButtonSecondary>
      <Kurv></Kurv>
      <Popup></Popup>
      <Footer></Footer>
    </div>
  );
}
