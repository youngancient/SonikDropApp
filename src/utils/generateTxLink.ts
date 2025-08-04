import { kairos } from "@reown/appkit/networks";

import { baseSepolia, sepolia, sonicBlazeTestnet, morphHolesky } from "../connection";

export const generateTxExplorerLink = (
  chainId: string | number,
  txHash: string
): string => {
  let explorerUrl = "";
  console.log("tx hash ->>>>>>", txHash);
  if (chainId === kairos.id) {
    explorerUrl += kairos.blockExplorers?.default.url;
  }
  if (chainId === sonicBlazeTestnet.id) {
    explorerUrl += sonicBlazeTestnet.blockExplorers?.default.url;
  }
  if (chainId === sepolia.id) {
    explorerUrl += sepolia.blockExplorers?.default.url;
  }
  if (chainId === baseSepolia.id) {
    explorerUrl += baseSepolia.blockExplorers?.default.url;
  }
  if (chainId === morphHolesky.id) {
    explorerUrl += morphHolesky.blockExplorers?.default.url;
  }
  return `${explorerUrl}/tx/${txHash}`;
};
