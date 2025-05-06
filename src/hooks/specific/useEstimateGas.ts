import { useCallback, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useAppKitNetwork } from "@reown/appkit/react";
import useRunners from "../useRunners";
import { nativeTokenMap } from "../../constants/chains";

interface GasInfo {
  native: string;
  usd: string;
  nativeWithToken: string;
}

const useEstimateGasCost = () => {
  const { provider } = useRunners();
  const { chainId } = useAppKitNetwork();
  const [loadingGas, setLoadingGas] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [gasInfo, setGasInfo] = useState<GasInfo>({
    native: "",
    usd: "",
    nativeWithToken: "",
  });

  const estimate = useCallback(
    async (gas: bigint) => {
      if (!provider || !chainId) return;
      setLoadingGas(true);
      setError(null);

      try {
        const feeData = await provider.getFeeData();
        const gasPrice = feeData.gasPrice ?? ethers.parseUnits("1", "gwei");
        const gasCostWei = gas * gasPrice;
        const gasCostNativeRaw = ethers.formatEther(gasCostWei);
        const gasCostNativeAprox = Number(gasCostNativeRaw).toFixed(4);

        const coingeckoTokenId = nativeTokenMap[Number(chainId)]?.name;
        if (!coingeckoTokenId)
          throw new Error(`Unsupported chainId: ${chainId}`);

        const res = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoTokenId}&vs_currencies=usd`
        );
        const usdRate = res.data[coingeckoTokenId]?.usd ?? 0;
        const gasCostUsd = (parseFloat(gasCostNativeRaw) * usdRate).toFixed(4);

        const nativeTokenSymbol = nativeTokenMap[Number(chainId)]?.token;
        const gasCostNativeWithToken = `${gasCostNativeAprox}${nativeTokenSymbol}`;

        setGasInfo({
          native: gasCostNativeAprox,
          usd: `$${gasCostUsd}`,
          nativeWithToken: gasCostNativeWithToken,
        });
      } catch (err: any) {
        setError(err.message || "Failed to estimate gas cost");
      } finally {
        setLoadingGas(false);
      }
    },
    [provider, chainId]
  );

  return { estimate, loadingGas, error, gasInfo };
};

export default useEstimateGasCost;
