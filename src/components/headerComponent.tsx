import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
import { formatAddress } from "../utils/helpers";
import { IoChevronBackOutline } from "react-icons/io5";
import { LogoIcon } from "./icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { goBack } from "../store/slices/stepSlice";

export function HeaderComponent({showBackButton}: {showBackButton:boolean}) {
  const navigate = useNavigate();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const stepToGoBackTo = useAppSelector(state => state.step.backStack);
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    open();
  };

  const backButton = () => {
    if(stepToGoBackTo.length == 0) {
      navigate("/")
    } else {
      dispatch(goBack());
    }
  }


  return (
    <div className="px-2 md:px-[200px]">
      <div className="flex justify-between text-white h-[100px] items-center">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => {navigate("/")}}
        >
          {/* <img src="/Sonik_Drop.png" className="w-[40px] h-[40px]" />  */}
          <LogoIcon />
          SonikDrop
        </div>
        <div className="w3m">
          <button
            className="border-[2px] px-4 py-1 rounded-md border-[#FFFFFF17]"
            onClick={handleButtonClick}
          >
            {isConnected ? formatAddress(address ?? "") : "Connect Wallet"}
          </button>
        </div>
      </div>
      {
        showBackButton && (
          <div className="mt-4">
        <button className="flex items-center gap-4" onClick={backButton}>
          <IoChevronBackOutline /> Back
        </button>
      </div>
        )
      }
      
    </div>
  );
}
