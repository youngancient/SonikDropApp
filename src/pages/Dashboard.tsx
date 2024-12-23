import { FooterComponent } from "../components/footerComponent";
import { HeaderComponent } from "../components/headerComponent";

const Dashboard = () => {
  return (
    <div
      style={{ backgroundColor: "#050C19" }}
      className="h-screen overflow-auto"
    >
      <HeaderComponent showBackButton={false} />
      <h1>Dashboard Here</h1>
      <FooterComponent />
    </div>
  );
};

export default Dashboard;
