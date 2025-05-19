import { getLocations } from "@/api/localhost";
import MakeEventStepOneClient from "./MakeEventStepOne";

export default async function MakeEventStepOneWrapper() {
  const locations = await getLocations();

  return <MakeEventStepOneClient locations={locations} />;
}
