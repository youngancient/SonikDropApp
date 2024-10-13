import { JsonRpcProvider } from "ethers";

export const jsonRpcProvider = new JsonRpcProvider(
    import.meta.env.VITE_LISK_SEPOLIA_RPC_URL
);
