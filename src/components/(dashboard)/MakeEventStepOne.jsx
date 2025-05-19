"use client";

import { useState } from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { DatePicker } from "@/components/(dashboard)/DatePicker";
import MakeEventLocationClient from "./MakeEventLocationClient";

export default function MakeEventStepOne() {
  const [date, setDate] = useState();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Dato drop-down */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Vælg lokation</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MakeEventLocationClient></MakeEventLocationClient>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Lokation drop-drown */}
        <NavigationMenuItem>
          <DatePicker date={date} setDate={setDate}></DatePicker>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuIndicator />
      <NavigationMenuViewport />
    </NavigationMenu>
  );
}
