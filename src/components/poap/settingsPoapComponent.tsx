import { ethers } from "ethers";
import Papa from "papaparse";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { IAirdropList, ICSV } from "../../interfaces/CSVInterface";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { BiTrash } from "react-icons/bi";
import { nanoid } from "nanoid";
import { Parser } from "@json2csv/plainjs";
import { saveAs } from "file-saver";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setStep } from "../../store/slices/poapStepSlice";
import {
  selectAirdropMakerList,
  selectCsvData,
  selectCsvDataError,
  selectCsvToJSONData,
  selectEligibleParticipantAddress,
  selectEligibleParticipantAmount,
  selectInvalidAirdropAddresses,
  selectShowCSVMaker,
  setAirdropMakerList,
  setCsvData,
  setEligibleParticipantAddress,
  setEligibleParticipantAmount,
  setInvalidAirdropAddresses,
  setCsvDataError,
  setCsvToJSONData,
  setShowCSVMaker
} from "../../store/slices/preparePoapSlice";
import { moodVariant, parentVariant } from "../../animations/animation";
import { motion, AnimatePresence } from "framer-motion";
import ClickOutsideWrapper from "../outsideClick";
import {
  useAppKit,
  useAppKitAccount
} from "@reown/appkit/react";

export function SettingsPoapComponent() {

  const dispatch = useAppDispatch();

  const airdropMakerList = useAppSelector(selectAirdropMakerList);
  const csvData = useAppSelector(selectCsvData);
  const csvToJSONData = useAppSelector(selectCsvToJSONData);
  const csvDataError = useAppSelector(selectCsvDataError);
  const invalidAirdropAddresses = useAppSelector(selectInvalidAirdropAddresses);
  const showCSVMaker = useAppSelector(selectShowCSVMaker);
  const eligibleParticipantAddress = useAppSelector(
    selectEligibleParticipantAddress
  );
  const eligibleParticipantAmount = useAppSelector(
    selectEligibleParticipantAmount
  );

  const addEligibleParticipant = () => {
    const isAValidAddress = ethers.isAddress(eligibleParticipantAddress);

    if (!isAValidAddress) {
      toast.error("Not a valid address");
      return;
    }

    const anyDuplicate = airdropMakerList.filter(
      (eligibleParticipant) =>
        eligibleParticipant.address == eligibleParticipantAddress
    );

    if (anyDuplicate.length > 0) {
      toast.error("You have added this address already!");
      return;
    }

    if (parseFloat(eligibleParticipantAmount) == 0) {
      toast.error("Invalid amount");
      return;
    }

    dispatch(
      setAirdropMakerList(
        airdropMakerList.concat({
          address: eligibleParticipantAddress,
          amount: BigInt(
            parseFloat(eligibleParticipantAmount)).toString(),
          id: nanoid(),
        })
      )
    );

    dispatch(setEligibleParticipantAddress(""));
    dispatch(setEligibleParticipantAmount(""));
  };

  const deleteEligibleParticipant = (temporaryId: string) => {
    dispatch(
      setAirdropMakerList(
        airdropMakerList.filter(
          (eligibleParticipant: IAirdropList) =>
            eligibleParticipant.id != temporaryId
        )
      )
    );
  };

  const downloadCSV = () => {
    const value = airdropMakerList.map((eligibleParticipant: IAirdropList) => {
      return {
        address: eligibleParticipant.address,
        amount: eligibleParticipant.amount,
      };
    });

    try {
      const parser = new Parser();
      let csv = parser.parse(JSON.parse(JSON.stringify(value)));
      csv = csv.replace(/"/g, "");
      const blob = new Blob([csv], { type: "text/plain" });
      // Trigger the download
      saveAs(blob, "data.csv");
    } catch (error) {
      toast.error("An error occurred while trying to create CSV");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results: any) => {
          const invalidAddresses = results.data.filter(
            (result: ICSV) => !ethers.isAddress(result.address)
          );

          dispatch(setInvalidAirdropAddresses(invalidAddresses));

          console.log("results.data", results.data);
          console.log("IvAdd", invalidAddresses);

          if (invalidAddresses.length > 0) {
            toast.error(`${invalidAddresses.map((record: ICSV) => `"${record?.address}"`).join(", ")}` + (invalidAddresses.length == 1 ? " is an invalid address" : " are invalid addresses"));
            return;
          }


          const invalidAmounts = results.data.filter(
            (result: ICSV) => !(/^(\d+(\.\d+)?|\.\d+)$/.test(result.amount.toString()))
          );

          if(invalidAmounts.length > 0) {
            toast.error(invalidAmounts.map((record: ICSV) => `"${record?.amount}"`).join(", ") + (invalidAmounts.length == 1 ? " is an invalid amount": " are invalid amounts"));
            return;
          }

          const stringResult = results.data
            .map((result: ICSV) => {
              return `${result.address},${result.amount}`;
            })
            .join(`\n`);

          // console.log(stringResult);
          dispatch(setCsvData(stringResult));
          dispatch(setCsvToJSONData(results?.data));
        },
        header: true, // Set to true if your CSV has headers
      });
    }
  };

  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  const nextPage = async () => {
  
    if (!isConnected) {
      open();
      return;
    }

    if (
      !csvData ||
      invalidAirdropAddresses.length > 0
    ) {
      if (!csvData) {
        dispatch(setCsvDataError("Kindly upload a csv"));
        toast.error("Kindly upload a csv");
      } else {
        dispatch(setCsvDataError(""));
      }

      if (invalidAirdropAddresses.length > 0) {
        toast.error(
          invalidAirdropAddresses.join(", ") + " are invalid addresses"
        );
      }

      return;
    }

    sessionStorage.setItem(
      "csvData",
      JSON.stringify(
        JSON.parse(JSON.stringify(csvToJSONData)).map((data: ICSV) => {
          return data;
        })
      )
    );

    dispatch(setStep("approve"));
  };

  useEffect(() => {

    if (!csvData) {
      dispatch(setCsvDataError("Kindly upload a csv"));
    } else {
      dispatch(setCsvDataError(""));
    }

    if (invalidAirdropAddresses.length > 0) {
      toast.error(
        invalidAirdropAddresses.join(", ") + (invalidAirdropAddresses.length == 1 ? " is an invalid address": " are invalid addresses")
      );
    }
  }, [csvData]);

  return (
    <AnimatePresence>
      <motion.div
        className="w-full flex justify-center items-center text-white p-2"
        initial="initial"
        animate="final"
        exit="exit"
        key="ying"
        variants={moodVariant}
      >
        <div
          className="p-4 w-full lg:w-[400px] xl:w-[600px] border-[3px] border-[#FFFFFF17] rounded-xl"
          style={{ background: "#8989890D", backdropFilter: "blur(150px)" }}
        >
          <div className="flex flex-col gap-4">
            <div>
              <div>List of addresses in CSV</div>
              <textarea
                className="w-full p-2 h-[200px] overflow-y-auto border-2 border-[2px] border-[#FFFFFF17] rounded-md bg-transparent"
                value={csvData}
              ></textarea>
              <div className="flex justify-between md:items-center flex-col md:flex-row">
                <div className="text-center md:text-left">
                  Use a{" "}
                  <button
                    onClick={() => {
                      dispatch(setShowCSVMaker(true));
                    }}
                    className="text-blue-400"
                  >
                    CSV Maker
                  </button>
                </div>
                <div className="py-4">
                  <div
                    className="border-[2px] border-[#FFFFFF17] rounded-md w-full block text-center"
                    tabIndex={0}
                    role="button"
                  >
                    <input
                      className="hidden"
                      type="file"
                      accept=".csv"
                      id="upload-button"
                      onChange={handleChange}
                    />
                    <label
                      className="block w-full px-8 py-2"
                      htmlFor="upload-button"
                    >
                      Upload CSV
                    </label>
                  </div>
                  <small
                    className={`${
                      csvDataError ? "block text-red-400" : "hidden"
                    } mt-2 text-center`}
                  >
                    {csvDataError}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <button
            className={`w-full py-2 rounded-md ${
              isConnected
                ? "bg-[#00A7FF] text-white"
                : "border border-[#00A7FF] text-white"
            }`}
            onClick={nextPage}
          >
            {!isConnected ? "Connect Wallet" : "Continue"}
          </button>
        </div>

        {/* CSV Maker starts here */}
        <AnimatePresence>
          {showCSVMaker && (
            <motion.div
              className="h-screen w-full flex justify-center items-center bg-[transparent] absolute top-[0] left-[0] backdrop-blur-lg p-4"
              variants={parentVariant}
              initial="initial"
              animate="final"
            >
              <ClickOutsideWrapper
                onClickOutside={() => dispatch(setShowCSVMaker(false))}
              >
                <motion.div
                  className="w-full md:w-[600px] border-[3px] border-[#FFFFFF17] p-4 rounded-[2rem] flex flex-col gap-4 bg-[#050C19]"
                  variants={moodVariant}
                  initial="initial"
                  animate="final"
                  exit="exit"
                  key="csvmaker"
                >
                  <div>
                    <CgClose
                      className="ml-auto cursor-pointer"
                      onClick={() => {
                        dispatch(setShowCSVMaker(false));
                      }}
                    />
                  </div>
                  <div className="flex gap-4 flex-col md:flex-row">
                    <div className="w-full">
                      <input
                        className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1"
                        placeholder="Wallet address"
                        value={eligibleParticipantAddress}
                        onChange={(e) => {
                          dispatch(
                            setEligibleParticipantAddress(e.target.value)
                          );
                        }}
                      />
                    </div>

                    <div className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1 flex">
                      <input
                        className="bg-transparent md:w-full"
                        placeholder="Amount"
                        value={eligibleParticipantAmount}
                        onChange={(e) => {
                          dispatch(
                            setEligibleParticipantAmount(e.target.value)
                          );
                        }}
                      />
                    </div>
                    <button
                      className="bg-[#00A7FF] text-white px-4 py-2 rounded-md"
                      onClick={addEligibleParticipant}
                    >
                      Add
                    </button>
                  </div>
                  <div>
                    <div className="w-full p-2 h-[200px] overflow-y-auto border-2 border-[2px] border-[#FFFFFF17] rounded-md bg-transparent">
                      {airdropMakerList.length > 0 &&
                        airdropMakerList.map(
                          (
                            eligibleParticipant: IAirdropList,
                            index: number
                          ) => {
                            return (
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="pr-4">{index + 1}.</div>
                                  <div>
                                    <div>{eligibleParticipant.address}</div>
                                    <div>{eligibleParticipant.amount}</div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    deleteEligibleParticipant(
                                      eligibleParticipant.id
                                    );
                                  }}
                                >
                                  <BiTrash />
                                </button>
                              </div>
                            );
                          }
                        )}
                    </div>
                  </div>
                  <button
                    className="w-full bg-[#00A7FF] text-white py-2 rounded-md"
                    onClick={downloadCSV}
                  >
                    Download
                  </button>
                </motion.div>
              </ClickOutsideWrapper>
            </motion.div>
          )}
        </AnimatePresence>
        {/* CSV Maker ends here */}
      </motion.div>
    </AnimatePresence>
  );
}
