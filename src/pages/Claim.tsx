import { FooterComponent } from "../components/footerComponent";
import { HeaderComponent } from "../components/headerComponent";

const ClaimPage = () => {
  return (
    <div
      style={{ backgroundColor: "#0F195B" }}
      className="h-screen overflow-auto"
    >
      <HeaderComponent showBackButton={false} />
      <h1>Claim page</h1>
      <FooterComponent />
    </div>
  );
};

export default ClaimPage;
