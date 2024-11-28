import "./App.css";
import "./connection.ts";
import { HeaderComponent } from "./components/headerComponent.tsx";
import { Hero } from "./components/heroComponent.tsx";
import { BNB, ETH , Optimism, Solana, Arbitrum, Polygon, Base, Lisk} from "./components/icons.tsx";
import { ToastContainer } from "react-toastify";

function App() {
  // const { selectedNetworkId } = useAppKitState();

  return (
    <>
      <HeaderComponent showBackButton={false} />
      <Hero />
      <ToastContainer />
      <BNB />
      <ETH />
      <Optimism />
      <Solana />
      <Arbitrum />
      <Polygon />
      <Base />
      <Lisk />
    </>
  );
}

export default App;

