import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
} from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
import { formatAddress } from "../utils/helpers";
import {
  IoChevronBackOutline,
  IoChevronDown,
  IoCheckmark,
} from "react-icons/io5";
import { DashboardIcon, LogoIcon } from "./icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { goBack } from "../store/slices/stepSlice";
import { goBack as gobackPoap } from "../store/slices/poapStepSlice";
import { useClearFormInput } from "../hooks/useClearForm";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import ClickOutsideWrapper from "./outsideClick";
import { IChains, supportedNetworks } from "../constants/chains";
import { BrowserProvider, Eip1193Provider } from "ethers";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useClearPoapFormInput } from "../hooks/useClearPoapForm";

export function HeaderComponent({
  showBackButton,
  formType
}: {
  showBackButton: boolean;
  formType: "poap" | "airdrop"
}) {
  const navigate = useNavigate();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const stepToGoBackTo = useAppSelector((state) => state.step.backStack);
  const poapStepToGoBackTo = useAppSelector((state) => state.poap.backStack);
  const dispatch = useAppDispatch();

  // test sign message
  const token = Cookies.get("token");
  const { walletProvider } = useAppKitProvider("eip155");

  const onSignMessage = useCallback(async () => {
    if (!address) {
      toast.error("Please connect wallet");
      return;
    }
    try {
      const provider = new BrowserProvider(walletProvider as Eip1193Provider);
      const signer = await provider.getSigner();

      const message = `Welcome to SonikDrop! Please sign this message to authenticate.
      Wallet: ${address}
      Nonce: ${Math.floor(Math.random() * 1000000)}
      Timestamp: ${new Date().toISOString()}
      Domain: sonikdrop.app
      This signature does not trigger any blockchain transaction or cost gas fees.
      `;

      const signature = await signer?.signMessage(message);
      await callBackend(signature, message, address);
    } catch (error) {
      console.error("Error signing message:", error);
      toast.error("Failed to sign the message");
    }
  }, [address, walletProvider]);

  const callBackend = async (
    signature: string,
    message: string,
    signerAddress: string
  ) => {
    setTimeout(() => {
      Cookies.set("token", "Some JWT token here");
      console.log(signature, signerAddress, message);
    }, 1200);
  };

  const handleButtonClick = () => {
    open();
  };

  const { clear } = useClearFormInput();

  const { clearPoap } = useClearPoapFormInput();

  const backButton = () => {

    if(formType == "airdrop") {
      if(stepToGoBackTo.length == 0) {
        clear();
      navigate("/");
      } else {
        dispatch(goBack());
      }
    } else if (formType == "poap") {
      if(poapStepToGoBackTo.length == 0) {
        clearPoap();
        navigate("/");
      } else {
        dispatch(gobackPoap());
      }
    }
  };

  // how do we prevent the sign message from being called after a reload of the browser?

  // Effect to handle sign message on connection
  useEffect(() => {
    console.log({isConnected, token});
    // added timeout to prevent immediate sign message
    const delayTimeout = setTimeout(() => {
      if (isConnected && !token) {
        onSignMessage();
      }
    }, 2000);

    // Cleanup timeout on component unmount or when dependencies change
    return () => {
      clearTimeout(delayTimeout);
    };
  }, [isConnected, onSignMessage, token]);

  useEffect(() => {
    if (!isConnected) {
      Cookies.remove("token");
    }
  }, [isConnected]);

  return (
    <div className="px-2 px-[20px] md:px-[100px] lg:px-[200px]">
      <div className="flex justify-between text-white h-[60px] md:h-[100px] items-center">
        <div
          className="flex gap-2 items-center cursor-pointer"
          tabIndex={0}
          role="button"
          onClick={() => {
            navigate("/");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate("/");
            }
          }}
        >
          <LogoIcon />
          <span className="hidden md:block">
            <p className="text-base font-bold">SonikDrop</p>
          </span>
        </div>
        <div className="w3m flex gap-2 items-center">
          <button
            type="button"
            className="px-4 py-1 h-[1.75rem] md:h-[2rem] rounded-md flex items-center justify-center bg-[rgba(255,255,255,0.08)] shadow-[0px_0px_0px_1px_rgba(225,228,234,0.20)] cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <DashboardIcon />
          </button>
          <SwitchChainComp />
          <button
            className="px-4 py-1 rounded-md bg-[#0096E6] text-white"
            onClick={handleButtonClick}
          >
            {isConnected ? (
              formatAddress(address ?? "")
            ) : (
              <>
                <span className="block md:hidden">Connect</span>
                <span className="hidden md:block">Connect Wallet</span>
              </>
            )}
          </button>
        </div>
      </div>
      {showBackButton && (
        <div className="mt-1 mb-2 md:mt-4">
          <button className="flex items-center gap-4" onClick={backButton}>
            <IoChevronBackOutline /> Back
          </button>
        </div>
      )}
    </div>
  );
}

