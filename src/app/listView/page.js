// import ListeCardClient from "@/components/(listeView)/ListeCard";
import ListeCardClient from "@/components/(listeView)/ListeCardClient";
import Header from "@/components/Header";
import { getEvents } from "@/api/localhost";
import LocationDropdown from "@/components/(listeView)/DropdownLocation";
import SortingDropdown from "@/components/(listeView)/DropDownSorter";

const listeView = async () => {
  const eventsData = await getEvents ();
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
