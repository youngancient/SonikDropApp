import {
  electroneumTestnet,
  kairos,
  liskSepolia,
} from "@reown/appkit/networks";
import { baseSepolia, sepolia } from "../connection";

export const generateTxExplorerLink = (
  chainId: string | number,
  txHash: string
): string => {
  let explorerUrl = "";
  if (chainId === kairos.id) {
    explorerUrl += kairos.blockExplorers?.default.url;
  }

  if (chainId === electroneumTestnet.id) {
    explorerUrl += electroneumTestnet.blockExplorers?.default.url;
  }
  if (chainId === liskSepolia.id) {
    explorerUrl += liskSepolia.blockExplorers?.default.url;
  }
  if (chainId === sepolia.id) {
    explorerUrl += sepolia.blockExplorers?.default.url;
  }
  if (chainId === baseSepolia.id) {
    explorerUrl += baseSepolia.blockExplorers?.default.url;
  }
  return `${explorerUrl}tx/${txHash}`;
};
