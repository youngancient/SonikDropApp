import { ethers } from "ethers";
import Papa from "papaparse";
import { useEffect } from "react";
import { ICSV } from "../../interfaces/CSVInterface";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setStep } from "../../store/slices/poapStepSlice";
import {
  selectCsvData,
  selectCsvDataError,
  selectCsvToJSONData,
  selectInvalidAirdropAddresses,
  setCsvData,
  setInvalidAirdropAddresses,
  setCsvDataError,
  setCsvToJSONData,
  setShowCSVMaker,
} from "../../store/slices/preparePoapSlice";
import { moodVariant } from "../../animations/animation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import CsvMakerComponent from "../csvMakerComponent";
import { generateMerkleTreeFromAddresses } from "../../utils/merkleGen";
import {
  setNoOfPoapClaimers,
  setPoapMerkleHash,
  setPoapMerkleOutput,
} from "../../store/slices/poapDropDataSlice";

export function SettingsPoapComponent() {
  const dispatch = useAppDispatch();

  const csvData = useAppSelector(selectCsvData);
  const csvToJSONData = useAppSelector(selectCsvToJSONData);
  const csvDataError = useAppSelector(selectCsvDataError);
  const invalidAirdropAddresses = useAppSelector(selectInvalidAirdropAddresses);

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

          if (invalidAddresses.length > 0) {
            toast.error(
              `${invalidAddresses
                .map((record: ICSV) => `"${record?.address}"`)
                .join(", ")}` +
                (invalidAddresses.length == 1
                  ? " is an invalid address"
                  : " are invalid addresses")
            );
            return;
          }

          const invalidAmounts = results.data.filter(
            (result: ICSV) =>
              !/^(\d+(\.\d+)?|\.\d+)$/.test(result.amount.toString())
          );

          if (invalidAmounts.length > 0) {
            toast.error(
              invalidAmounts
                .map((record: ICSV) => `"${record?.amount}"`)
                .join(", ") +
                (invalidAmounts.length == 1
                  ? " is an invalid amount"
                  : " are invalid amounts")
            );
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

    if (!csvData || invalidAirdropAddresses.length > 0) {
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

    // generate tree roothash and merkle proofs
    const { rootHash, output } = generateMerkleTreeFromAddresses(csvToJSONData);

    dispatch(setPoapMerkleHash(rootHash));
    dispatch(setPoapMerkleOutput(output));

    dispatch(setNoOfPoapClaimers(csvToJSONData.length));

    console.log({ rootHash });
    console.log({ output });

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
        invalidAirdropAddresses.join(", ") +
          (invalidAirdropAddresses.length == 1
            ? " is an invalid address"
            : " are invalid addresses")
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

        <CsvMakerComponent landingTab="POAPs" />
      </motion.div>
    </AnimatePresence>
  );
}
