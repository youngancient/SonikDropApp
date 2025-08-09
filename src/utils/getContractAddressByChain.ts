import { kairos } from "@reown/appkit/networks";
import { sonicBlazeTestnet, morphHolesky } from "../connection";

export const getFactoryAddressByChain = (chainId: string | number) => {
  if (chainId === kairos.id) {
    return import.meta.env.VITE_KAIA_TOKEN_FACTORY_CONTRACT_ADDRESS;
  } else if (chainId === morphHolesky.id) {
    return import.meta.env.VITE_MORPH_TOKEN_FACTORY_ADDRESS;
  } else {
    return import.meta.env.VITE_TOKEN_FACTORY_CONTRACT_ADDRESS;
  }
};

export const getFactoryPOAPAddressByChain = (chainId: string | number) => {
  if (chainId === kairos.id) {
    return import.meta.env.VITE_KAIA_POAP_FACTORY_CONTRACT_ADDRESS;
  } else if (chainId === morphHolesky.id) {
    return import.meta.env.VITE_MORPH_POAP_FACTORY_ADDRESS;
  } else {
    return import.meta.env.VITE_POAP_FACTORY_CONTRACT_ADDRESS;
  }
};

export const getMulticallAddressByChain = (chainId: string | number) => {
  if (chainId === sonicBlazeTestnet.id) {
    return import.meta.env.VITE_SONIC_BLAZE_MULTICALL3_ADDRESS;
  } else {
    return import.meta.env.VITE_MULTICALL3_ADDRESS;
  }
};
