// import ListeCardClient from "@/components/(listeView)/ListeCard";
import ListeCardClient from "@/components/(listeView)/ListeCardClient";
import Header from "@/components/Header";
import { getEvents } from "@/api/localhost";

const listeView = async () => {
  const eventsData = await getEvents ();
  console.log(eventsData);

  return (
    <div>
      <Header />
      <p>Lokation </p>
      <p>Sorter Efter </p>

      <ListeCardClient events={eventsData} />
    </div>
  );
};

export default listeView;
