import { CaipNetwork, createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import {
  sepolia as rawSepolia,
  baseSepolia as rawBaseSepolia,
  liskSepolia as rawLiskSepolia,
  kairos as rawKairos,
  electroneumTestnet as rawElectroneumTestnet
} from "@reown/appkit/networks";

export const sepolia: CaipNetwork = {
  ...rawSepolia,
  id: 11155111,
  chainNamespace: "eip155",
  caipNetworkId: "eip155:11155111",
};

export const baseSepolia: CaipNetwork = {
  ...rawBaseSepolia,
  id: 84532,
  chainNamespace: "eip155",
  caipNetworkId: "eip155:84532",
};

export const liskSepoliaNetwork:CaipNetwork = {
  ...rawLiskSepolia,
  id: 4202,
  chainNamespace: "eip155",
  caipNetworkId: "eip155:4202",
}

export const kairos:CaipNetwork = {
  ...rawKairos,
  id: 1001,
  chainNamespace: "eip155",
  caipNetworkId: "eip155:1001",
}

export const electroneumTestNetwork:CaipNetwork = {
  ...rawElectroneumTestnet,
  id: 5201420,
  chainNamespace: "eip155",
  caipNetworkId: "eip155:5201420",
}

// add for Sonic chain

// 1. Get projectId
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;

// 2. Set the networks
const networks: [CaipNetwork, ...CaipNetwork[]] = [
  sepolia,
  baseSepolia,
  electroneumTestNetwork,
  liskSepoliaNetwork,
  kairos,
];

// 3. Create a metadata object - optional
const metadata = {
  name: "SonikDrop",
  description: "Swift & Cheap Airdrop as a service tool",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create a AppKit instance
export const appkit = createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  allowUnsupportedChain: false,
  allWallets: "SHOW",
  defaultNetwork: kairos,
  enableEIP6963: true,
  features: {
    analytics: true,
    allWallets: true,
    email: false,
    socials: [],
  },
});
appkit.switchNetwork(kairos);
