import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export async function fetchUserByAddress(
  dropAddress: string,
  userAddress: string
): Promise<any> {
  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const token = Cookies.get("token");
    console.log(
      `drop address -> ${dropAddress} \n user address -> ${userAddress}`
    );
    console.log(token);
    const response = await axios.get(
      `${BACKEND_URL}/users/get-user-by-address/${dropAddress.toLowerCase()}/${userAddress.toLowerCase()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    toast.error("Error fetching User proofs");
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
  }
}
