import { motion } from "framer-motion";
import styled from "styled-components";

export const ClaimPageStyle = styled.div`
  h1,
  h2 {
    color: #fff;
    font-style: normal;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 3.0625rem; /* 122.5% */
  }
  h2 {
    font-size: 2rem;
    background: var(
      --coughs,
      linear-gradient(164deg, #2c67ff -21.47%, #27c4fd 88.84%)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .banner {
    border-radius: 1.25rem;
    background: linear-gradient(180deg, #0b135b 40.24%, rgba(1, 3, 20, 0) 100%),
      radial-gradient(
        65.08% 85.05% at 50% 50%,
        rgba(0, 0, 0, 0) 37.41%,
        #2b75ff 75%,
        #26c6fd 100%
      );
    min-height: 12.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.75rem;
    p {
      color: #babcd2;
      text-align: center;
      font-style: normal;
      font-weight: 400;
      line-height: 1.395rem; /* 148.8% */
      font-size: 0.9375rem;
    }
  }
  .filters {
    display: flex;
    gap: 1rem;
    .tabs {
      display: flex;
      border-radius: 0.5rem;
      background: var(--Fill-Color-Light-Tertiary, rgba(118, 118, 128, 0.12));
      height: 2.5rem;
      padding: 0.125rem;
      button {
        display: flex;
        padding: 0.625rem 0.46875rem 0.625rem 0.5rem;
        width: 6.375rem;
        justify-content: center;
        align-items: center;
        flex: 1 0 0;
        border-radius: 0.4375rem;
        align-self: stretch;
        background: transparent;
        position: relative;
      }
    }
    .button p {
      text-align: center;
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem; /* 153.846% */
      letter-spacing: -0.005rem;
    }
    justify-content: space-between;
    align-items: center;
  }
  .inp {
    width: 40%;
    input {
      width: 100%;
      height: 3.5rem;
      padding: 1rem;
      padding-right: 3rem;
      padding-left: 3rem;
      border-radius: 1.875rem;
      border: 1px solid rgba(152, 162, 179, 0.3);
      background: #050c19;
      &:focus {
        border: 1px solid rgba(38, 198, 253, 0.7);
        box-shadow: 0px 4px 10px 0px rgba(204, 215, 246, 0.12);
      }
    }
    input::placeholder {
      color: var(--Grey-400, #98a2b3);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 1.35rem;
      line-height: 1.5625rem; /* 122.5% */
    }
    h2 {
      font-size: 1.25rem;
      line-height: 1.5625rem; /* 122.5% */
    }
    .banner {
      padding-right: 1rem;
      padding-left: 1rem;
      gap: 0.5rem;
      p {
        font-size: 0.8125rem;
        line-height: 1rem;
      }
    }
    .filters {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
    .inp {
      width: 100%;
      input {
        width: 100%;
      }
    }
  }
`;

export const DropCompStyle = styled(motion.div)`
  border-radius: 0.5rem;
  border: 1px solid rgba(152, 162, 179, 0.3);
  display: flex;
  padding: 1.25rem 1rem 0.875rem 1rem;
  flex-direction: column;
  align-items: center;
  // height: fit-content;
  justify-content: space-between;
  gap: 1.5rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-self: stretch;
  }
  .poap-img {
    border-radius: 0.625rem;
    height: 5rem;
    width: 100%;
    img {
      border-radius: 0.625rem;
      width: 100%;
    }
  }
  .btn {
    width: 100%;
    button {
      border-radius: 1.25rem;
      background: rgba(255, 255, 255, 0.1);
      height: 2.5rem;
      padding: 0.625rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #f5f5f5;
      text-align: center;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 2rem; /* 228.571% */
      letter-spacing: -0.02rem;
      &:hover {
        background: #01a7ff;
        box-shadow: 0px 4px 6.8px 0px #2b75ff inset;
      }
    }
  }

  .one .deet {
    h4 {
      color: var(--Grey-50, #f9fafb);
      font-variant-numeric: lining-nums proportional-nums;
      font-style: normal;
      font-weight: 600;
      line-height: 1.5rem; /* 184.615% */
    }
    p {
      color: var(--Grey-300, #d0d5dd);
      font-variant-numeric: lining-nums proportional-nums;
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem; /* 240% */
    }
  }
  .two {
    h3 {
      color: var(--Grey-50, #f9fafb);
      font-variant-numeric: lining-nums proportional-nums;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.5rem; /* 150% */
    }
    p {
      color: var(--Grey-300, #d0d5dd);
      font-variant-numeric: lining-nums proportional-nums;
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem; /* 240% */
    }
  }
  .tiny {
    font-variant-numeric: lining-nums proportional-nums;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem; /* 342.857% */
    background: var(
      --coughs,
      linear-gradient(164deg, #2c67ff -21.47%, #27c4fd 88.84%)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .inner .mini,
  .text-completed {
    font-variant-numeric: lining-nums proportional-nums;
    font-size: 0.575rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem; /* 342.857% */
    color: #000;
  }
  .text-completed {
    color: #36bc7b;
  }
  .blu p {
    font-variant-numeric: lining-nums proportional-nums;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem; /* 240% */
    background: var(--okay, linear-gradient(180deg, #26c6fd 0%, #097aec 100%));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .three .inner {
    background: var(
      --coughs,
      linear-gradient(164deg, #2c67ff -21.47%, #27c4fd 88.84%)
    );
  }

  &:hover {
    box-shadow: 0px 4px 10px 0px rgba(204, 215, 246, 0.2);
    border: 1px solid #2c67ff;
  }
`;

