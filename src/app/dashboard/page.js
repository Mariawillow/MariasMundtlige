import DashCard from "@/components/(dashboard)/DashCard";
import Header from "@/components/(header)/Header";


const Dashboard = () => {
    return ( 
        <article>
                  <Header variant="black"></Header>

            <h1>Dine oprettede events</h1>
            <DashCard />
        </article>
     );
}
 
export default Dashboard;