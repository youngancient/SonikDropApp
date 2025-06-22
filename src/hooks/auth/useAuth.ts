// hooks/useAuthSignMessage.ts
import { useCallback, useState } from "react";
import { BrowserProvider, Eip1193Provider } from "ethers";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useAppDispatch } from "../../store/hooks";
import { setHasSigned } from "../../store/slices/stepSlice";

type SignInStatus = "failed" | "success" | "pending" | null;

export const useAuthSignMessage = () => {
  const { walletProvider } = useAppKitProvider("eip155");
  const { address } = useAppKitAccount();
  const dispatch = useAppDispatch();
  const [signInStatus, setSigningStatus] = useState<SignInStatus>(null);

  const onSignMessage = useCallback(async () => {
    if (!address) {
      toast.error("Please connect wallet");
      return;
    }

    const provider = new BrowserProvider(walletProvider as Eip1193Provider);
    const signer = await provider.getSigner();

    const message = `Welcome to SonikDrop! Please sign this message to authenticate.
Wallet: ${address}
Nonce: ${Math.floor(Math.random() * 1000000)}
Timestamp: ${new Date().toISOString()}
Domain: sonikdrop.app
This signature does not trigger any blockchain transaction or cost gas fees.`;

    let signature: string;
    try {
      signature = await signer.signMessage(message);
    } catch (error) {
      toast.error("Signature is required to authenticate.");
      dispatch(setHasSigned(false));
      setSigningStatus("failed");
      return;
    }

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    setSigningStatus("pending");

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/authenticate`, {
        signature,
        message,
        address,
      });

      if (response.status === 200) {
        const { data } = response.data;
        Cookies.set("token", data);
        dispatch(setHasSigned(true));
        setSigningStatus("success");
        toast.success("Signin success!");
      }
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
      dispatch(setHasSigned(false));
      Cookies.remove("token");
      setSigningStatus("failed");
    }
  }, [address, dispatch, walletProvider]);

  return {
    onSignMessage,
    signInStatus,
  };
};
