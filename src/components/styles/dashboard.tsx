import styled from "styled-components";

export const DashboardStyles = styled.div`
  h2 {
    color: #fff;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 3.0625rem; /* 245% */
  }
  .cards {
    div {
      border-radius: 0.625rem;
      background: rgba(133, 136, 145, 0.3);
      p {
        color: #babcd2;
        font-size: 0.625rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.25rem; /* 200% */
        letter-spacing: 0.0625rem;
        text-transform: uppercase;
      }
      h3 {
        color: #fff;
        font-feature-settings: "liga" off, "clig" off;
        font-size: 2.5rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.3125rem; /* 52.5% */
      }
    }
  }
  .quick button {
    background: rgba(255, 255, 255, 0.07);
  }
  .create p {
    background: var(
      --coughs,
      linear-gradient(164deg, #2c67ff -21.47%, #27c4fd 88.84%)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2rem; /* 228.571% */
    letter-spacing: -0.02rem;
  }
  @media (max-width: 500px) {
    .cards div {
      h3 {
        font-size: 1.5rem;
      }
    }
  }
`;
