import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { leftVariant, textVariant } from "../animations/animation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { OptionComponent } from "./optionComponent";

// import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
// import { BrowserProvider, Eip1193Provider } from "ethers";
// import { toast } from "react-toastify";

export const Hero = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
      <div className="text mt-12 md:mt-10">
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
          <OptionComponent closeModal={() => setShowModal(false)} />
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
