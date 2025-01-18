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

export interface ILink {
  href?: string;
}
export const BNB: React.FC<ILink> = ({ href }) => {
  return (
    <ChainDivStyle
      top={130}
      left={0}
      onClick={() => href && window.open(href, "_blank")}
    >
      <img src="/BNB.avif" alt="bnb" />
    </ChainDivStyle>
  );
};
export const ETH: React.FC<ILink> = ({ href }) => {
  return (
    <ChainDivStyle
      top={130}
      right={0}
      onClick={() => href && window.open(href, "_blank")}
    >
      <img src="/Ethereum.avif" alt="eth" />
    </ChainDivStyle>
  );
};
export const Optimism: React.FC<ILink> = ({ href }) => {
  return (
    <ChainDivStyle
      bottom={100}
      left={200}
      onClick={() => href && window.open(href, "_blank")}
    >
      <img src="/Optimism.avif" alt="op" />
    </ChainDivStyle>
  );
};
export const Base: React.FC<ILink> = ({ href }) => {
  return (
    <ChainDivStyle
      top={180}
      left={150}
      onClick={() => href && window.open(href, "_blank")}
    >
      <img src="/Base.png" alt="base" />
    </ChainDivStyle>
  );
};
export const Polygon: React.FC<ILink> = ({ href }) => {
  return (
    <ChainDivStyle
      bottom={180}
      left={90}
      onClick={() => href && window.open(href, "_blank")}
    >
      <img src="/Polygon.avif" alt="polygon" />
    </ChainDivStyle>
  );
};
export const Arbitrum: React.FC<ILink> = ({ href }) => {
  return (
    <ChainDivStyle
      bottom={100}
      right={150}
      onClick={() => href && window.open(href, "_blank")}
    >
      <img src="/Arbitrum.svg" alt="arbitrum" />
    </ChainDivStyle>
  );
};
export const Kaia: React.FC<ILink> = ({ href }) => {
  return (
    <ChainDivStyle
      bottom={200}
      right={50}
      onClick={() => href && window.open(href, "_blank")}
    >
      <img src="/kaia.png" alt="sol" />
    </ChainDivStyle>
  );
};

