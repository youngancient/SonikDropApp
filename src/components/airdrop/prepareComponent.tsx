import { ethers, Numeric } from "ethers";
import Papa from "papaparse";
import { useEffect, useState, useCallback } from "react";
import { ICSV } from "../../interfaces/CSVInterface";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setStep } from "../../store/slices/stepSlice";
import {
  selectCsvData,
  selectCsvDataError,
  selectCsvToJSONData,
  selectInvalidAirdropAddresses,
  selectTokenAddress,
  selectTokenAddressError,
  setCsvData,
  setInvalidAirdropAddresses,
  setCsvDataError,
  setCsvToJSONData,
  setShowCSVMaker,
  setTokenAddress,
  setTokenAddressError,
  setTokenDetail,
  selectTokenDetail,
} from "../../store/slices/prepareSlice";
import { moodVariant } from "../../animations/animation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { ITokenDetails, useTokenDetail } from "../../hooks/specific/useERC20";
import CsvMakerComponent from "../csvMakerComponent";

export function PrepareComponent() {

  const dispatch = useAppDispatch();

  const csvData = useAppSelector(selectCsvData);
  const tokenAddress = useAppSelector(selectTokenAddress);
  const csvToJSONData = useAppSelector(selectCsvToJSONData);
  const tokenAddressError = useAppSelector(selectTokenAddressError);
  const csvDataError = useAppSelector(selectCsvDataError);
  const invalidAirdropAddresses = useAppSelector(selectInvalidAirdropAddresses);
  

  const tokenDetail = useAppSelector(selectTokenDetail);

  const { fetchDetails } = useTokenDetail(tokenAddress);

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

          dispatch(setCsvDataError(""));

          const stringResult = results.data
            .map((result: ICSV) => {
              return `${result.address},${ethers.formatUnits(
                result.amount.toString(),
                tokenDetail.decimals as string | Numeric // Type assertion to ensure it's not null
              )}`;
            })
            .join(`\n`);

          dispatch(setCsvData(stringResult));
          dispatch(setCsvToJSONData(results.data));
        },
        header: true, // Set to true if your CSV has headers
      });
    }
  };

  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  const [isLoadingData, setIsLoadingData] = useState(false);

  const getTokenMetadata = useCallback(() => {
    setIsLoadingData(true);
    console.log("Here");
    setTimeout(() => {
      const metadata: ITokenDetails = {
        name: "TEST Token",
        symbol: "TST",
        decimals: 18,
      };
      console.log("Here2");
      dispatch(setTokenDetail(metadata));

      setIsLoadingData(false);
    }, 1200);
  }, [dispatch]);

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
    if (ethers.isAddress(tokenAddress)) {
      console.log("Valid token address detected, fetching details...");
      fetchDetails();
      getTokenMetadata();
    } else {
      dispatch(setTokenDetail(null));
    }
  }, [tokenAddress, fetchDetails, getTokenMetadata, dispatch]);

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
                // onBlur={}
                onChange={(e) => {
                  dispatch(setTokenAddress(e.target.value));
                  if (!ethers.isAddress(e.target.value)) {
                    dispatch(
                      setTokenAddressError("Kindly enter a valid token address")
                    );
                  } else {
                    dispatch(setTokenAddressError(""));
                  }
                }}
              />
              <small
                className={`${tokenAddressError ? "block text-red-400" : "hidden"
                  } mt-2`}
              >
                {tokenAddressError}
              </small>
              <small className={`${"text-gray-300"} mt-2`}>
                {isLoadingData
                  ? "Loading..."
                  : tokenDetail != null
                    ? `symbol: ${tokenDetail?.symbol} , decimal: ${tokenDetail?.decimals}`
                    : ""}
              </small>
            </div>
            <div>
              <div>List of addresses in CSV</div>
              <textarea
                className="w-full p-2 h-[200px] overflow-y-auto border-2 border-[2px] border-[#FFFFFF17] rounded-md bg-transparent"
                value={csvData}
                onChange={() => {
                  if (invalidAirdropAddresses.length > 0) {
                    toast.error(
                      invalidAirdropAddresses.join(", ") +
                      " are invalid addresses"
                    );
                  }

                  if (!csvData) {
                    dispatch(setCsvDataError("Kindly upload a csv"));
                  } else {
                    dispatch(setCsvDataError(""));
                  }
                }}
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
                    className={`${csvDataError ? "block text-red-400" : "hidden"
                      } mt-2 text-center`}
                  >
                    {csvDataError}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <button
            className={`w-full py-2 rounded-md ${isConnected
              ? "bg-[#00A7FF] text-white"
              : "border border-[#00A7FF] text-white"
              }`}
            onClick={nextPage}
          >
            {!isConnected ? "Connect Wallet" : "Continue"}
          </button>
        </div>

              <CsvMakerComponent landingTab="Tokens" />

      </motion.div>
    </AnimatePresence>
  );
}
