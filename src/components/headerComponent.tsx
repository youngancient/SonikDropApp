import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
import { formatAddress } from "../utils/helpers";

export function HeaderComponent() {
  const navigate = useNavigate();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const handleButtonClick = () => {
    open();
  };


  return (
    <div className="flex justify-between text-white h-[100px] items-center px-2 md:px-[200px]">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/Sonik_Drop.png" className="w-[40px] h-[40px]" /> SonikDrop
      </div>
      <div className="w3m">
        <button
          className="border-[2px] px-4 py-1 rounded-md border-[#FFFFFF17]"
          onClick={handleButtonClick}
        >
          {isConnected ? address && formatAddress(address) : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
}