export const Lisk: React.FC<ILink> = ({ href }) => {
  return (
    <ChainDivStyle
      bottom={300}
      right={110}
      onClick={() => href && window.open(href, "_blank")}
    >
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
  z-index: 1;
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
  scale: 0.8;
  transition: filter 0.3s ease, scale 0.3s ease;
  
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

  /* Tablet Breakpoint */
  @media (max-width: 1024px) {
    width: 70px;
    height: 70px;
    
    /* Adjust positioning for tablet */
    ${({ top }) => top !== undefined && css`
      top: ${Math.max(top * 0.8, 10)}px;
    `}
    ${({ bottom }) => bottom !== undefined && css`
      bottom: ${Math.max(bottom * 0.8, 10)}px;
    `}
    ${({ left }) => left !== undefined && css`
      left: ${Math.max(left * 0.8, 10)}px;
    `}
    ${({ right }) => right !== undefined && css`
      right: ${Math.max(right * 0.8, 10)}px;
    `}
  }

  
  /* Mobile Breakpoint */
  @media (max-width: 767px) {
    display: block;
    width: 50px;
    height: 50px;
    z-index: -1; /* Place icons behind other elements */
    
    ${({ top }) => top !== undefined && css`
      top: ${Math.max(top * 0.6, 5)}px;
    `}
    ${({ bottom }) => bottom !== undefined && css`
      bottom: ${Math.max(bottom * 1.5, 60)}px;
    `}
    ${({ left }) => left !== undefined && css`
      left: ${Math.max(left * 0.6, 5)}px;
    `}
    ${({ right }) => right !== undefined && css`
      right: ${Math.max(right * 0.6, 5)}px;
    `}

    /* Increased blur effect and reduced opacity for mobile */
    filter: blur(12px);
    opacity: 0.8;
    scale: 0.7;

    &:hover {
      filter: blur(12px); /* Maintain blur effect on hover for mobile */
      scale: 0.7; /* Disable scale effect on hover for mobile */
      animation-play-state: running; /* Keep animation running on hover for mobile */
    }

    /* Remove pointer cursor on mobile since we're disabling interactions */
    cursor: default;
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

export const CalendarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <g clipPath="url(#clip0_2001_1553)">
        <path
          d="M8.5 7C8.77614 7 9 6.77614 9 6.5C9 6.22386 8.77614 6 8.5 6C8.22386 6 8 6.22386 8 6.5C8 6.77614 8.22386 7 8.5 7Z"
          fill="url(#paint0_linear_2001_1553)"
        />
        <path
          d="M8.5 9C8.77614 9 9 8.77614 9 8.5C9 8.22386 8.77614 8 8.5 8C8.22386 8 8 8.22386 8 8.5C8 8.77614 8.22386 9 8.5 9Z"
          fill="url(#paint1_linear_2001_1553)"
        />
        <path
          d="M6.5 6.5C6.5 6.77614 6.27614 7 6 7C5.72386 7 5.5 6.77614 5.5 6.5C5.5 6.22386 5.72386 6 6 6C6.27614 6 6.5 6.22386 6.5 6.5Z"
          fill="url(#paint2_linear_2001_1553)"
        />
        <path
          d="M6.5 8.5C6.5 8.77614 6.27614 9 6 9C5.72386 9 5.5 8.77614 5.5 8.5C5.5 8.22386 5.72386 8 6 8C6.27614 8 6.5 8.22386 6.5 8.5Z"
          fill="url(#paint3_linear_2001_1553)"
        />
        <path
          d="M3.5 7C3.77614 7 4 6.77614 4 6.5C4 6.22386 3.77614 6 3.5 6C3.22386 6 3 6.22386 3 6.5C3 6.77614 3.22386 7 3.5 7Z"
          fill="url(#paint4_linear_2001_1553)"
        />
        <path
          d="M3.5 9C3.77614 9 4 8.77614 4 8.5C4 8.22386 3.77614 8 3.5 8C3.22386 8 3 8.22386 3 8.5C3 8.77614 3.22386 9 3.5 9Z"
          fill="url(#paint5_linear_2001_1553)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.5 0.875C3.70711 0.875 3.875 1.04289 3.875 1.25V1.63136C4.206 1.62499 4.57066 1.625 4.97173 1.625H7.02821C7.42928 1.625 7.794 1.62499 8.125 1.63136V1.25C8.125 1.04289 8.29289 0.875 8.5 0.875C8.70711 0.875 8.875 1.04289 8.875 1.25V1.66354C9.00497 1.67345 9.12805 1.68591 9.24451 1.70157C9.83072 1.78038 10.3052 1.94644 10.6794 2.32062C11.0536 2.6948 11.2196 3.16928 11.2984 3.75549C11.375 4.32509 11.375 5.0529 11.375 5.97177V7.02821C11.375 7.94707 11.375 8.67491 11.2984 9.24451C11.2196 9.83072 11.0536 10.3052 10.6794 10.6794C10.3052 11.0536 9.83072 11.2196 9.24451 11.2984C8.67491 11.375 7.9471 11.375 7.02823 11.375H4.97179C4.05292 11.375 3.32509 11.375 2.75549 11.2984C2.16928 11.2196 1.6948 11.0536 1.32062 10.6794C0.94644 10.3052 0.780382 9.83072 0.701568 9.24451C0.624986 8.6749 0.624992 7.94709 0.625 7.02821V5.97179C0.624992 5.05291 0.624986 4.3251 0.701568 3.75549C0.780382 3.16928 0.94644 2.6948 1.32062 2.32062C1.6948 1.94644 2.16928 1.78038 2.75549 1.70157C2.87195 1.68591 2.99503 1.67345 3.125 1.66354V1.25C3.125 1.04289 3.29289 0.875 3.5 0.875ZM2.85542 2.44488C2.35238 2.51251 2.06256 2.63935 1.85095 2.85095C1.63935 3.06256 1.51251 3.35238 1.44488 3.85542C1.43343 3.94062 1.42385 4.0303 1.41584 4.125H10.5842C10.5761 4.0303 10.5666 3.94062 10.5551 3.85542C10.4875 3.35238 10.3607 3.06256 10.149 2.85095C9.93744 2.63935 9.64762 2.51251 9.14457 2.44488C8.63074 2.3758 7.95341 2.375 7 2.375H5C4.04659 2.375 3.36926 2.3758 2.85542 2.44488ZM1.375 6C1.375 5.57299 1.37516 5.20136 1.38154 4.875H10.6185C10.6248 5.20136 10.625 5.57299 10.625 6V7C10.625 7.95341 10.6242 8.63074 10.5551 9.14458C10.4875 9.64762 10.3607 9.93744 10.149 10.149C9.93744 10.3607 9.64762 10.4875 9.14457 10.5551C8.63074 10.6242 7.95341 10.625 7 10.625H5C4.04659 10.625 3.36926 10.6242 2.85542 10.5551C2.35238 10.4875 2.06256 10.3607 1.85095 10.149C1.63935 9.93744 1.51251 9.64762 1.44488 9.14458C1.3758 8.63074 1.375 7.95341 1.375 7V6Z"
          fill="url(#paint6_linear_2001_1553)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2001_1553"
          x1="6"
          y1="0.875"
          x2="6"
          y2="11.375"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2001_1553"
          x1="6"
          y1="0.875"
          x2="6"
          y2="11.375"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2001_1553"
          x1="6"
          y1="0.875"
          x2="6"
          y2="11.375"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_2001_1553"
          x1="6"
          y1="0.875"
          x2="6"
          y2="11.375"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_2001_1553"
          x1="6"
          y1="0.875"
          x2="6"
          y2="11.375"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_2001_1553"
          x1="6"
          y1="0.875"
          x2="6"
          y2="11.375"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_2001_1553"
          x1="6"
          y1="0.875"
          x2="6"
          y2="11.375"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
        <clipPath id="clip0_2001_1553">
          <rect width="12" height="12" rx="5" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CheckedIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <g clipPath="url(#clip0_352_8169)">
        <path
          d="M9.35135 5.85135C9.52221 5.6805 9.52221 5.40349 9.35135 5.23263C9.1805 5.06178 8.90349 5.06178 8.73263 5.23263L6.12533 7.83994L5.26802 6.98263C5.09716 6.81178 4.82015 6.81178 4.6493 6.98263C4.47845 7.15349 4.47845 7.4305 4.6493 7.60135L5.81597 8.76802C5.98682 8.93887 6.26383 8.93887 6.43468 8.76802L9.35135 5.85135Z"
          fill="#36BC7B"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.00033 0.729492C3.53704 0.729492 0.729492 3.53704 0.729492 7.00033C0.729492 10.4636 3.53704 13.2712 7.00033 13.2712C10.4636 13.2712 13.2712 10.4636 13.2712 7.00033C13.2712 3.53704 10.4636 0.729492 7.00033 0.729492ZM1.60449 7.00033C1.60449 4.02029 4.02029 1.60449 7.00033 1.60449C9.98036 1.60449 12.3962 4.02029 12.3962 7.00033C12.3962 9.98036 9.98036 12.3962 7.00033 12.3962C4.02029 12.3962 1.60449 9.98036 1.60449 7.00033Z"
          fill="#36BC7B"
        />
      </g>
      <defs>
        <clipPath id="clip0_352_8169">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const BackArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z"
        fill="white"
      />
    </svg>
  );
};

export const CopyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g opacity="0.7">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 2C11.7909 2 10 3.79086 10 6V8H6C3.79086 8 2 9.79086 2 12V18C2 20.2091 3.79086 22 6 22H10C12.2091 22 14 20.2091 14 18V16H18C20.2091 16 22 14.2091 22 12V6C22 3.79086 20.2091 2 18 2H14ZM14 14H18C19.1046 14 20 13.1046 20 12V6C20 4.89543 19.1046 4 18 4H14C12.8954 4 12 4.89543 12 6V8.53513C13.1956 9.22675 14 10.5194 14 12V14ZM4 12C4 10.8954 4.89543 10 6 10H10C11.1046 10 12 10.8954 12 12V18C12 19.1046 11.1046 20 10 20H6C4.89543 20 4 19.1046 4 18V12Z"
          fill="#EAF0FF"
        />
      </g>
    </svg>
  );
};

