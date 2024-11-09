import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { leftVariant, textVariant } from "../animations/animation";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <HeroStyles>
      <div className="text">
        <motion.h1 initial="initial" whileInView="final" variants={textVariant}>
          Sonic Drops <br /> Seamless Claims
        </motion.h1>
        <motion.p initial="initial" whileInView="final2" variants={textVariant}>
          Effortless claiming ready in seconds, SonikDrop keeps it fast simple
          and secure across chains, empowering creators and users with smooth
          drops every time
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
          <button type="button" onClick={() => navigate("/airdrop")}>
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
        >
          <p>Fast Claim</p>
          <FaAngleRight />
        </motion.button>
      </div>
    </HeroStyles>
  );
};

export const HeroStyles = styled.div`
  // border: 2px solid #fff;
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
