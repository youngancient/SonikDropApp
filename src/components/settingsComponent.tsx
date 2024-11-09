import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setStep } from "../store/slices/stepSlice";
import {
  selectAirdropEnd,
  selectAirdropEndMin,
  selectAirdropStart,
  selectClaimButtonDeactivated,
  selectNftAddress,
  selectNftAddressError,
  setAirdropEnd,
  setClaimButtonDeactivated,
  setNftAddress,
  setAirdropEndMin,
  selectOnlyNFTOwnersCanClaim,
  setAirdropStart,
  setNftAddressError,
  setOnlyNFTOwnersCanClaim,
} from "../store/slices/settingsSlice";
import { moodVariant } from "../animations/animation";
import { motion, AnimatePresence } from "framer-motion";

export function SettingsComponent() {
  const dispatch = useAppDispatch();

  // const [nftAddress, setNftAddress] = useState<string>("");
  // const [nftAddressError, setNftAddressError] = useState("");
  // const [claimButtonDeactivated, setClaimButtonDeactivated] =
  //   useState<boolean>(false);

  const nftAddress = useAppSelector(selectNftAddress);
  const nftAddressError = useAppSelector(selectNftAddressError);
  const claimButtonDeactivated = useAppSelector(selectClaimButtonDeactivated);
  const onlyNFTOwnersCanClaim = useAppSelector(selectOnlyNFTOwnersCanClaim);

  useEffect(() => {
    const isNftAddressValid = ethers.isAddress(nftAddress);

    // const nftOwnersCanClaim = JSON.parse(sessionStorage.getItem("settings") as string);

    if (isNftAddressValid) {
      dispatch(setNftAddressError(""));
      dispatch(setClaimButtonDeactivated(false));
      dispatch(setOnlyNFTOwnersCanClaim(true));
    } else {
      dispatch(setClaimButtonDeactivated(true));
      dispatch(setOnlyNFTOwnersCanClaim(false));
    }
  }, [nftAddress]);

  const formatDateToLocalString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const airdropStart = useAppSelector(selectAirdropStart);
  const airdropEndMin = useAppSelector(selectAirdropEndMin);
  const airdropEnd = useAppSelector(selectAirdropEnd);

  const nextPage = () => {
    sessionStorage.setItem(
      "settings",
      JSON.stringify({
        onlyNFTOwnersCanClaim,
        airdropStart,
        airdropEnd,
      })
    );

    dispatch(setStep("approve"));
  };

  useEffect(() => {
    if(airdropStart) {

      const formattedToday = formatDateToLocalString(new Date(airdropStart));
      dispatch(setAirdropEndMin(formattedToday));
    } else {
      const formattedToday = formatDateToLocalString(new Date());
      dispatch(setAirdropEndMin(formattedToday));
    }
  }, [airdropStart]);

  return (
    <AnimatePresence>
      <motion.div
        className="w-full flex justify-center items-center text-white p-2"
        initial="initial"
        animate="final"
        exit="exit"
        key="settings"
        variants={moodVariant}
      >
        <div
          className="p-4 w-full lg:w-[400px] xl:w-[600px] border-[3px] border-[#FFFFFF17] rounded-xl"
          style={{ background: "#8989890D", backdropFilter: "blur(150px)" }}
        >
          <div className="flex flex-col gap-4 my-8">
            <div>
              <div className="text-left">NFT address</div>
              <input
                className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1"
                placeholder="0x9E8882E178BD006Ef75F6b7D3C9A9EE129eb2CA8"
                value={nftAddress}
                onChange={(e) => {
                  dispatch(setNftAddress(e.target.value));
                }}
              />
              <small
                className={`${
                  nftAddressError ? "block text-red-400" : "hidden"
                } mt-2`}
              >
                {nftAddressError}
              </small>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                style={{ transform: "scale(1.5)" }}
                checked={onlyNFTOwnersCanClaim}
                // onChange={() => {
                //   if (claimButtonDeactivated == false) {
                //     dispatch(setOnlyNFTOwnersCanClaim(!onlyNFTOwnersCanClaim));
                //   }
                // }}
                onClick={() => {
                  if (claimButtonDeactivated == true) {
                    toast.error("Kindly input a valid NFT address");
                  }
                }}
              />
              <div>Only users with NFT can claim</div>
            </div>

            <div>
              <div>Airdrop duration</div>
              <div className="flex gap-4 flex-col lg:flex-row">
                <div>
                  <small>Start time and date</small>
                  <input
                    type="datetime-local"
                    min={(() => {
                      const today = new Date();
                      const formattedToday = formatDateToLocalString(today);
                      return formattedToday;
                    })()}
                    onChange={(e) => {
                      dispatch(setAirdropStart(e.target.value));
                    }}
                    value={airdropStart}
                    className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1"
                  />
                </div>

                <div>
                  <small>End time and date</small>
                  <input
                    type="datetime-local"
                    onChange={(e) => {
                      dispatch(setAirdropEnd(e.target.value));
                    }}
                    value={airdropEnd}
                    min={airdropEndMin}
                    className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1"
                  />
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
          <button
            className="w-full bg-[#00A7FF] text-white py-2 rounded-[6px]"
            onClick={nextPage}
          >
            Continue
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
