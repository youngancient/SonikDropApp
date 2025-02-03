import { IAirdropList, ICSV } from "../interfaces/CSVInterface";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { BiTrash } from "react-icons/bi";
import { nanoid } from "nanoid";
import { Parser } from "@json2csv/plainjs";
import { saveAs } from "file-saver";
import { useAppDispatch, useAppSelector } from "../store/hooks";
// import { setStep } from "../store/slices/stepSlice";
import {
  selectAirdropMakerList,
  selectEligibleParticipantAddress,
  selectEligibleParticipantAmount,
  selectPowerValue,
  selectShowCSVMaker,
  setAirdropMakerList,
  setCsvData,
  setCsvToJSONData,
  setEligibleParticipantAddress,
  setEligibleParticipantAmount,
  setPowerValue,
  setShowCSVMaker,
//   selectCsvData,
//   selectCsvDataError,
//   selectCsvToJSONData,
//   selectInvalidAirdropAddresses,
//   selectTokenAddress,
//   selectTokenAddressError,
//   setCsvData,
//   setInvalidAirdropAddresses,
//   setCsvDataError,
//   setCsvToJSONData,
//   setTokenAddress,
//   setTokenAddressError,
//   setTokenDetail,
//   selectTokenDetail,
} from "../store/slices/prepareSlice";
import {
  setCsvData as setPoapCSVData,
  setCsvToJSONData as setPoapCsvToJSONData
} from "../store/slices/preparePoapSlice";
import { moodVariant, parentVariant } from "../animations/animation";
import { motion, AnimatePresence } from "framer-motion";
import { tabs } from "../constants/data";
import { useState } from "react";
import { ethers } from "ethers";
import ClickOutsideWrapper from "./outsideClick";
import { errorHandler } from "../utils/errorHandler";
import { useNavigate } from "react-router-dom";


type LandingTab = "Tokens" | "POAPs";


interface PoapInterface {
    address: string;
}

