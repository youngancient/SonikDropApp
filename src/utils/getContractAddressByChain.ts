import { kairos } from "@reown/appkit/networks";
import { sonic } from "../connection";

export const getFactoryAddressByChain = (chainId: string | number) => {
  if (chainId === kairos.id) {
    return import.meta.env.VITE_KAIA_TOKEN_FACTORY_CONTRACT_ADDRESS;
  } else {
    return import.meta.env.VITE_TOKEN_FACTORY_CONTRACT_ADDRESS;
  }
};

export const getFactoryPOAPAddressByChain = (chainId: string | number) => {
  if (chainId === kairos.id) {
    return import.meta.env.VITE_KAIA_POAP_FACTORY_CONTRACT_ADDRESS;
  } else if (chainId == sonic.id) {
    return import.meta.env.VITE_SONIC_POAP_FACTORY_CONTRACT_ADDRESS;
  } else {
    return import.meta.env.VITE_POAP_FACTORY_CONTRACT_ADDRESS;
  }
};
