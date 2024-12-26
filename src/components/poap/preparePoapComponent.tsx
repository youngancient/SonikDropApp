// import { ethers, Numeric } from "ethers";
// import Papa from "papaparse";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { IPoapEvent } from "../../interfaces/CSVInterface";
import { toast } from "react-toastify";
// import { CgClose } from "react-icons/cg";
// import { BiTrash } from "react-icons/bi";
// import { nanoid } from "nanoid";
// import { Parser } from "@json2csv/plainjs";
// import { saveAs } from "file-saver";
import { useAppDispatch } from "../../store/hooks";
import { setStep } from "../../store/slices/poapStepSlice";
import { moodVariant } from "../../animations/animation";
import { motion, AnimatePresence } from "framer-motion";
// import ClickOutsideWrapper from "../outsideClick";
import {
  useAppKit,
  useAppKitAccount,
  // useAppKitNetwork,
} from "@reown/appkit/react";
// import { Alchemy, TokenMetadataResponse } from "alchemy-sdk";
// import { ethSettings } from "../../constants/chains";
import { pinata } from "../../utils/pinataConfig";
import { AiOutlinePicture } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import Joi from "joi";
// import { setTokenDetail } from "../../store/slices/prepareSlice";

export function PreparePoapComponent() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [uploadedEvnetFlyer, setUploadedEventFlyer] = useState("");

  const dispatch = useAppDispatch();

  // const airdropMakerList = useAppSelector(selectAirdropMakerList);
  // const csvData = useAppSelector(selectCsvData);
  // const tokenAddress = useAppSelector(selectTokenAddress);
  // const csvToJSONData = useAppSelector(selectCsvToJSONData);
  // const tokenAddressError = useAppSelector(selectTokenAddressError);
  // const csvDataError = useAppSelector(selectCsvDataError);
  // const invalidAirdropAddresses = useAppSelector(selectInvalidAirdropAddresses);
  // const showCSVMaker = useAppSelector(selectShowCSVMaker);
  // const eligibleParticipantAddress = useAppSelector(
  //   selectEligibleParticipantAddress
  // );
  // const eligibleParticipantAmount = useAppSelector(
  //   selectEligibleParticipantAmount
  // );
  // const powerValue = useAppSelector(selectPowerValue);

  // const tokenDetail = useAppSelector(selectTokenDetail);

  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  // const { caipNetwork } = useAppKitNetwork();

  // const alchemy = new Alchemy(ethSettings);
  // const [_isLoadingData, setIsLoadingData] = useState(false);
  // const getTokenMetadata = async (
  //   address: string
  // ): Promise<TokenMetadataResponse | null> => {
  //   try {
  //     setIsLoadingData(true);
  //     const metadata = await alchemy.core.getTokenMetadata(address);
  //     dispatch(setTokenDetail(metadata));
  //     return metadata;
  //   } catch (error) {
  //     console.error("Error fetching token metadata:", error);
  //     return null;
  //   } finally {
  //     setIsLoadingData(false);
  //   }
  // };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Send only the first accepted file to the callback
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
      }
    },
    maxSize: 2 * 1024 * 1024,
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
  });

  useEffect(() => {
    const poapEventDetails = sessionStorage.getItem("poapEventDetails");

    if (poapEventDetails) {
      const parsedPoapEventDetails: IPoapEvent = JSON.parse(poapEventDetails);

      setEventName(parsedPoapEventDetails.eventName);
      setEventDescription(parsedPoapEventDetails.eventDescription);
      setEventType(parsedPoapEventDetails.eventType);
      setSelectedFile(parsedPoapEventDetails.selectedFile);
    }
  }, []);

  const nextPage = async () => {
    // console.log(caipNetwork?.name, caipNetwork?.imageUrl, caipNetwork?.chainId);

    if (!isConnected) {
      open();
      return;
    }

    const { error } = Joi.object({
      eventName: Joi.string().required().messages({
        "any.required": "Event name is required",
        "string.base": "Event name must be a string",
      }),
      eventDescription: Joi.string().min(20).required().messages({
        "any.required": "Event details is required",
        "string.base": "Event details must be a string",
        "string.min": "Event details have to be more than 20 characters",
      }),
      eventType: Joi.string()
        .valid("conference", "meetup", "hackathon")
        .required()
        .messages({
          "any.required": "Event type is required",
          "string.valid": `Values for event type has to be either "conference", "meetup" or "hackathon"`,
        }),
      selectedFile: Joi.any().required().messages({
        "any.required": "Event picture is required",
      }),
    }).validate({
      eventName,
      eventDescription,
      eventType,
      selectedFile,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (!selectedFile) {
      toast.error("Kindly select a file to continue");
      return;
    }

    if (selectedFile!!.size > 2 * 1024 * 1024) {
      toast.error("File size is too large");
      return;
    }

    const upload = await pinata.upload.file(selectedFile!!);

    console.log("eventName", eventName);
    console.log("eventDescription", eventDescription);
    console.log("eventType", eventType);
    console.log("Picture", upload);

    sessionStorage.setItem(
      "poapEventDetails",
      JSON.stringify({
        eventName,
        eventDescription,
        eventType,
        selectedFile,
      } as IPoapEvent)
    );

    // if (tokenDetail == null) {
    //   toast.error("Token metadata is missing");
    //   return;
    // }
    // sessionStorage.setItem("tokenAddress", tokenAddress);
    // sessionStorage.setItem(
    //   "csvData",
    //   JSON.stringify(
    //     JSON.parse(JSON.stringify(csvToJSONData)).map((data: ICSV) => {
    //       console.log("Data", data.amount);
    //       if (tokenDetail?.decimals !== null) {
    //         data.amount = ethers.formatUnits(
    //           data.amount.toString(),
    //           tokenDetail.decimals
    //         );
    //       }
    //       return data;
    //     })
    //   )
    // );

    dispatch(setStep("settings"));
  };

  useEffect(() => {
    console.log("selectedFile", selectedFile);
    if (selectedFile) {
      setUploadedEventFlyer(selectedFile.name);
    }
  }, [selectedFile]);

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
              <div className="text-left">Event name</div>
              <input
                className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1"
                placeholder="Event name"
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
              />
            </div>

            <div>
              <div className="text-left">Description</div>
              <input
                className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1"
                placeholder="The event description"
                value={eventDescription}
                onChange={(e) => {
                  setEventDescription(e.target.value);
                }}
              />
            </div>

            <div>
              <div className="text-left">Event type</div>
              <select
                value={eventType}
                onChange={(e) => {
                  setEventType(e.target.value);
                }}
                className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1"
              >
                <option className="text-black" value="">
                  Select event type
                </option>
                <option className="text-black" value="conference">
                  Conference
                </option>
                <option className="text-black" value="meetup">
                  Meetup
                </option>
                <option className="text-black" value="hackathon">
                  Hackathon
                </option>
              </select>
            </div>

            <div>
              <div
                className="mb-4 w-full h-[200px] flex justify-center items-center border-dashed border-[#FFFFFF17] border-[4px] rounded-[10px] flex-col outline-none"
                {...getRootProps()}
              >
                {/* <input
                      type="file" 
                      id="file-upload" 
                      className="file-upload hidden"
                    />
                      <label htmlFor="file-upload" className="w-full h-[200px] flex justify-center items-center border-dashed border-[#FFFFFF17] border-[2px] rounded-[10px] flex-col">
                          <div>
                            <AiOutlinePicture className="w-[100px] h-[100px]" />
                          </div>
                          <div>Upload file</div>
                      </label> */}

                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="text-center flex flex-col items-center">
                    <div>
                      <AiOutlinePicture className="w-[100px] h-[100px]" />
                    </div>
                    <div>Drop here</div>
                  </div>
                ) : (
                  <div className="text-center flex flex-col items-center">
                    {uploadedEvnetFlyer ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div>{uploadedEvnetFlyer}</div>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <AiOutlinePicture className="w-[100px] h-[100px]" />
                        </div>
                        <button className="bg-[#00A7FF] px-4 py-2 rounded-[20px]">
                          Upload file
                        </button>
                      </div>
                    )}
                  </div>
                )}
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
      </motion.div>
    </AnimatePresence>
  );
}
