import styled, { css } from "styled-components";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  leftVariant,
  moodVariant,
  parentVariant,
  textVariant,
} from "../animations/animation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import ClickOutsideWrapper from "./outsideClick";
// import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
// import { BrowserProvider, Eip1193Provider } from "ethers";
// import { toast } from "react-toastify";

interface IOption {
  name: string;
  isSelected: boolean;
}
const Options: IOption[] = [
  { name: "Airdrop", isSelected: false },
  { name: "POAP", isSelected: false },
];
export const Hero = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState(Options);

  const handleSelectOption = (index: number) => {
    if (index === 0) {
      navigate("/airdrop");
    } else if (index === 1) {
      navigate("/poap");
    }
    setOptions(options);
  };

  // test sign message

  // const {walletProvider} = useAppKitProvider("eip155");
  // const {address} = useAppKitAccount();

  // const onSignMessage = async()=> {
  //   if(!address){
  //     toast.error('Please connect wallet');
  //     return;
  //   }
  //   const provider = new BrowserProvider(walletProvider as Eip1193Provider)
  //   const signer = await provider.getSigner()
  //   const signature = await signer?.signMessage('Hello, this is Sonikdrop')
  //   console.log(signature, address, 'Hello, this is Sonikdrop')
  // }

  return (
    <HeroStyles>
      <div className="text">
        <motion.h1 initial="initial" whileInView="final" variants={textVariant}>
          Sonic Drops <br /> Seamless Claims{" "}
          <div className="hidden md:block absolute bottom-0 -right-16">
            <img src="/rocket.svg" alt="sonic" />
          </div>
        </motion.h1>
        <motion.p initial="initial" whileInView="final2" variants={textVariant}>
          We streamline the entire airdrop experience by letting you
          effortlessly create, manage, and claim token airdrops and POAPs, all
          in one place.
        </motion.p>
      </div>
      <div className="btns">
        <motion.div
          className="get-started"
          initial="initial"
          whileInView="final3"
          viewport={{ once: true }}
          variants={leftVariant}
        >
          <button type="button" onClick={() => setShowModal(true)}>
            <p>Start Drop</p>
          </button>
        </motion.div>
        <motion.button
          type="button"
          className="second-btn"
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          variants={leftVariant}
          onClick={() => navigate("/claim")}
        >
          <p>Claim Drop</p>
          <FaAngleRight />
        </motion.button>
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="h-screen w-full flex justify-center items-center bg-[transparent] absolute top-[0] left-[0] backdrop-blur-lg p-4"
            variants={parentVariant}
            style={{ zIndex: 5 }}
            initial="initial"
            animate="final"
            // onClick={handleClickOutside}
          >
            <ClickOutsideWrapper onClickOutside={() => setShowModal(false)}>
              <motion.div
                className="w-full md:w-[600px] border-[3px] border-[#FFFFFF17] p-4 pb-8 rounded-[2rem] flex flex-col gap-8 bg-[#050C19]"
                variants={moodVariant}
                initial="initial"
                animate="final"
                exit="exit"
                key="kagura"
              >
                <div>
                  <CgClose
                    className="ml-auto cursor-pointer text-xl focus:outline-none focus:ring-2 focus:ring-[#2b75ff]"
                    onClick={() => {
                      setShowModal(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setShowModal(false);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                  />
                </div>
                <h3 className="text-white text-center text-2xl font-normal font-bold leading-6">
                  Choose Option
                </h3>
                <div className="flex justify-center items-center gap-[2.375rem] relative">
                  <h3 className="opacity-60 mix-blend-difference text-[#272D37] font-sans text-6xl font-semibold leading-[2.375rem] tracking-tight absolute inset-0 flex justify-center items-center">
                    ⚡
                  </h3>
                  {options.map((option, index) => (
                    <OptionStyles
                      key={index}
                      $isSelected={option.isSelected}
                      onClick={() => handleSelectOption(index)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleSelectOption(index);
                        }
                      }}
                    >
                      <p className="text-white text-lg font-normal font-bold leading-6">
                        {option.name}
                      </p>
                    </OptionStyles>
                  ))}
                </div>
              </motion.div>
            </ClickOutsideWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </HeroStyles>
  );
};

export const HeroStyles = styled.div`
  // border: 2px solid #fff;
  z-index: 10;
  &,
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  gap: 4rem;
  .text {
    gap: 2rem;
    p {
      width: 80%;
      text-align: center;
    }
     
  }
  h1 {
    text-align: center;
    font-size: 4rem;
    position: relative;
    z-index: 5;
    font-style: normal;
    font-weight: 400;
    line-height: 4.4rem; /* 110% */
    background: var(
      --kk,
      radial-gradient(
        100% 45% at 50% 50%,
        #fff 30%,
        rgba(255, 255, 255, 0.35) 100%
      )
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .get-started {
    border-radius: 2rem;
    border: 1.5px solid rgba(202, 236, 241, 0.11);
    display: flex;
    width: 8.75rem;
    height: 3rem;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    button {
      border-radius: 1.5rem;
      background: #172444;
      display: flex;
      width: 8rem;
      height: 2.375rem;
      padding: 0.625rem;
      justify-content: center;
      align-items: center;
      gap: 0.625rem;
      flex-shrink: 0;
      p {
        color: #fff;
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem; /* 150% */
      }
    }
  }
  .btns {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .second-btn {
    display: flex;
    width: 8.75rem;
    padding: 0.625rem;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    p {
      color: #fff;
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.5rem; /* 150% */
    }
  }
  @media (max-width: 500px) {
    padding: 0.25rem;
    h1 {
      font-size: 3.25rem;
      font-style: normal;
      font-weight: 400;
      line-height: 3.4rem; /* 110% */
    }
  }
  @media (min-width: 768px) {
    margin-top: 1rem;
    .text {
      p {
        width: 60%;
      }
    }
  }
`;

interface OptionProps {
  $isSelected: boolean;
}
const OptionStyles = styled.div<OptionProps>`
  border-radius: 1.5rem;
  border-top: 1px solid rgba(204, 215, 246, 0.58);
  border-bottom: 1px solid rgba(204, 215, 246, 0.58);
  background: #060d29;
  display: flex;
  width: 8.125rem;
  padding: 3.375rem 2.75rem 3.375rem 2.75rem;
  justify-content: center;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  cursor: pointer;
  z-index: 5;

  @media (min-width: 768px) {
    border-radius: 2.375rem;
    display: flex;
    width: 12.5rem;
    padding: 4.125rem 4.625rem 4.0625rem 5.25rem;
  }
  ${(props) =>
    props.$isSelected &&
    css`
      background: var(
        --kk,
        linear-gradient(180deg, #0b135b 40.24%, rgba(1, 3, 20, 0) 100%),
        radial-gradient(
          65.08% 85.05% at 50% 50%,
          rgba(0, 0, 0, 0) 37.41%,
          #2b75ff 75%,
          #26c6fd 100%
        )
      );
    `}
  &:hover {
    background: var(
      --kk,
      linear-gradient(180deg, #0b135b 40.24%, rgba(1, 3, 20, 0) 100%),
      radial-gradient(
        65.08% 85.05% at 50% 50%,
        rgba(0, 0, 0, 0) 37.41%,
        #2b75ff 75%,
        #26c6fd 100%
      )
    );
  }
`;

export const BlurDiv = styled.div`
  margin: auto;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: transparent;
`;
