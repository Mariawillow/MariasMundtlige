import Image from "next/image";
import Header from "@/components/Header";
import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import Kurv from "@/components/Basket";
import Popup from "@/components/Popup";
import { SignIn } from "@clerk/nextjs";

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

      {/* <ButtonPrimary variant="primary">Primær</ButtonPrimary>
      <ButtonPrimary variant="secondary">Sekundær</ButtonPrimary>
      <ButtonPrimary variant="danger">Slet</ButtonPrimary>
      <ButtonPrimary variant="ukendt">Fallback</ButtonPrimary> */}

      <ButtonPrimary size="large">Button</ButtonPrimary>
      <ButtonPrimary size="small">Button</ButtonPrimary>

      <ButtonSecondary></ButtonSecondary>

      <Popup></Popup>
    </div>
  );
}
