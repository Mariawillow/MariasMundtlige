"use server";

import { getLocations } from "@/api/localhost";
import LocationSelector from "./LocationSelector";

export default async function MakeEventStepOneWrapper() {
  const locations = await getLocations();

  return <LocationSelector locations={locations} />;
}
