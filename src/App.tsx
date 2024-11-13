import "./App.css";
import "./connection.ts";
import { HeaderComponent } from "./components/headerComponent.tsx";

import { Hero } from "./components/heroComponent.tsx";

function App() {
  // const { selectedNetworkId } = useAppKitState();

  return (
    <>
      <HeaderComponent showBackButton={false} />
      <Hero />
      
    </>
  );
}

export default App;

