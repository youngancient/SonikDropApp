import styled, { keyframes, css } from "styled-components";
import { Rotate } from "../animations/button";

export const LogoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="21"
      viewBox="0 0 29 21"
      fill="none"
    >
      <path
        d="M29.0003 0C29.0003 0 10.5843 2.43536 9.63987 2.67105C8.69542 2.90674 8.51258 2.90299 7.43625 3.61378C6.35991 4.32456 6.01963 5.02787 6.01963 5.02787C6.01963 5.02787 5.36399 5.82375 5.23263 6.44195C5.08795 7.12281 5.0229 7.52862 5.23263 8.17028C5.58419 9.24589 5.96876 9.42725 7.43625 10.0557C8.90374 10.6842 13.8897 10.6842 13.8897 10.6842L13.7323 10.5271L12.3157 10.37C12.3157 10.37 10.9421 10.0701 10.4269 9.42725C10.1693 9.10583 9.95467 8.48452 9.95467 8.48452L9.34718 8.36324C9.22902 8.33965 9.24259 8.15556 9.36304 8.15246C11.6726 8.09303 17.5461 7.83811 21.445 6.75619C22.0633 6.58462 22.4225 6.52118 23.019 6.28483C24.3818 5.74482 25.0923 5.23795 26.1671 4.24226C27.6291 2.88776 29.0003 0 29.0003 0Z"
        fill="url(#paint0_linear_2001_32)"
      />
      <path
        d="M22.3405 15.7025L22.3404 15.7027L22.3403 15.7028L22.3378 15.7069L22.3252 15.7265C22.3135 15.7444 22.2951 15.7719 22.2697 15.8076C22.2189 15.8791 22.1404 15.9832 22.0323 16.1094C21.8162 16.3618 21.4823 16.7017 21.0163 17.0441C20.5597 17.3796 20.0441 17.6053 19.6376 17.7475C19.4354 17.8183 19.2625 17.8675 19.1409 17.8989C19.0802 17.9146 19.0324 17.9258 19.0002 17.933C18.9842 17.9366 18.9721 17.9392 18.9642 17.9408L18.9593 17.9418L0.43227 20.5461C0.439821 20.5312 0.447561 20.516 0.455488 20.5004C0.60256 20.2115 0.813477 19.8123 1.06863 19.3714C1.58251 18.4835 2.26279 17.4498 2.95231 16.7989C3.99029 15.8191 4.66193 15.332 5.96398 14.8064C6.37677 14.6397 6.66161 14.5643 7.02568 14.4679C7.16318 14.4316 7.31198 14.3922 7.48324 14.3437C11.2753 13.2716 17.0095 13.0164 19.2794 12.9568C19.4992 12.9511 19.6086 12.7714 19.6196 12.6284C19.6304 12.4862 19.5512 12.2944 19.339 12.2512L18.8795 12.1578C18.8016 11.9527 18.6307 11.5383 18.4256 11.2776C18.1344 10.9074 17.6303 10.6548 17.229 10.4968C17.2677 10.4989 17.3067 10.5011 17.3458 10.5033C18.028 10.5424 18.76 10.6009 19.4252 10.6882C20.0947 10.776 20.6801 10.8911 21.0776 11.0381C22.697 11.6371 23.0291 12.5439 23.0857 12.754C23.1543 13.009 23.244 13.7545 23.0854 14.3534C23.015 14.6193 22.8391 14.9463 22.6683 15.2203C22.5848 15.3542 22.5061 15.47 22.4482 15.5523C22.4193 15.5933 22.3958 15.6258 22.3796 15.6479L22.3612 15.6728L22.3567 15.6788L22.3556 15.6802L22.3555 15.6804L22.3555 15.6805L22.3554 15.6805L22.3474 15.6911L22.3407 15.7022L22.3406 15.7023L22.3405 15.7024L22.3405 15.7025Z"
        fill="url(#paint1_linear_2001_32)"
        stroke="url(#paint2_linear_2001_32)"
        strokeWidth="0.5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2001_32"
          x1="17.0441"
          y1="0"
          x2="17.0441"
          y2="10.6842"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2C67FF" />
          <stop offset="1" stopColor="#26C6FD" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2001_32"
          x1="11.7119"
          y1="20.8594"
          x2="11.7119"
          y2="10.1752"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2C67FF" />
          <stop offset="1" stopColor="#26C6FD" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2001_32"
          x1="13.5945"
          y1="25.1016"
          x2="11.6376"
          y2="10.1836"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2C67FF" />
          <stop offset="1" stopColor="#27C4FD" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// to be used for button loading states
