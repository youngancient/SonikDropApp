import { useCallback, useEffect, useState } from "react";
import { useERC20Contract } from "../useERC20Contract";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { ethers } from "ethers";
//import { ethers } from "ethers";

export const useTokenApproval = (tokenAddress: string) => {
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  const [isApprovalLoading, setisLoadingDetails] = useState(false);

  const erc20Contract = useERC20Contract(true, tokenAddress);
  const navigate = useNavigate();
  // const errorDecoder = ErrorDecoder.create()
  const approve = useCallback(
    async (amount: string) => {
      if (!erc20Contract) {
        toast.error("Contract not found");
        return;
      }
      if (!address) {
        toast.error("Connect your wallet!");
        return;
      }

      try {
        setisLoadingDetails(true);
        // console.log("here", amount);

        const _amount = BigInt(amount);

        console.log("approve: ", _amount);

        // const estimatedGas = await erc20Contract.approve.estimateGas(
        //   import.meta.env.VITE_WILL_CONTRACT_ADDRESS,_amount
        // );
        // console.log({ estimatedGas });
        const allowance = await erc20Contract.allowance(
          address,
          import.meta.env.VITE_WILL_CONTRACT_ADDRESS
        );
        console.log("allowance: ", allowance);

        // if (BigInt(allowance) >= BigInt(amount)) {
        //   return;
        // }

        // construct transaction

        console.log("approvin in process...");

        const tx = await erc20Contract.approve(
          import.meta.env.VITE_WILL_CONTRACT_ADDRESS,
          _amount,
          {
            gasLimit: 1000000,
          }
        );
        const reciept = await tx.wait();
        if (reciept.status === 1) {
          //toast.success("Approval successful");
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setisLoadingDetails(false);
      }
    },
    [erc20Contract, address, chainId, navigate]
  );

  return { approve, isApprovalLoading };
};

export interface ITokenDetails {
  name: string;
  symbol: string;
  decimals: number;
}

// works on #Sepolia and #Kaia, but not #base n #lisk, why?
// when I switch to base, i keep getting "Chain switch error"
// when I switch to lisk, i keep getting jsonrpcprovider is disconnected

export const useTokenDetail = (tokenAddress: string) => {
  const [isLoadingDetails, setisLoadingDetails] = useState(false);
  const [tokenDetails, setTokenDetails] = useState<ITokenDetails | null>(null);
  const readOnlyERC20Contract = useERC20Contract(false, tokenAddress);

  const { chainId } = useAppKitNetwork();

  const fetchDetails = useCallback(async () => {
    if (!readOnlyERC20Contract) {
      console.log("no contract found");
      setTokenDetails(null);
      return;
    }
    if(!chainId){
      console.log("Invalid chain");
      return;
    }
    try {
      setisLoadingDetails(true);
      console.log("fetching details2...");
      const name = await readOnlyERC20Contract.name();
      const decimals = await readOnlyERC20Contract.decimals();
      const symbol = await readOnlyERC20Contract.symbol();

      console.log({ name, decimals, symbol });
      console.log("Done fetching details2...");
      
      setTokenDetails({ name, decimals, symbol });
    } catch (error) {
      setTokenDetails(null);
      console.log("Invalid Token");
      console.log(error);
    } finally {
      setisLoadingDetails(false);
    }
  }, [readOnlyERC20Contract, tokenAddress,chainId]);


  return { isLoadingDetails, tokenDetails, fetchDetails };
};


// Work on this nextUp
export const useTokenBalance = (tokenAddress : string) => {
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [isLoadingBalance, setisLoadingBalance] = useState(false);

  const { address } = useAppKitAccount();
  const readOnlyERC20Contract = useERC20Contract(false,tokenAddress);

  const fetchBalance = useCallback(async () => {
    if (!readOnlyERC20Contract) {
      setTokenBalance(null);
      return;
    }
    if (!address) {
      setTokenBalance(null);
      return;
    }
    try {
      setisLoadingBalance(true);
      const bal = await readOnlyERC20Contract.balanceOf(address);
      console.log(bal);
      setTokenBalance(bal);
    } catch (error) {
      setTokenBalance(null);
      console.log(error);
    }finally{
      setisLoadingBalance(false);
    }
  }, [readOnlyERC20Contract, address, tokenAddress]);

  useEffect(() => {
      fetchBalance();
  }, [fetchBalance, tokenAddress]);

  return { tokenBalance, isLoadingBalance };
};