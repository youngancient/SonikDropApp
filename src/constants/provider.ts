import { JsonRpcProvider } from "ethers";

export const jsonRpcProvider = new JsonRpcProvider(
    import.meta.env.VITE_KAIA_TESTNET_RPC_URL
);

