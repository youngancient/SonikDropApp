import { useEffect, useState } from "react";

import { moodVariant } from "../../animations/animation";
import { motion, AnimatePresence } from "framer-motion";
import { useClearFormInput } from "../../hooks/useClearForm";
import { ButtonLoader } from "../icons";
import { CompletedModal } from "../completedModal";
import { ICSV, IPoapEvent } from "../../interfaces/CSVInterface";

export function ApprovePoapComponent() {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");

  const [csvToJSONData, setCSVToJSONData] = useState<ICSV[]>([]);

  const [isLoadingBal, _setLoadingBal] = useState(false);

  const [estimatedGasFee, _setEstimatedGasFee] = useState(0.05);

  useEffect(() => {
    const csvData: ICSV[] = JSON.parse(
      sessionStorage.getItem("csvData") as any
    );

    setCSVToJSONData(csvData);

    const poapEventDetails = sessionStorage.getItem("poapEventDetails");

    if (poapEventDetails) {
      const parsedPoapEventDetails: IPoapEvent = JSON.parse(poapEventDetails);

      setEventName(parsedPoapEventDetails.eventName);
      setEventType(parsedPoapEventDetails.eventType);
    }
  }, []);

  const { clear } = useClearFormInput();
  const [showModal, setShowModal] = useState(false);

  const approve = () => {
    // call contract
    setTimeout(() => {
      setShowModal(true);
    }, 1200);

    clear();
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="w-full flex justify-center items-center text-white p-2"
          initial="initial"
          animate="final"
          exit="exit"
          key="yang"
          variants={moodVariant}
        >
          <div
            className="p-4 w-full lg:w-[400px] xl:w-[600px] border-[3px] border-[#FFFFFF17] rounded-xl"
            style={{ background: "#8989890D", backdropFilter: "blur(150px)" }}
          >
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                  <div className="font-bold text-white text-[20px]">
                    {eventName}
                  </div>
                  <div className="text-sm text-white/[0.8]">POAP Name</div>
                </div>
                <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                  <div className="font-bold text-white break-words overflow-hidden text-[20px] ">
                    {eventType[0]?.toLocaleUpperCase() + eventType?.slice(1)}
                  </div>
                  <div className="text-sm text-white/[0.8]">POAP Type</div>
                </div>
                <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                  <div className="font-bold text-white text-[20px]">
                    {csvToJSONData.length}
                  </div>
                  <div className="text-sm text-white/[0.8]">Recipients</div>
                </div>
                <div className="border-2 border-[#FFFFFF17] bg-transparent rounded-lg p-4">
                  <div className="font-bold text-white text-[20px]">
                    {isLoadingBal ? (
                      <ButtonLoader />
                    ) : (
                      `$${estimatedGasFee.toFixed(2)}`
                    )}
                  </div>
                  <div className="text-sm text-white/[0.8]">Gas Estimate</div>
                </div>
              </div>
              <div>
                <div className="mt-4">List of recipients</div>
                <div className="mb-8 h-[200px] overflow-y-auto p-2">
                  {csvToJSONData.map((recepients: any, index: number) => {
                    return (
                      <div className="flex items-start border-b-solid border-b-[1px] border-b-[#D0D5DD] py-4 gap-2 min-w-max w-full">
                        <p>{index + 1}.</p>
                        <div className="flex flex-col gap-2">
                          <p className="text-white truncate">
                            Address: {recepients.address}
                          </p>
                          <p className="text-white">
                            Amount: {recepients.amount}
                          </p>
                        </div>
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
      {showModal && <CompletedModal />}
    </>
  );
}
