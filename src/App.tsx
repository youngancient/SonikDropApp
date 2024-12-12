import "./App.css";
import "./connection.ts";
import { HeaderComponent } from "./components/headerComponent.tsx";
import { Hero } from "./components/heroComponent.tsx";
import { BNB, ETH , Optimism, Kaia, Arbitrum, Polygon, Base, Lisk} from "./components/icons.tsx";

function App() {
  // const { selectedNetworkId } = useAppKitState();

  return (
    <>
      <HeaderComponent showBackButton={false} />
      <Hero />
      <BNB />
      <ETH />
      <Optimism />
      <Kaia />
      <Arbitrum />
      <Polygon />
      <Base />
      <Lisk />
    </>
  );
}

export default App;