export const ButtonLoader = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 4px solid #fff;
  border-top: 4px solid transparent;
  margin: auto;
  animation: ${Rotate} 0.6s ease infinite;
`;

// to be used for chain icons
const moveTopLeft = keyframes`
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-15px, -5px); }
  50% { transform: translate(-30px, -10px); }
  75% { transform: translate(-15px, -5px); }
`;

const moveTopRight = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
`;

const moveBottomLeft = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-10px, 10px); }
`;

const moveBottomRight = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, 10px); }
`;

export const BNB = () => {
  return (
    <ChainDivStyle top={130} left={30}>
      <img src="/BNB.avif" alt="bnb" />
    </ChainDivStyle>
  );
};
export const ETH = () => {
  return (
    <ChainDivStyle top={130} right={80}>
      <img src="/Ethereum.avif" alt="eth" />
    </ChainDivStyle>
  );
};
export const Optimism = () => {
  return (
    <ChainDivStyle top={180} left={150}>
      <img src="/Optimism.avif" alt="op" />
    </ChainDivStyle>
  );
};
export const Polygon = () => {
  return (
    <ChainDivStyle bottom={100} left={110}>
      <img src="/Polygon.avif" alt="polygon" />
    </ChainDivStyle>
  );
};
export const Arbitrum = () => {
  return (
    <ChainDivStyle bottom={100} right={150}>
      <img src="/Arbitrum.svg" alt="arbitrum" />
    </ChainDivStyle>
  );
};
export const Solana = () => {
  return (
    <ChainDivStyle bottom={200} right={50}>
      <img src="/Solana.avif" alt="sol" />
    </ChainDivStyle>
  );
};

interface IChainDiv {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}
export const ChainDivStyle = styled.div<IChainDiv>`
  position: absolute;
  z-index: -1;
  top: ${({ top }) => (top !== undefined ? `${top}px` : "auto")};
  left: ${({ left }) => (left !== undefined ? `${left}px` : "auto")};
  right: ${({ right }) => (right !== undefined ? `${right}px` : "auto")};
  bottom: ${({ bottom }) => (bottom !== undefined ? `${bottom}px` : "auto")};
  border-radius: 50%;
  width: 90px;
  height: 90px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  filter: blur(6px);
  cursor: pointer;
  z-index: 1;
  scale: 0.8;
  transition: filter 0.3s ease, scale 0.3s ease; /* Add transition for filter and scale */
  &:hover {
    filter: blur(0px);
    scale: 0.9;
    animation-play-state: paused;
  }
  

   ${({ top, left }) => top !== undefined && left !== undefined && css`
    animation: ${moveTopLeft} 3s infinite;
  `}
  ${({ top, right }) => top !== undefined && right !== undefined && css`
    animation: ${moveTopRight} 3s infinite;
  `}
  ${({ bottom, left }) => bottom !== undefined && left !== undefined && css`
    animation: ${moveBottomLeft} 3s infinite;
  `}
  ${({ bottom, right }) => bottom !== undefined && right !== undefined && css`
    animation: ${moveBottomRight} 3s infinite;
  `}

  @media (max-width: 767px) {
    display: none;
  }
`;
