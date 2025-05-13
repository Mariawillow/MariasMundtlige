import ListeCard from "@/components/(listeView)/ListeCard";
import Header from "@/components/Header";
import { getEvents } from "@/api/localhost";

const listeView = async () => {
  const eventsData = await getEvents;
  console.log(eventsData);

  return (
    <div>
      <Header />
      <p>Lokation </p>
      <p>Sorter Efter </p>

      <ListeCard events={eventsData} />
    </div>
  );
};

export default listeView;
