//Samler ALT på siden
"use client";

import { useState } from "react";
import EventFilters from "@/components/(newEvent)/EventFilters";
import ArtworkSelection from "./ArtWorkSelection";
import { format } from "date-fns";

export default function MakeNewEvent() {
  //Dato og location gemmes i useState
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState(null);

  const isReady = date && location;
  const formattedDate = date ? format(date, "yyyy-MM-dd") : null;

  return (
    <section>
      <EventFilters date={date} setData={setDate} location={location} setLocation={setLocation} /> {/* Vi sender dato og location med videre til komponentet */}
      {/* Her kommer resten senere */}
      {/* {isReady && <ArtworkSelection />} */}
      <ArtworkSelection date={formattedDate} location={location} />
    </section>
    // <NavigationMenu>
    //   <NavigationMenuList>
    //     {/* Lokation drop-down */}
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger>{selectedLocation?.address || "vælg lokation"}</NavigationMenuTrigger>
    //       <NavigationMenuContent>
    //         <MakeEventLocationClient locations={locations} onSelectedLocation={handleLocationSelect} selectedLocation={selectedLocation}></MakeEventLocationClient>
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>

    //     {/* Dato drop-drown */}
    //     <NavigationMenuItem>
    //       <DatePicker date={date} setDate={setDate}></DatePicker>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>
  );
}
