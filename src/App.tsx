import "./App.css";
import "./connection.ts";
import { HeaderComponent } from "./components/headerComponent.tsx";

import { Hero } from "./components/heroComponent.tsx";
import { BNB, ETH , Optimism, Solana, Arbitrum, Polygon} from "./components/icons.tsx";

function App() {
  // const { selectedNetworkId } = useAppKitState();

  return (
    <>
      <HeaderComponent showBackButton={false} />
      <Hero />
      <BNB />
      <ETH />
      <Optimism />
      <Solana />
      <Arbitrum />
      <Polygon />
    </>
  );
}

export default App;

