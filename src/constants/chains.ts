interface INetworkDetail {
  [key: number]: string;
}

export const supportedNetworksDetails: INetworkDetail = {
  11155111: "Sepolia",
  4202: "Lisk Sepolia",
};

export const nativeTokenMap: Record<number, { name: string; token: string }> = {
  1: { name: "ethereum", token: "ETH" }, // mainnet
  11155111: { name: "ethereum", token: "ETH" }, // testnet
  84532: { name: "base", token: "ETH" }, // testnet (example)
  57054: { name: "sonic-3", token: "S" }, // testnet
  1001: { name: "kaia", token: "KAIA" }, // testnet
};

// for expansion to other testnet
// 534351 : "Scroll Sepolia",
// 421614 : "Arbitrum Sepolia",
// 84532: "Base Sepolia",

// for incorporating mainnet
// 1 : "Ethereum Mainnet",
// 8453 : "Base Mainnet",
// 42161 : "Arbitrum One Mainnet",
// 534352 : "Scroll Mainnet",

// export const networkToLogo:INetworkDetail = {
//   11155111: "Ethereum.avif",
//   4202: "",
// }

export interface IChains {
  name: string;
  id: number;
  logo: string;
}
export const supportedNetworks: IChains[] = [
  {
    name: "Base Sepolia",
    id: 84532,
    logo: "Base.png",
  },
  {
    name: "Kaia Testnet",
    id: 1001,
    logo: "kaia.png",
  },
  {
    name: "Sepolia",
    id: 11155111,
    logo: "Ethereum.avif",
  },

  {
    name: "Sonic Testnet",
    id: 57054,
    logo: "sonic_chain.webp",
  }

];

// {
//   name: "BNB",
//   id: 56,
//   logo: "BNB.avif",
// },
// {
//   name: "Optimism",
//   id: 10,
//   logo: "Optimism.avif",
// },
// {
//   name: "Arbitrum",
//   id: 42161,
//   logo: "Arbitrum.svg",
// },
// {
//   name: "Polygon",
//   id: 137,
//   logo: "Polygon.avif",
// },