import styled from "styled-components";

export const NavModalStyles = styled.div`
  border-radius: 2rem;
  border: 1px solid var(--kk, #fff);
  background: #151f5f;
  width: 68%;
  display: flex;
  padding: 2.125rem 1.5rem 2.75rem 1.5rem;
  .img {
    border-radius: 0.625rem;
    background: rgba(255, 255, 255, 0.07);
  }
  h1 {
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
    text-align: center;
    font-size: 3rem;
    font-style: normal;
    font-weight: 500;
    line-height: 3.25rem; /* 108.333% */
  }
  p {
    color: #ececfb;
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.395rem; /* 139.5% */
  }
  .btn {
    button {
      border-radius: 1.5rem;
      background: #01a7ff;
      box-shadow: 0px 4px 6.8px 0px #2b75ff inset;
      padding: 0.625rem;
      cursor: pointer;
    }
  }
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: rgba(
      255,
      255,
      255,
      0.07
    ); /* Background of the scrollbar track */
    border-radius: 0.625rem; /* Rounded edges for the track */
  }
  &::-webkit-scrollbar-thumb {
    background: #5a9bd6;
    border-radius: 1rem;
    box-shadow: 0px 4px 6.8px rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #2b75ff; /* Change color on hover */
  }
  @media (max-width: 500px) {
    width: 91%;
    padding: 1rem 0.5rem 2.75rem 0.5625rem;
    h1 {
      font-size: 2rem;
      line-height: 2.375rem;
    }
  }
  @media (min-width: 998px) {
    width: 40%;
  }
`;
