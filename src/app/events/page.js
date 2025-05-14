import ListeCardClient from "@/components/(events)/ListeCardClient";
import Header from "@/components/Header";
import { getEvents } from "@/api/localhost";
import LocationDropdown from "@/components/(events)/DropdownLocation";
import SortingDropdown from "@/components/(events)/DropDownSorter";

const listeView = async () => {
  const eventsData = await getEvents();
  console.log(eventsData);

  return (
    <div>
      <Header />
      <div className="flex justify-end space-x-4">
        <LocationDropdown />
        <SortingDropdown />
      </div>

      <ListeCardClient events={eventsData} />
    </div>
  );
};

export default listeView;
