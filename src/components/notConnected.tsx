import { useAppKit } from "@reown/appkit/react";
import { textVariant } from "../animations/animation";
import { ConnectBtnIcon } from "./icons";
import { SonikNotConnectedStyles } from "./styles/claimpage";

export const SonikNotConnected = () => {
  const { open } = useAppKit();
  return (
    <SonikNotConnectedStyles
      className="flex flex-col w-full justify-center items-center mt-[2rem] md:mt-[3rem] mb-[4rem] gap-[2rem] md:gap-[3rem]"
      initial="initial"
      animate="final"
      exit="exit"
      key="claimpage"
      variants={textVariant}
    >
      <div className="sonic-img w-[17.25rem] h-[14.3125rem] md:w-[34.5rem] md:h-[28.5625rem]">
        <img src="/sonic.png" alt="sonic image" className="w-full h-fit" />
      </div>

      <button
        type="button"
        className="flex items-center p-[0.625rem] h-[2.5rem] gap-[0.625rem] rounded-[1.25rem] bg-[rgba(255,255,255,0.07)]"
        onClick={() => open()}
      >
        <ConnectBtnIcon />
        <p>Connect Wallet</p>
      </button>
    </SonikNotConnectedStyles>
  );
};
