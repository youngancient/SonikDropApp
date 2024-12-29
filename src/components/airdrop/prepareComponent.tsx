import { ethers, Numeric } from "ethers";
import Papa from "papaparse";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { IAirdropList, ICSV } from "../../interfaces/CSVInterface";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { BiTrash } from "react-icons/bi";
import { nanoid } from "nanoid";
import { Parser } from "@json2csv/plainjs";
import { saveAs } from "file-saver";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setStep } from "../../store/slices/stepSlice";
import {
  selectAirdropMakerList,
  selectCsvData,
  selectCsvDataError,
  selectCsvToJSONData,
  selectEligibleParticipantAddress,
  selectEligibleParticipantAmount,
  selectInvalidAirdropAddresses,
  selectPowerValue,
  selectShowCSVMaker,
  selectTokenAddress,
  selectTokenAddressError,
  setAirdropMakerList,
  setCsvData,
  setEligibleParticipantAddress,
  setEligibleParticipantAmount,
  setInvalidAirdropAddresses,
  setCsvDataError,
  setCsvToJSONData,
  setPowerValue,
  setShowCSVMaker,
  setTokenAddress,
  setTokenAddressError,
  setTokenDetail,
  selectTokenDetail,
} from "../../store/slices/prepareSlice";
import { moodVariant, parentVariant } from "../../animations/animation";
import { motion, AnimatePresence } from "framer-motion";
import ClickOutsideWrapper from "../outsideClick";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { Alchemy, TokenMetadataResponse } from "alchemy-sdk";
import { ethSettings } from "../../constants/chains";
import { useTokenDetail } from "../../hooks/specific/useERC20";

