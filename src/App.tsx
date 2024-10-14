import "./App.css";
import "./connection.ts";
import { HeaderComponent } from "./components/headerComponent.tsx";
import { Link } from "react-router-dom";
import { useAppKitState } from "@reown/appkit/react";
import { supportedNetworksDetails } from "./constants/chains.ts";
import { extractChainId } from "./utils/helpers.ts";

function App() {
  const { selectedNetworkId } = useAppKitState();

  return (
    <>
      <HeaderComponent />
      <h1>SonikDrop</h1>
      <div className="card">
        <Link to="/prepare">Prepare</Link>
      </div>
      <p className="">
        You're on network:{" "}
        {selectedNetworkId
          ? supportedNetworksDetails[
              parseInt(extractChainId(selectedNetworkId))
            ]
          : "Unknown"}
      </p>
    </>
  );
}

export default App;