export const SwitchChainComp = () => {
  const { chainId } = useAppKitNetwork();
  const { address } = useAppKitAccount();

  const { open } = useAppKit();
  const [showDropdown, setShowdropdown] = useState(false);
  const [selectedChain, setSelectedChain] = useState<IChains | null>(
    supportedNetworks.find((ele) => ele.id === Number(chainId)) ?? null
  );

  const setChain = useCallback(
    async (id: number, calledByUser?: boolean) => {
      const chain = supportedNetworks.find((ele) => ele.id === id);
      if (!chain) {
        return;
      }
      if (!address && calledByUser) {
        toast.error("Please connect wallet first!");
        return;
      }
      // Only proceed if the current network ID does not match the requested one
      if (id !== Number(chainId?.toString())) {
        open({ view: "Networks" }); // Open modal to prompt network change
        setShowdropdown(false);
      } else {
        setSelectedChain(chain); // Set the chain if there's no mismatch
      }
    },
    [address, chainId, open]
  );

  useEffect(() => {
    if (!chainId) {
      return;
    }
    setChain(Number(chainId.toString()));
  }, [chainId, setChain]);

  // const [chains, setChains] = useState<IChains>(supportedNetworks);

  return (
    <ClickOutsideWrapper onClickOutside={() => setShowdropdown(false)}>
      <SwitchChainCompStyles>
        <button
          className="px-4 py-1 rounded-md flex items-center gap-1 bg-[rgba(255,255,255,0.08)] shadow-[0px_0px_0px_1px_rgba(225,228,234,0.20)]"
          onClick={() => setShowdropdown(!showDropdown)}
        >
          {selectedChain !== null ? (
            <div className="flex gap-1 items-center">
              <span>
                <img
                  src={selectedChain.logo}
                  className="w-[20px] h-[20px] rounded-full"
                />
              </span>
              <span className="hidden md:block">{selectedChain.name}</span>{" "}
              {/* Hide text on mobile */}
            </div>
          ) : (
            <>Not found</>
          )}
          <IoChevronDown size={18} />
        </button>
        {showDropdown && (
          <div
            role="menu"
            aria-labelledby="switch-chain-button"
            className="dropdown absolute flex flex-col"
          >
            {supportedNetworks.map((ele: IChains) => (
              <div
                className="dropdown-item cursor-pointer flex gap-1 items-center"
                key={ele.id}
                onClick={() => setChain(ele.id, true)}
              >
                <img
                  src={ele.logo}
                  className="w-[20px] h-[20px] rounded-full"
                />
                <span className="whitespace-nowrap">{ele.name}</span>
                <span>
                  {ele.id === selectedChain?.id && (
                    <IoCheckmark color="00FF00" />
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </SwitchChainCompStyles>
    </ClickOutsideWrapper>
  );
};

const SwitchChainCompStyles = styled.div`
  position: relative;
  .dropdown {
    background-color: #10173d; /* Dark Navy Blue */
    color: #e0e6f1; /* Off-White Text */
    border: 1px solid #1a2255; /* Deep Indigo border for subtle contrast */
    border-radius: 0.5rem;
    padding: 0.25rem 0.3125rem;
    z-index: 15;
    width: max-content;
    width: fit-content;
    margin-top: 0.5rem;
  }

  /* Dropdown items */
  .dropdown-item {
    color: #b0e6ff; /* Light Cyan Text */
    padding: 0.5rem 0.75rem;
    transition: background-color 0.2s;
    display: inline-flex;
    width: max-content;
    min-width: 100%;
  }

  /* Hover effect for dropdown items */
  .dropdown-item:hover {
    background-color: #15394c; /* Dark Cyan on hover */
    color: #f0f4fa; /* Soft White Text on hover */
  }
`;
