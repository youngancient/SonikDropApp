import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export function SettingsComponent() {

  const [nftAddress, setNftAddress] = useState("");
  const [nftAddressError, setNftAddressError] = useState("");
  const [claimButtonDeactivated, setClaimButtonDeactivated] = useState<boolean>(false);

  useEffect(() => {

    const isNftAddressValid = ethers.isAddress(nftAddress);

    if (isNftAddressValid) {
      setNftAddressError("");
      setClaimButtonDeactivated(false);
    } else {
      setNftAddressError("Kindly enter a valid nft address");
      setClaimButtonDeactivated(true);
    }

  }, [nftAddress]);

  const [onlyNFTOwnersCanClaim, setOnlyNFTOwnersCanClaim] = useState(false);

    const [airdropStart, setAirdropStart] = useState("");
    const [airdropEnd, setAirdropEnd] = useState("");

  const navigate = useNavigate();

  const nextPage = () => {

    const isNftAddressValid = ethers.isAddress(nftAddress);

    if (!isNftAddressValid) {
      toast("Invalid token address");
      return;
    }

    localStorage.setItem("settings", JSON.stringify({
        onlyNFTOwnersCanClaim, airdropStart, airdropEnd
    }));
    navigate("/approve");
  }

  return (
    <div className="w-full flex justify-center items-center text-white p-2">
      <div
        className="p-4 w-full lg:w-[400px] xl:w-[600px] border-[3px] border-[#FFFFFF17] rounded-xl"
        style={{ background: "#8989890D", backdropFilter: "blur(150px)" }}
      >
        <div className="flex flex-col gap-4 my-8">
          {/* <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                            <div className="font-bold text-white text-[20px]">LSK</div>
                            <div className="text-sm text-white/[0.8]">Token Name</div>
                        </div>
                        <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                            <div className="font-bold text-white text-[20px]">{(csvToJSONData.reduce((accumulator: number, current: any) => {
                                return accumulator + parseFloat(current.amount);
                            }, 0)).toLocaleString()}</div>
                            <div className="text-sm text-white/[0.8]">Total Output tokens</div>
                        </div>
                        <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                            <div className="font-bold text-white text-[20px]">{csvToJSONData.length}</div>
                            <div className="text-sm text-white/[0.8]">Recipients</div>
                        </div>
                        <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                            <div className="font-bold text-white text-[20px]">5000</div>
                            <div className="text-sm text-white/[0.8]">Token balance</div>
                        </div>
                    </div> */}
          
          <div>
                        <div className="text-left">NFT address</div>
                        <input className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1" placeholder="0x9E8882E178BD006Ef75F6b7D3C9A9EE129eb2CA8" value={nftAddress} onChange={(e) => {setNftAddress(e.target.value)}} />
                        <small className={`${nftAddressError ? "block text-red-400" : "hidden"} mt-2`}>{nftAddressError}</small>
                    </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" checked={onlyNFTOwnersCanClaim} onChange={() => {setOnlyNFTOwnersCanClaim(!onlyNFTOwnersCanClaim)}} disabled={claimButtonDeactivated} />
            <div>Only users with NFT can claim</div>
          </div>

          <div>
            <div>Airdrop duration</div>
            <div className="flex gap-4">
              <div>
                <small>Start time and date</small>
                <input type="datetime-local" onChange={(e) => {setAirdropStart(e.target.value)}} value={airdropStart} className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1" />
              </div>

              <div>
                <small>Start time and date</small>
                <input type="datetime-local" onChange={(e) => {setAirdropEnd(e.target.value)}} value={airdropEnd} className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1" />
              </div>
            </div>
          </div>

          {/* <div>
            <div className="mt-4">List of recipients</div>
            <div className="mb-8 h-[200px] overflow-y-auto p-2">
              {csvToJSONData.map((recepients: any, index: number) => {
                return (
                  <div className="flex flex-col md:flex-row justify-between border-b-2 border-b-[#D0D5DD] py-4">
                    <div>
                      {index + 1}. {recepients.address}
                    </div>
                    <div>{recepients.amount}</div>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
        <button className="w-full bg-[#00A7FF] text-white py-2 rounded-[6px]" onClick={nextPage}>
          Continue
        </button>
      </div>
    </div>
  );
}