export const FilledCopyIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.7">
        <path
          d="M18 15C19.6569 15 21 13.6569 21 12V6C21 4.34315 19.6569 3 18 3H14C12.3431 3 11 4.34315 11 6V7.7H11.5C13.1569 7.7 14.5 9.04315 14.5 10.7V15H18Z"
          fill="url(#paint0_linear_395_8695)"
        />
        <path
          d="M6 9C4.34315 9 3 10.3431 3 12V18C3 19.6569 4.34315 21 6 21H10C11.6569 21 13 19.6569 13 18V12C13 10.3431 11.6569 9 10 9H6Z"
          fill="url(#paint1_linear_395_8695)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_395_8695"
          x1="12"
          y1="3"
          x2="12"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_395_8695"
          x1="12"
          y1="3"
          x2="12"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const InfoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8.09309 6.76326C8.28126 6.62213 8.3264 6.35858 8.19593 6.16288C8.04079 5.93018 7.71155 5.89758 7.5138 6.09533L7.13775 6.47138C6.8774 6.73173 6.45529 6.73173 6.19494 6.47138C5.93459 6.21104 5.93459 5.78893 6.19494 5.52858L6.57099 5.15252C7.3637 4.35981 8.68347 4.49049 9.30533 5.42327C9.82833 6.20778 9.64737 7.26421 8.89309 7.82992L8.86072 7.8542C8.73836 7.94597 8.66634 8.09 8.66634 8.24295L8.66634 8.33331C8.66634 8.7015 8.36786 8.99998 7.99967 8.99998C7.63148 8.99998 7.33301 8.7015 7.33301 8.33331L7.33301 8.24295C7.33301 7.67032 7.60261 7.13111 8.06072 6.78753L8.09309 6.76326Z"
        fill="url(#paint0_linear_316_8277)"
      />
      <path
        d="M7.33301 10.3333C7.33301 10.7015 7.63148 11 7.99967 11C8.36786 11 8.66634 10.7015 8.66634 10.3333C8.66634 9.96512 8.36786 9.66665 7.99967 9.66665C7.63148 9.66665 7.33301 9.96512 7.33301 10.3333Z"
        fill="url(#paint1_linear_316_8277)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.33301 7.99998C1.33301 4.31808 4.31778 1.33331 7.99967 1.33331C11.6816 1.33331 14.6663 4.31808 14.6663 7.99998C14.6663 11.6819 11.6816 14.6666 7.99967 14.6666C4.31778 14.6666 1.33301 11.6819 1.33301 7.99998ZM7.99967 2.66665C5.05416 2.66665 2.66634 5.05446 2.66634 7.99998C2.66634 10.9455 5.05416 13.3333 7.99967 13.3333C10.9452 13.3333 13.333 10.9455 13.333 7.99998C13.333 5.05446 10.9452 2.66665 7.99967 2.66665Z"
        fill="url(#paint2_linear_316_8277)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_316_8277"
          x1="7.99967"
          y1="1.33331"
          x2="7.99967"
          y2="14.6666"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_316_8277"
          x1="7.99967"
          y1="1.33331"
          x2="7.99967"
          y2="14.6666"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_316_8277"
          x1="7.99967"
          y1="1.33331"
          x2="7.99967"
          y2="14.6666"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const ConnectBtnIcon = () => {
  return (
    <div className="flex w-[1.5rem] h-[1.5rem] items-center justify-center rounded-[12.5rem] border-2 border-[var(--okay,#26C6FD)] shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.08),_0px_2px_4px_-2px_rgba(0,0,0,0.04)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <g clipPath="url(#clip0_2001_679)">
          <path
            d="M5.64645 8.82812C5.64645 9.02339 5.80474 9.18168 6 9.18168C6.19526 9.18168 6.35355 9.02339 6.35355 8.82813L6.35355 6.35325L8.82843 6.35325C9.02369 6.35325 9.18198 6.19496 9.18198 5.9997C9.18198 5.80444 9.02369 5.64614 8.82843 5.64614L6.35355 5.64614L6.35355 3.17127C6.35355 2.97601 6.19526 2.81772 6 2.81772C5.80474 2.81772 5.64645 2.97601 5.64645 3.17127L5.64645 5.64614L3.17157 5.64614C2.97631 5.64614 2.81802 5.80444 2.81802 5.9997C2.81802 6.19496 2.97631 6.35325 3.17157 6.35325L5.64645 6.35325L5.64645 8.82812Z"
            fill="url(#paint0_linear_2001_679)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_2001_679"
            x1="3.28171"
            y1="9.253"
            x2="6.39232"
            y2="3.6311"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2C67FF" />
            <stop offset="1" stopColor="#27C4FD" />
          </linearGradient>
          <clipPath id="clip0_2001_679">
            <rect
              width="8.48528"
              height="8.48528"
              fill="white"
              transform="translate(6 12) rotate(-135)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export const CoinIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        d="M22.5231 17.0304C24.1571 15.6341 24.8615 14.1335 24.5057 12.8057L23.5528 9.24939C23.197 7.92168 21.8367 6.97431 19.7235 6.58206C17.7491 6.21534 15.3094 6.37592 12.8644 7.03105C10.4195 7.68619 8.22632 8.76697 6.69982 10.0717C5.06585 11.4681 4.36148 12.9686 4.71724 14.2964L5.67016 17.8527C6.02592 19.1804 7.38622 20.1278 9.49944 20.52C11.4738 20.8868 13.9135 20.7262 16.3585 20.0711C18.8035 19.4159 20.9966 18.3351 22.5231 17.0304ZM16.7611 18.6759L16.1259 16.305C17.6 15.8604 19.0029 15.2249 20.2804 14.4231L20.8876 16.6896C19.7975 17.4677 18.3727 18.1703 16.7611 18.6759ZM22.1477 15.5967L21.5774 13.4681C22.036 13.0799 22.4426 12.6511 22.788 12.1908L23.0568 13.194C23.2554 13.9349 22.8986 14.7769 22.1477 15.5967ZM7.11905 17.4645L6.85084 16.4635C7.38016 16.6894 7.94665 16.8576 8.53796 16.9644L9.10833 19.093C8.04753 18.7563 7.31758 18.2054 7.11905 17.4645ZM10.7454 19.4072L10.1383 17.1415C11.6455 17.1971 13.1782 17.046 14.6772 16.694L15.3125 19.0649C13.6638 19.432 12.0786 19.536 10.7454 19.4072Z"
        fill="url(#paint0_linear_2003_1942)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2003_1942"
          x1="24.0293"
          y1="11.0276"
          x2="5.1937"
          y2="16.0745"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#26C6FD" />
          <stop offset="1" stopColor="#097AEC" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const DashboardIcon = () => {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.876953 7.99978C0.876953 4.3421 3.8421 1.37695 7.49978 1.37695C11.1574 1.37695 14.1226 4.3421 14.1226 7.99978C14.1226 11.6574 11.1574 14.6226 7.49978 14.6226C3.8421 14.6226 0.876953 11.6574 0.876953 7.99978ZM7.49978 2.32695C4.36677 2.32695 1.82695 4.86677 1.82695 7.99978C1.82695 9.47187 2.38768 10.813 3.30721 11.8213C4.19067 10.4411 5.73812 9.5249 7.50017 9.5249C9.262 9.5249 10.8093 10.4409 11.6928 11.8208C12.6121 10.8126 13.1726 9.47163 13.1726 7.99978C13.1726 4.86677 10.6328 2.32695 7.49978 2.32695ZM10.9817 12.4786C10.2839 11.2794 8.98564 10.4749 7.50017 10.4749C6.01452 10.4749 4.71618 11.2796 4.01839 12.479C4.97946 13.2271 6.18759 13.6726 7.49978 13.6726C8.81221 13.6726 10.0205 13.2269 10.9817 12.4786ZM5.14993 7.00478C5.14993 5.70691 6.20206 4.65478 7.49993 4.65478C8.7978 4.65478 9.84993 5.70691 9.84993 7.00478C9.84993 8.30265 8.7978 9.35478 7.49993 9.35478C6.20206 9.35478 5.14993 8.30265 5.14993 7.00478ZM7.49993 5.60478C6.72673 5.60478 6.09993 6.23158 6.09993 7.00478C6.09993 7.77798 6.72673 8.40478 7.49993 8.40478C8.27313 8.40478 8.89993 7.77798 8.89993 7.00478C8.89993 6.23158 8.27313 5.60478 7.49993 5.60478Z"
        fill="#CCD7F6"
        fill-opacity="0.68"
      />
    </svg>
  );
};
