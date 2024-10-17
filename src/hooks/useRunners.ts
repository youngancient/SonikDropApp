import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Eip1193Provider, JsonRpcSigner } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { jsonRpcProvider } from "../constants/provider";

const useRunners = () => {
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const { walletProvider } = useAppKitProvider<Eip1193Provider>("eip155");

  const provider = useMemo(
    () => (walletProvider ? new BrowserProvider(walletProvider) : null),
    [walletProvider]
  );

  useEffect(() => {
    if (!provider) return;
    provider.getSigner().then((newSigner) => {
      if (!signer) return setSigner(newSigner);
      if (newSigner.address === signer.address) return;
      setSigner(newSigner);
    });
  }, [provider, signer]);
  return { provider, signer, readOnlyProvider: jsonRpcProvider };
};

export default useRunners;
