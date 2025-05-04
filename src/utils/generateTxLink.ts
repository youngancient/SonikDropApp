import {
  kairos,
  liskSepolia,
} from "@reown/appkit/networks";
import { baseSepolia, sepolia, sonic } from "../connection";

export const generateTxExplorerLink = (
  chainId: string | number,
  txHash: string
): string => {
  let explorerUrl = "";
  if (chainId === kairos.id) {
    explorerUrl += kairos.blockExplorers?.default.url;
  }

  if (chainId === sonic.id) {
    explorerUrl += sonic.blockExplorers?.default.url;
  }
  if (chainId === sepolia.id) {
    explorerUrl += sepolia.blockExplorers?.default.url;
  }
  if (chainId === baseSepolia.id) {
    explorerUrl += baseSepolia.blockExplorers?.default.url;
  }
  return `${explorerUrl}/tx/${txHash}`;
};
