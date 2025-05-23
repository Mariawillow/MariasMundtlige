// import DashCard from "@/components/(dashboard)/DashCard";
// import Header from "@/components/(header)/Header";

// const Dashboard = () => {
//     return (
//         <article>
//                   <Header variant="black"></Header>

//             <h1>Dine oprettede events</h1>
//             <DashCard />
//         </article>
//      );
// }

// export default Dashboard;

"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getEvents } from "@/api/localhost";
import DashCard from "@/components/(dashboard)/DashCard";
import Header from "@/components/(header)/Header";

const Dashboard = () => {
  const { user } = useUser();
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    getEvents().then((data) => {
      const filtered = data.filter((event) => event.userId === user.id);
      setUserEvents(filtered);
    });
  }, [user]);

  return (
    <article>
      <Header variant="black" />
      <h1 className="mb-6">Dine oprettede events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userEvents.map((event) => (
          <DashCard key={event.id} event={event} />
        ))}
      </div>
    </article>
  );
};

export default Dashboard;
