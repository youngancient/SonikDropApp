import "./App.css";
import "./connection.ts";
import { HeaderComponent } from "./components/headerComponent.tsx";
import { Hero } from "./components/heroComponent.tsx";
import { BNB, ETH , Optimism, Kaia, Polygon, Base, Sonic, Morph} from "./components/icons.tsx";
import { ChainHrefs } from "./constants/chainHrefs.ts";

function App() {
  // const { selectedNetworkId } = useAppKitState();

  return (
    <>
      <HeaderComponent />
      <Hero />
      <BNB href={ChainHrefs.Binance} />
      <ETH href={ChainHrefs.Ethereum} />
      <Optimism href={ChainHrefs.Optimism} />
      <Kaia href={ChainHrefs.Kaia} />
      <Morph href={ChainHrefs.Morph} />
      <Polygon href={ChainHrefs.Polygon} />
      <Base href={ChainHrefs.Base} />
      <Sonic href={ChainHrefs.Sonic} />
    </>
  );
}

export default App;

