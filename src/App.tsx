import "./App.css";
import "./connection.ts";
import { HeaderComponent } from "./components/headerComponent.tsx";
// import { Link } from "react-router-dom";
// import { useAppKitState } from "@reown/appkit/react";
// import { supportedNetworksDetails } from "./constants/chains.ts";
// import { extractChainId } from "./utils/helpers.ts";
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

{/* <div className="flex justify-center flex-col items-center gap-4">
        <h1>SonikDrop</h1>
        <div className="card" >
          <Link to="/prepare" className="border-2 border-white/[0.2] px-4 py-1 rounded-lg">Prepare</Link>
        </div>
        <p className=" text-[25px]">
          You're on network:{" "}
          {selectedNetworkId
            ? supportedNetworksDetails[
                parseInt(extractChainId(selectedNetworkId))
              ]
            : "Unknown"}
        </p>
      </div> */}