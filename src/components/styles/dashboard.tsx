import styled from "styled-components";
import { FilterStyles } from "./claimpage";

export const DashboardStyles = styled(FilterStyles)`
  h2 {
    color: #fff;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 3.0625rem; /* 245% */
    text-align: left;
  }
  .stat-cards {
    .stat {
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
  h1 {
    color: #fff;
    font-style: normal;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 3.0625rem; /* 122.5% */
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 1.35rem;
      line-height: 1.5625rem; /* 122.5% */
    }
  }
  @media (max-width: 500px) {
    .stat-cards .stat {
      h3 {
        font-size: 1.5rem;
      }
    }
  }
`;