export function PrepareComponent() {
  //   const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const airdropMakerList = useAppSelector(selectAirdropMakerList);
  const csvData = useAppSelector(selectCsvData);
  const tokenAddress = useAppSelector(selectTokenAddress);
  const csvToJSONData = useAppSelector(selectCsvToJSONData);
  const tokenAddressError = useAppSelector(selectTokenAddressError);
  const csvDataError = useAppSelector(selectCsvDataError);
  const invalidAirdropAddresses = useAppSelector(selectInvalidAirdropAddresses);
  const showCSVMaker = useAppSelector(selectShowCSVMaker);
  const eligibleParticipantAddress = useAppSelector(
    selectEligibleParticipantAddress
  );
  const eligibleParticipantAmount = useAppSelector(
    selectEligibleParticipantAmount
  );
  const powerValue = useAppSelector(selectPowerValue);

  const tokenDetail = useAppSelector(selectTokenDetail);

  const { fetchDetails } =
    useTokenDetail(tokenAddress); 

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

    dispatch(setEligibleParticipantAddress(""));
    dispatch(setEligibleParticipantAmount(""));
    // setPowerValue("");
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
      // console.log(error);
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
          const invalidAddresses = results.data.filter((result: ICSV) => {
            console.log(
              result.address,
              " valid ",
              ethers.isAddress(result.address)
            );
            return ethers.isAddress(result.address) == false;
          });

          dispatch(setInvalidAirdropAddresses(invalidAddresses));

          console.log("Invalid", invalidAddresses);

          if (invalidAddresses.length > 0) {
            toast.error(
              invalidAddresses
                .map((a: ICSV) => a.address.toString())
                .join(", ") +
                (invalidAddresses.length == 1
                  ? " is an invalid address"
                  : " are invalid addresses")
            );
            return;
          }

          if (tokenDetail?.decimals == null) {
            toast.error("Token metadata is missing");
            return;
          }

          const invalidAmounts = results.data.filter(
            (result: ICSV) =>
              !/^(\d+(\.\d+)?|\.\d+)$/.test(result.amount.toString())
          );

          if (invalidAmounts.length > 0) {
            toast.error(
              invalidAmounts.map((a: ICSV) => a.amount).join(", ") +
                (invalidAmounts.length == 1
                  ? " is an invalid amount"
                  : " are invalid amounts")
            );
            return;
          }

          const stringResult = results.data
            .map((result: ICSV) => {
              return `${result.address},${ethers.formatUnits(
                result.amount.toString(),
                tokenDetail.decimals as string | Numeric // Type assertion to ensure it's not null
              )}`;
            })
            .join(`\n`);

          // console.log(stringResult);
          dispatch(setCsvData(stringResult));
          dispatch(setCsvToJSONData(results.data));
        },
        header: true, // Set to true if your CSV has headers
      });
    }
  };

  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  const alchemy = new Alchemy(ethSettings);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const getTokenMetadata = async (
    address: string
  ): Promise<TokenMetadataResponse | null> => {
    try {
      setIsLoadingData(true);
      const metadata = await alchemy.core.getTokenMetadata(address);
      dispatch(setTokenDetail(metadata));
      // if (!metadata) {
      // }
      return metadata;
    } catch (error) {
      console.error("Error fetching token metadata:", error);
      return null;
    } finally {
      setIsLoadingData(false);
    }
  };
  const nextPage = async () => {
    const isTokenAddressValid = ethers.isAddress(tokenAddress);
    if (!isConnected) {
      open();
      return;
    }
    if (
      !isTokenAddressValid ||
      !csvData ||
      invalidAirdropAddresses.length > 0
    ) {
      if (!isTokenAddressValid) {
        dispatch(setTokenAddressError("Kindly enter a valid token address"));
        toast.error("Kindly enter a valid token address");
      } else {
        dispatch(setTokenAddressError(""));
      }
      if (!csvData) {
        dispatch(setCsvDataError("Kindly upload a csv"));
        toast.error("Kindly upload a csv");
      } else {
        dispatch(setCsvDataError(""));
      }

      if (invalidAirdropAddresses.length > 0) {
        console.log(invalidAirdropAddresses);
        toast.error(
          invalidAirdropAddresses.join(", ") + " are invalid addresses"
        );
      }

      return;
    }

    if (tokenDetail == null) {
      toast.error("Token metadata is missing");
      return;
    }
    sessionStorage.setItem("tokenAddress", tokenAddress);
    sessionStorage.setItem(
      "csvData",
      JSON.stringify(
        JSON.parse(JSON.stringify(csvToJSONData)).map((data: ICSV) => {
          console.log("Data", data.amount);
          if (tokenDetail?.decimals !== null) {
            data.amount = ethers.formatUnits(
              data.amount.toString(),
              tokenDetail.decimals
            );
          }
          return data;
        })
      )
    );

    dispatch(setStep("settings"));
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadata = await getTokenMetadata(tokenAddress);
      if (metadata) {
        console.log("Token Metadata:", metadata);
        if (metadata.decimals == null) {
          dispatch(setTokenAddressError("Kindly enter a valid token address"));
          return;
        }

        // Process the metadata as needed
      } else {
        toast.error("Failed to fetch token metadata.");
      }
    };
    const isTokenAddressValid = ethers.isAddress(tokenAddress);

    if (!isTokenAddressValid) {
      dispatch(setTokenAddressError("Kindly enter a valid token address"));
    } else {
      fetchMetadata();
      dispatch(setTokenAddressError(""));
    }

    if (!csvData) {
      dispatch(setCsvDataError("Kindly upload a csv"));
    } else {
      dispatch(setCsvDataError(""));
    }

    if (invalidAirdropAddresses.length > 0) {
      toast.error(
        invalidAirdropAddresses.join(", ") + " are invalid addresses"
      );
    }
  }, [csvData, tokenAddress]);

  useEffect(() => {
    if (ethers.isAddress(tokenAddress)) {
      console.log("Valid token address detected, fetching details...");
      fetchDetails();
    }
  }, [tokenAddress, fetchDetails]);

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
              <div className="text-left">Token address</div>
              <input
                className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1"
                placeholder="0x9E8882E178BD006Ef75F6b7D3C9A9EE129eb2CA8"
                value={tokenAddress}
                onChange={(e) => {
                  dispatch(setTokenAddress(e.target.value));
                }}
              />
              <small
                className={`${
                  tokenAddressError ? "block text-red-400" : "text-gray-300"
                } mt-2`}
              >
                {isLoadingData
                  ? "Loading..."
                  : tokenAddressError
                  ? tokenAddressError
                  : `symbol: ${tokenDetail?.symbol} , decimal: ${tokenDetail?.decimals}`}
              </small>
            </div>
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
                      onClick={(e) => {
                        if (!ethers.isAddress(tokenAddress)) {
                          e.preventDefault();
                          toast.error("Enter Token address first!");
                          return;
                        }
                      }}
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
