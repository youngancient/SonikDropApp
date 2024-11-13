import { Network } from "alchemy-sdk";

interface INetworkDetail{
  [key: number]: string;
}

export const supportedNetworksDetails:INetworkDetail = {
  11155111: "Sepolia",
  4202: "Lisk Sepolia",
};

// for expansion to other testnet
// 534351 : "Scroll Sepolia",
// 421614 : "Arbitrum Sepolia",
// 84532: "Base Sepolia",

// for incorporating mainnet
// 1 : "Ethereum Mainnet",
// 1135 : "Lisk Mainnet",
// 8453 : "Base Mainnet",
// 42161 : "Arbitrum One Mainnet",
// 534352 : "Scroll Mainnet",

// export const networkToLogo:INetworkDetail = {
//   11155111: "Ethereum.avif",
//   4202: "",
// }


export const ethSettings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};
export const baseSettings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.BASE_SEPOLIA,
};

export const bnbSettings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.BNB_TESTNET,
};