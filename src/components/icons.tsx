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
    <ChainDivStyle top={130} left={0}>
      <img src="/BNB.avif" alt="bnb" />
    </ChainDivStyle>
  );
};
export const ETH = () => {
  return (
    <ChainDivStyle top={130} right={0}>
      <img src="/Ethereum.avif" alt="eth" />
    </ChainDivStyle>
  );
};
export const Optimism = () => {
  return (
    <ChainDivStyle bottom={100} left={200}>
      <img src="/Optimism.avif" alt="op" />
    </ChainDivStyle>
  );
};
export const Base = () => {
  return (
    <ChainDivStyle top={180} left={150}>
      <img src="/Base.png" alt="base" />
    </ChainDivStyle>
  );
};
export const Polygon = () => {
  return (
    <ChainDivStyle bottom={180} left={90}>
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
export const Kaia = () => {
  return (
    <ChainDivStyle bottom={200} right={50}>
      <img src="/kaia.png" alt="sol" />
    </ChainDivStyle>
  );
};

export const Lisk = () => {
  return (
    <ChainDivStyle bottom={300} right={110}>
      <img src="/Lisk.png" alt="sol" />
    </ChainDivStyle>
  );
};

interface IChainDiv {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}
export const BorderStyle = styled.div`
  border: 1px solid red;
`;
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
  filter: blur(7px);
  cursor: pointer;
  z-index: 1;
  scale: 0.8;
  transition: filter 0.3s ease, scale 0.3s ease; /* Add transition for filter and scale */
  &:hover {
    filter: blur(0px);
    scale: 0.9;
    animation-play-state: paused;
  }

  ${({ top, left }) =>
    top !== undefined &&
    left !== undefined &&
    css`
      animation: ${moveTopLeft} 3s infinite;
    `}
  ${({ top, right }) =>
    top !== undefined &&
    right !== undefined &&
    css`
      animation: ${moveTopRight} 3s infinite;
    `}
  ${({ bottom, left }) =>
    bottom !== undefined &&
    left !== undefined &&
    css`
      animation: ${moveBottomLeft} 3s infinite;
    `}
  ${({ bottom, right }) =>
    bottom !== undefined &&
    right !== undefined &&
    css`
      animation: ${moveBottomRight} 3s infinite;
    `}

  @media (max-width: 767px) {
    display: none;
  }
`;

export const MagnifyingGlass = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.66699 1.66699C5.52486 1.66699 2.16699 5.02486 2.16699 9.16699C2.16699 13.3091 5.52486 16.667 9.66699 16.667C11.4378 16.667 13.0653 16.0533 14.3484 15.0269L17.4111 18.0896C17.7365 18.415 18.2641 18.415 18.5896 18.0896C18.915 17.7641 18.915 17.2365 18.5896 16.9111L15.5269 13.8484C16.5533 12.5653 17.167 10.9378 17.167 9.16699C17.167 5.02486 13.8091 1.66699 9.66699 1.66699ZM3.83366 9.16699C3.83366 5.94533 6.44533 3.33366 9.66699 3.33366C12.8887 3.33366 15.5003 5.94533 15.5003 9.16699C15.5003 12.3887 12.8887 15.0003 9.66699 15.0003C6.44533 15.0003 3.83366 12.3887 3.83366 9.16699Z"
        fill="#667185"
      />
    </svg>
  );
};

export const CircleCancel = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M8.85891 7.47504C8.61483 7.23096 8.2191 7.23096 7.97503 7.47504C7.73095 7.71912 7.73095 8.11484 7.97503 8.35892L9.61643 10.0003L7.97504 11.6417C7.73097 11.8858 7.73097 12.2815 7.97504 12.5256C8.21912 12.7697 8.61485 12.7697 8.85893 12.5256L10.5003 10.8842L12.1417 12.5256C12.3858 12.7696 12.7815 12.7696 13.0256 12.5256C13.2696 12.2815 13.2696 11.8858 13.0256 11.6417L11.3842 10.0003L13.0256 8.35894C13.2697 8.11486 13.2697 7.71913 13.0256 7.47506C12.7815 7.23098 12.3858 7.23098 12.1417 7.47506L10.5003 9.11644L8.85891 7.47504Z"
        fill="#667185"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5003 1.04199C5.55277 1.04199 1.54199 5.05277 1.54199 10.0003C1.54199 14.9479 5.55277 18.9587 10.5003 18.9587C15.4479 18.9587 19.4587 14.9479 19.4587 10.0003C19.4587 5.05277 15.4479 1.04199 10.5003 1.04199ZM2.79199 10.0003C2.79199 5.74313 6.24313 2.29199 10.5003 2.29199C14.7575 2.29199 18.2087 5.74313 18.2087 10.0003C18.2087 14.2575 14.7575 17.7087 10.5003 17.7087C6.24313 17.7087 2.79199 14.2575 2.79199 10.0003Z"
        fill="#667185"
      />
    </svg>
  );
};

export const CalendarIcon =()=>{
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <g clip-path="url(#clip0_2001_1553)">
    <path d="M8.5 7C8.77614 7 9 6.77614 9 6.5C9 6.22386 8.77614 6 8.5 6C8.22386 6 8 6.22386 8 6.5C8 6.77614 8.22386 7 8.5 7Z" fill="url(#paint0_linear_2001_1553)"/>
    <path d="M8.5 9C8.77614 9 9 8.77614 9 8.5C9 8.22386 8.77614 8 8.5 8C8.22386 8 8 8.22386 8 8.5C8 8.77614 8.22386 9 8.5 9Z" fill="url(#paint1_linear_2001_1553)"/>
    <path d="M6.5 6.5C6.5 6.77614 6.27614 7 6 7C5.72386 7 5.5 6.77614 5.5 6.5C5.5 6.22386 5.72386 6 6 6C6.27614 6 6.5 6.22386 6.5 6.5Z" fill="url(#paint2_linear_2001_1553)"/>
    <path d="M6.5 8.5C6.5 8.77614 6.27614 9 6 9C5.72386 9 5.5 8.77614 5.5 8.5C5.5 8.22386 5.72386 8 6 8C6.27614 8 6.5 8.22386 6.5 8.5Z" fill="url(#paint3_linear_2001_1553)"/>
    <path d="M3.5 7C3.77614 7 4 6.77614 4 6.5C4 6.22386 3.77614 6 3.5 6C3.22386 6 3 6.22386 3 6.5C3 6.77614 3.22386 7 3.5 7Z" fill="url(#paint4_linear_2001_1553)"/>
    <path d="M3.5 9C3.77614 9 4 8.77614 4 8.5C4 8.22386 3.77614 8 3.5 8C3.22386 8 3 8.22386 3 8.5C3 8.77614 3.22386 9 3.5 9Z" fill="url(#paint5_linear_2001_1553)"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.5 0.875C3.70711 0.875 3.875 1.04289 3.875 1.25V1.63136C4.206 1.62499 4.57066 1.625 4.97173 1.625H7.02821C7.42928 1.625 7.794 1.62499 8.125 1.63136V1.25C8.125 1.04289 8.29289 0.875 8.5 0.875C8.70711 0.875 8.875 1.04289 8.875 1.25V1.66354C9.00497 1.67345 9.12805 1.68591 9.24451 1.70157C9.83072 1.78038 10.3052 1.94644 10.6794 2.32062C11.0536 2.6948 11.2196 3.16928 11.2984 3.75549C11.375 4.32509 11.375 5.0529 11.375 5.97177V7.02821C11.375 7.94707 11.375 8.67491 11.2984 9.24451C11.2196 9.83072 11.0536 10.3052 10.6794 10.6794C10.3052 11.0536 9.83072 11.2196 9.24451 11.2984C8.67491 11.375 7.9471 11.375 7.02823 11.375H4.97179C4.05292 11.375 3.32509 11.375 2.75549 11.2984C2.16928 11.2196 1.6948 11.0536 1.32062 10.6794C0.94644 10.3052 0.780382 9.83072 0.701568 9.24451C0.624986 8.6749 0.624992 7.94709 0.625 7.02821V5.97179C0.624992 5.05291 0.624986 4.3251 0.701568 3.75549C0.780382 3.16928 0.94644 2.6948 1.32062 2.32062C1.6948 1.94644 2.16928 1.78038 2.75549 1.70157C2.87195 1.68591 2.99503 1.67345 3.125 1.66354V1.25C3.125 1.04289 3.29289 0.875 3.5 0.875ZM2.85542 2.44488C2.35238 2.51251 2.06256 2.63935 1.85095 2.85095C1.63935 3.06256 1.51251 3.35238 1.44488 3.85542C1.43343 3.94062 1.42385 4.0303 1.41584 4.125H10.5842C10.5761 4.0303 10.5666 3.94062 10.5551 3.85542C10.4875 3.35238 10.3607 3.06256 10.149 2.85095C9.93744 2.63935 9.64762 2.51251 9.14457 2.44488C8.63074 2.3758 7.95341 2.375 7 2.375H5C4.04659 2.375 3.36926 2.3758 2.85542 2.44488ZM1.375 6C1.375 5.57299 1.37516 5.20136 1.38154 4.875H10.6185C10.6248 5.20136 10.625 5.57299 10.625 6V7C10.625 7.95341 10.6242 8.63074 10.5551 9.14458C10.4875 9.64762 10.3607 9.93744 10.149 10.149C9.93744 10.3607 9.64762 10.4875 9.14457 10.5551C8.63074 10.6242 7.95341 10.625 7 10.625H5C4.04659 10.625 3.36926 10.6242 2.85542 10.5551C2.35238 10.4875 2.06256 10.3607 1.85095 10.149C1.63935 9.93744 1.51251 9.64762 1.44488 9.14458C1.3758 8.63074 1.375 7.95341 1.375 7V6Z" fill="url(#paint6_linear_2001_1553)"/>
  </g>
  <defs>
    <linearGradient id="paint0_linear_2001_1553" x1="6" y1="0.875" x2="6" y2="11.375" gradientUnits="userSpaceOnUse">
      <stop stopColor="#26C6FD"/>
      <stop offset="1" stopColor="#097AEC"/>
    </linearGradient>
    <linearGradient id="paint1_linear_2001_1553" x1="6" y1="0.875" x2="6" y2="11.375" gradientUnits="userSpaceOnUse">
      <stop stopColor="#26C6FD"/>
      <stop offset="1" stopColor="#097AEC"/>
    </linearGradient>
    <linearGradient id="paint2_linear_2001_1553" x1="6" y1="0.875" x2="6" y2="11.375" gradientUnits="userSpaceOnUse">
      <stop stopColor="#26C6FD"/>
      <stop offset="1" stopColor="#097AEC"/>
    </linearGradient>
    <linearGradient id="paint3_linear_2001_1553" x1="6" y1="0.875" x2="6" y2="11.375" gradientUnits="userSpaceOnUse">
      <stop stopColor="#26C6FD"/>
      <stop offset="1" stopColor="#097AEC"/>
    </linearGradient>
    <linearGradient id="paint4_linear_2001_1553" x1="6" y1="0.875" x2="6" y2="11.375" gradientUnits="userSpaceOnUse">
      <stop stopColor="#26C6FD"/>
      <stop offset="1" stopColor="#097AEC"/>
    </linearGradient>
    <linearGradient id="paint5_linear_2001_1553" x1="6" y1="0.875" x2="6" y2="11.375" gradientUnits="userSpaceOnUse">
      <stop stopColor="#26C6FD"/>
      <stop offset="1" stopColor="#097AEC"/>
    </linearGradient>
    <linearGradient id="paint6_linear_2001_1553" x1="6" y1="0.875" x2="6" y2="11.375" gradientUnits="userSpaceOnUse">
      <stop stopColor="#26C6FD"/>
      <stop offset="1" stopColor="#097AEC"/>
    </linearGradient>
    <clipPath id="clip0_2001_1553">
      <rect width="12" height="12" rx="5" fill="white"/>
    </clipPath>
  </defs>
</svg>
  )
}