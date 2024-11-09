import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCsvToJSONData, setAirdropEnd, setAirdropStart, setCsvToJSONData, setOnlyNFTOwnersCanClaim } from "../store/slices/approveSlice";

import { leaderboardVariant } from "../animations/animation";
import { motion, AnimatePresence } from "framer-motion";
import { useClearFormInput } from "../hooks/useClearForm";

export function ApproveComponent() {

    const dispatch = useAppDispatch();

    const csvToJSONData = useAppSelector(selectCsvToJSONData);


    useEffect(() => {
        // setTokenAddress(sessionStorage.getItem("tokenAddress")  as string);
        dispatch(setCsvToJSONData(JSON.parse(sessionStorage.getItem("csvData") as string)));
        // JSON.stringify({onlyNFTOwnersCanClaim, airdropStart, airdropEnd})
        const settings = JSON.parse(localStorage.getItem("settings") as string);

        if(settings) {

          if(settings.onlyNFTOwnersCanClaim) {
            dispatch(setOnlyNFTOwnersCanClaim(settings.onlyNFTOwnersCanClaim));
          }

          if (settings.airdropStart) {
              dispatch(setAirdropStart(settings.airdropStart));
          }
  
          if(settings.airdropEnd) {
              dispatch(setAirdropEnd(settings.airdropEnd));
          }

        }

    }, []);

    const {clear} = useClearFormInput();

    const approve = () => {

        // Your code goes here

        clear();
        
  };

  return (
    <AnimatePresence>
      <motion.div
        className="w-full flex justify-center items-center text-white p-2"
        initial="initial"
        animate="final"
        exit="exit"
        key="yang"
        variants={leaderboardVariant}
      >
        <div
          className="p-4 w-full lg:w-[400px] xl:w-[600px] border-[3px] border-[#FFFFFF17] rounded-xl"
          style={{ background: "#8989890D", backdropFilter: "blur(150px)" }}
        >
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                <div className="font-bold text-white text-[20px]">LSK</div>
                <div className="text-sm text-white/[0.8]">Token Name</div>
              </div>
              <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                <div className="font-bold text-white text-[20px]">
                  {csvToJSONData
                    .reduce((accumulator: number, current: any) => {
                      return accumulator + parseFloat(current.amount);
                    }, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-white/[0.8]">
                  Total Output tokens
                </div>
              </div>
              <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                <div className="font-bold text-white text-[20px]">
                  {csvToJSONData.length}
                </div>
                <div className="text-sm text-white/[0.8]">Recipients</div>
              </div>
              <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                <div className="font-bold text-white text-[20px]">5000</div>
                <div className="text-sm text-white/[0.8]">Token balance</div>
              </div>
            </div>
            <div>
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
            </div>
          </div>
          <button
            className="w-full bg-[#00A7FF] text-white py-2 rounded-[6px]"
            onClick={approve}
          >
            Approve
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