export default function CsvMakerComponent({landingTab = "Tokens"}: {landingTab?: LandingTab}) {

    const [stateTabs, setStateTabs] = useState(tabs);
    
      const [selectedTabName, setSelectedTabName] = useState(landingTab);

      const dispatch = useAppDispatch();

      const navigate = useNavigate();
    
      const handleTabSwitch = (tabName: LandingTab) => {
        setSelectedTabName(tabName);
        const newTabs = stateTabs.map((ele) => {
          return { ...ele, isSelected: ele.name === tabName };
        });
        setStateTabs(newTabs);
      };

    const airdropMakerList = useAppSelector(selectAirdropMakerList);
    const [poapMakerList, setPoapMakerList] = useState<PoapInterface[]>([]);
    //   const csvData = useAppSelector(selectCsvData);
    //   const tokenAddress = useAppSelector(selectTokenAddress);
    //   const csvToJSONData = useAppSelector(selectCsvToJSONData);
    //   const tokenAddressError = useAppSelector(selectTokenAddressError);
    //   const csvDataError = useAppSelector(selectCsvDataError);
    //   const invalidAirdropAddresses = useAppSelector(selectInvalidAirdropAddresses);

    const showCSVMaker = useAppSelector(selectShowCSVMaker);
      const eligibleParticipantAddress = useAppSelector(
        selectEligibleParticipantAddress
      );
      const eligibleParticipantAmount = useAppSelector(
        selectEligibleParticipantAmount
      );
      const powerValue = useAppSelector(selectPowerValue);

    const addEligibleParticipant = (csvType: "airdrop" | "poap") => {

      try {

        
        const isAValidAddress = ethers.isAddress(eligibleParticipantAddress);
    
        if (!isAValidAddress) {
          toast.error("Not a valid address");
          return;
        }
    
        
  
        if(csvType == "airdrop") {

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
      
          if (parseInt(powerValue) == 0) {
            toast.error("Invalid power value");
            return;
          }

            dispatch(
              setAirdropMakerList(
                airdropMakerList.concat({
                  address: eligibleParticipantAddress,
                  amount: BigInt(
                    parseFloat(eligibleParticipantAmount) *
                    10 ** parseInt(powerValue ? powerValue : "18")
                  ).toString(),
                  id: nanoid(),
                })
              )
            );
        } else if (csvType == "poap") {

          const anyDuplicate = poapMakerList.filter(
            (eligibleParticipant) =>
              eligibleParticipant.address == eligibleParticipantAddress
          );
      
          if (anyDuplicate.length > 0) {
            toast.error("You have added this address already!");
            return;
          }

            setPoapMakerList(poapMakerList.concat({
                address: eligibleParticipantAddress
            }));
        }
    
        dispatch(setEligibleParticipantAddress(""));
        dispatch(setEligibleParticipantAmount(""));
        // setPowerValue("");
      } catch (error: any) {
        if(error.message) {
          toast.error(error.message);
        }
      }
      };
    
      const deleteEligibleParticipant = (temporaryId: string, csvType: "airdrop" | "poap") => {
        if(csvType == "airdrop") {
            dispatch(
              setAirdropMakerList(
                airdropMakerList.filter(
                  (eligibleParticipant: IAirdropList) =>
                    eligibleParticipant.id != temporaryId
                )
              )
            );
        } else if (csvType == "poap") {
            setPoapMakerList(
                poapMakerList.filter((address) => temporaryId != address.address)
            );
        }
      };
    
      const downloadCSV = (csvType: "airdrop" | "poap") => {
          
          try {
              let value: unknown[]= [];
                if(csvType == "airdrop") {
        
                value = airdropMakerList.map((eligibleParticipant: IAirdropList) => {
                  return {
                    address: eligibleParticipant.address,
                    amount: eligibleParticipant.amount,
                  };
                });
            } else if(csvType == "poap") {
                value = poapMakerList.map((eligibleParticipant) => {
                    return {
                      address: eligibleParticipant.address,
                    };
                  });
            }
            
            const parser = new Parser();
            let csv = parser.parse(JSON.parse(JSON.stringify(value)));
            csv = csv.replace(/"/g, "");
            const blob = new Blob([csv], { type: "text/plain" });
            // Trigger the download
            saveAs(blob, "data.csv");
        } catch (error: unknown) {
          errorHandler(error);
          toast.error("An error occurred while trying to create CSV");
        }
      };
    
      const saveCSV = (csvType: "airdrop" | "poap") => {
        if(csvType == "airdrop") {

          const stringResult = (airdropMakerList.map(v => ({address: v.address, amount: v.amount})) as ICSV[]).map((result: ICSV) => {
                        return `${result.address},${result.amount}`;
                      })
                      .join(`\n`);

                      const jsonData = airdropMakerList.map((result) => ({
                        address: result.address,
                        amount: result.amount
                      }));

          dispatch(setCsvData(stringResult));
          dispatch(setCsvToJSONData(jsonData));
          dispatch(setShowCSVMaker(false));
          toast.success("CSV Saved Successfully");
        } else if (csvType == "poap") {
          const stringResult = poapMakerList.map((result) => {
            return `${result.address},1`;
          })
          .join(`\n`);

          const jsonData = poapMakerList.map((result) => ({
            address: result.address,
            amount: 1
          }));

          // sessionStorage.setItem("csv-from-poap", JSON.stringify(stringResult));
          dispatch(setPoapCSVData(stringResult));
          dispatch(setPoapCsvToJSONData(jsonData));
          toast.success("POAP CSV Saved Successfully! Redirecting to create POAP, please wait...");
          setTimeout(() => {
            dispatch(setShowCSVMaker(false));
            if(location.pathname != "/poap") {
              navigate("/poap");
            }
          }, 4000);
        }
      }

  return (
    <div className={`${showCSVMaker ? "block" : "hidden"}`}>
        {/* CSV Maker starts here */}
        <AnimatePresence>
          {/* {showCSVMaker && ( */}
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

                    <div className="relative text-center py-4 tabs overflow-hidden">
                      {stateTabs.map((ele) => (
                        <button key={ele.name} onClick={() => handleTabSwitch(ele.name)}>
                          <p
                            className={`z-[5] ${ele.isSelected
                              ? "text-black bg-white font-[500]"
                              : "text-white"
                              } py-2 px-4 rounded-md w-fit`}
                          >
                            {ele.name}
                          </p>
                          {/* {ele.isSelected && (
                            <motion.div
                              layoutId="slider"
                              className="absolute z-0 w-full h-full bg-[#fff] rounded-[0.4375rem]"
                            ></motion.div>
                          )} */}
                        </button>
                      ))}
                    </div>
                  {
                    selectedTabName == "Tokens" && (
                      <div>
                        <div className="flex gap-4 flex-col md:flex-row mb-4">


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
                              className="bg-transparent md:w-[50%]"
                              placeholder="Amount"
                              value={eligibleParticipantAmount}
                              onChange={(e) => {
                                dispatch(
                                  setEligibleParticipantAmount(e.target.value)
                                );
                              }}
                            />
                            <div className="flex md:w-[50%]">
                              <div className="w-[50%] text-nowrap">x 10 ^</div>
                              <input
                                type="text"
                                className="w-[50%] bg-transparent"
                                placeholder="Power"
                                value={powerValue}
                                onChange={(e) => {
                                  dispatch(setPowerValue(e.target.value));
                                }}
                              />
                            </div>
                          </div>
                          <button
                            className="bg-[#00A7FF] text-white px-4 py-2 rounded-md"
                            onClick={() => {addEligibleParticipant("airdrop")}}
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
                                            eligibleParticipant.id, "airdrop"
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
                        <div className="flex gap-2 mt-4">
                          <button
                            className="w-full bg-[#00A7FF] text-white py-2 rounded-md"
                            onClick={() => {downloadCSV("airdrop")}}
                          >
                            Download
                          </button>

                          <button
                            className="w-full border border-[#00A7FF] text-white py-2 rounded-md"
                            onClick={() => {saveCSV("airdrop")}}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )
                  }

                  {
                    selectedTabName == "POAPs" && (
                      <div>
                        <div className="flex gap-4 mb-4">

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

                          {/* <div className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1 flex">
                            <input
                              className="bg-transparent md:w-[50%]"
                              placeholder="Amount"
                              value={eligibleParticipantAmount}
                              onChange={(e) => {
                                dispatch(
                                  setEligibleParticipantAmount(e.target.value)
                                );
                              }}
                            />
                            <div className="flex md:w-[50%]">
                              <div className="w-[50%] text-nowrap">x 10 ^</div>
                              <input
                                type="text"
                                className="w-[50%] bg-transparent"
                                placeholder="Power"
                                value={powerValue}
                                onChange={(e) => {
                                  dispatch(setPowerValue(e.target.value));
                                }}
                              />
                            </div>
                          </div> */}
                          <button
                            className="bg-[#00A7FF] text-white px-4 py-2 rounded-md"
                            onClick={() => {addEligibleParticipant("poap")}}
                          >
                            Add
                          </button>
                        </div>
                        <div>
                          <div className="w-full p-2 h-[200px] overflow-y-auto border-2 border-[2px] border-[#FFFFFF17] rounded-md bg-transparent">
                            {poapMakerList.length > 0 &&
                              poapMakerList.map(
                                (
                                  eligibleParticipant,
                                  index: number
                                ) => {
                                  return (
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        <div className="pr-4">{index + 1}.</div>
                                        <div>
                                          <div>{eligibleParticipant.address}</div>
                                          {/* <div>{eligibleParticipant.amount}</div> */}
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => {
                                          deleteEligibleParticipant(
                                            eligibleParticipant.address,
                                            "poap"
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
                        <div className="flex gap-2 mt-4">
                          <button
                            className="w-full bg-[#00A7FF] text-white py-2 rounded-md"
                            onClick={() => {downloadCSV("poap")}}
                          >
                            Download
                          </button>

                          <button
                            className="w-full border border-[#00A7FF] text-white py-2 rounded-md"
                            onClick={() => {saveCSV("poap")}}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )
                  }

                </motion.div>
              </ClickOutsideWrapper>
            </motion.div>
          {/* // )} */}
        </AnimatePresence>
        {/* CSV Maker ends here */}
    </div>
  )
}