export const DropListStyle = styled.div`
  //   border: 2px solid red;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (min-width: 500px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(164px, 100%), 1fr));
    column-gap: 1.69rem;
    row-gap: 2rem;
  }

  @media (min-width: 767px) {
    grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));
    column-gap: 1.69rem;
    row-gap: 2rem;
  }

  @media (min-width: 998px) {
    grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
    column-gap: 1.69rem;
    row-gap: 2rem;
  }
`;

export const AbsoluteContStyle = styled(motion.div)`
  position: fixed;
  transition: 0.4s;
  left: 50%;
  top: 50%;
  height: 100vh;
  width: 100vw;
  margin-left: -50vw;
  margin-top: -50vh;
  z-index: 20;
  background: rgba(24, 29, 80, 0.44);
  backdrop-filter: blur(4px);
`;

export const FlexAbsoluteModalStyles = styled(AbsoluteContStyle)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ClaimModalStyles = styled(motion.div)`
  width: 60%;
  .modal {
    border-radius: 2rem;
    background: #050c19;
    display: flex;
    padding: 2.9375rem 2.5625rem 1.625rem 2.625rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.8125rem;
    flex-shrink: 0;
    .reward-pool {
      border-radius: 0.5rem;
      padding: 1.25rem;
      background: linear-gradient(
          180deg,
          rgba(11, 19, 91, 0.7) 40.24%,
          rgba(1, 3, 20, 0) 100%
        ),
        radial-gradient(
          65.08% 85.05% at 50% 50%,
          rgba(0, 0, 0, 0) 37.41%,
          rgba(43, 117, 255, 0.3) 75%,
          rgba(38, 198, 253, 0.3) 100%
        );
    }
    .deet {
      h4 {
        color: var(--Grey-50, #f9fafb);
        font-variant-numeric: lining-nums proportional-nums;
        font-style: normal;
        font-weight: 600;
        line-height: 1.5rem; /* 184.615% */
      }
      p {
        color: var(--Grey-300, #d0d5dd);
        font-variant-numeric: lining-nums proportional-nums;
        font-size: 0.8125rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem; /* 240% */
      }
    }
    .required {
      p {
        font-variant-numeric: lining-nums proportional-nums;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem; /* 200% */
        background: var(
          --okay,
          linear-gradient(180deg, #26c6fd 0%, #097aec 100%)
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .addy {
      h4 {
        color: var(--Grey-50, #f9fafb);
        font-variant-numeric: lining-nums proportional-nums;
        font-size: 0.8125rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.5rem; /* 184.615% */
      }
      p {
        color: var(--Grey-300, #d0d5dd);
        font-variant-numeric: lining-nums proportional-nums;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem; /* 171.429% */
        opacity: 0.5;
      }
    }
    .btn button {
      border-radius: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      width: 100%;
      height: 3rem;
      color: #f5f5f5;
      text-align: center;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 2rem; /* 228.571% */
      letter-spacing: -0.02rem;
      &:hover {
        background: #01a7ff;
        box-shadow: 0px 4px 6.8px 0px #2b75ff inset;
      }
    }
    .cards {
      p {
        color: var(--Grey-300, #d0d5dd);
        font-variant-numeric: lining-nums proportional-nums;
        font-size: 0.6875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem; /* 218.182% */
      }
      h4 {
        color: var(--Grey-50, #f9fafb);
        font-variant-numeric: lining-nums proportional-nums;
        font-size: 1rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.5rem; /* 150% */
      }
      .inner .mini,
      .text-completed {
        font-variant-numeric: lining-nums proportional-nums;
        font-size: 0.575rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.5rem; /* 342.857% */
        color: #000;
      }
      .text-completed {
        color: #36bc7b;
      }
    }
    .cards .inner {
      background: var(
        --coughs,
        linear-gradient(164deg, #2c67ff -21.47%, #27c4fd 88.84%)
      );
    }
  }
  @media (max-width: 500px) {
    .modal {
      padding: 2.9375rem 1rem 3.3125rem 1rem;
    }
    width: 91%;
  }
  @media (min-width: 998px) {
    width: 35%;
  }
`;

export const SonikNotConnectedStyles = styled(motion.div)`
  text-align: center;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem; /* 228.571% */
  letter-spacing: -0.02rem;
  background: var(
    --coughs,
    linear-gradient(164deg, #2c67ff -21.47%, #27c4fd 88.84%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
