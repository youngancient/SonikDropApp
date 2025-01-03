import { useEffect, useState } from "react";
import { IPoapEvent } from "../../interfaces/CSVInterface";
import { toast } from "react-toastify";

import { useAppDispatch } from "../../store/hooks";
import { setStep } from "../../store/slices/poapStepSlice";
import { moodVariant } from "../../animations/animation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

import { pinata } from "../../utils/pinataConfig";
import { AiOutlinePicture } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import Joi from "joi";
import { ButtonLoader } from "../icons";

export function PreparePoapComponent() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [uploadedEvnetFlyer, setUploadedEventFlyer] = useState("");

  const [eventNameError, setEventNameError] = useState("");
  const [eventDescriptionError, setEventDescriptionError] = useState("");
  const [eventTypeError, setEventTypeError] = useState("");
  const [eventFlyerError, setEventFlyerError] = useState("");

  const [isNextLoading, setNextLoading] = useState(false);

  const dispatch = useAppDispatch();

  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();

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

  // The useEffect code below fetches and updates the poap details
  // if there's any that was previously saved.
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
    if (!isConnected) {
      open();
      return;
    }

    try {
      // The code below validates the input object using the object schema
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
            "string.valid": `Pls select a valid event type"`,
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

      setNextLoading(true);

      // Throws an toast message if there is an error
      if (error) {
        toast.error(error.message);
        return;
      }

      // Checks if there is no selected file
      if (!selectedFile) {
        toast.error("Kindly select a file to continue");
        return;
      }

      // Checks if the selected file is above 2MB
      if (selectedFile!!.size > 2 * 1024 * 1024) {
        toast.error(
          "File size is too large. File size should be less than or equal to 2MB"
        );
        return;
      }

      const upload = await pinata.upload.file(selectedFile!!);

      // console.log("eventName", eventName);
      // console.log("eventDescription", eventDescription);
      // console.log("eventType", eventType);
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

      dispatch(setStep("settings"));
    } catch (error) {
      console.log(error);
    } finally {
      setNextLoading(false);
    }
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
                onBlur={() => {
                  const { error } = Joi.string()
                    .required()
                    .messages({
                      "any.required": "Event name is required",
                      "string.base": "Event name must be a string",
                      "string.empty": "Event name can not be empty",
                    })
                    .validate(eventName);
                  if (error) {
                    setEventNameError(error.message);
                  } else {
                    setEventNameError("");
                  }
                }}
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
              />
              <small
                className={`${
                  eventNameError ? "block text-red-400" : "hidden"
                } mt-2`}
              >
                {eventNameError}
              </small>
            </div>

            <div>
              <div className="text-left">Description</div>
              <input
                className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1"
                placeholder="The event description"
                value={eventDescription}
                onBlur={() => {
                  const { error } = Joi.string()
                    .min(20)
                    .required()
                    .messages({
                      "any.required": "Event details is required",
                      "string.base": "Event details must be a string",
                      "string.min":
                        "Event details have to be more than 20 characters",
                      "string.empty": "Event name can not be empty",
                    })
                    .validate(eventDescription);

                  if (error) {
                    setEventDescriptionError(error.message);
                  } else {
                    setEventDescriptionError("");
                  }
                }}
                onChange={(e) => {
                  setEventDescription(e.target.value);
                }}
              />
              <small
                className={`${
                  eventDescriptionError ? "block text-red-400" : "hidden"
                } mt-2`}
              >
                {eventDescriptionError}
              </small>
            </div>

            <div>
              <div className="text-left">Event type</div>
              <select
                value={eventType}
                onBlur={() => {
                  const { error } = Joi.string()
                    .valid("conference", "meetup", "hackathon")
                    .required()
                    .messages({
                      "any.required": "Event type is required",
                      "any.only": `Please select a valid Event type"`,
                    })
                    .validate(eventType);

                  if (error) {
                    setEventTypeError(error.message);
                  } else {
                    setEventTypeError("");
                  }
                }}
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
              <small
                className={`${
                  eventTypeError ? "block text-red-400" : "hidden"
                } mt-2`}
              >
                {eventTypeError}
              </small>
            </div>

            <div>
              <div
                className="mb-4 w-full h-[200px] flex justify-center items-center border-dashed border-[#FFFFFF17] border-[4px] rounded-[10px] flex-col outline-none"
                {...getRootProps()}
              >
                <input
                  {...getInputProps()}
                  onBlur={() => {
                    const { error } = Joi.any()
                      .required()
                      .messages({
                        "any.required": "Event picture is required",
                      })
                      .validate(uploadedEvnetFlyer);

                    if (error) {
                      setEventFlyerError(error.message);
                    } else {
                      setEventFlyerError("");
                    }
                  }}
                />
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
                <small
                  className={`${
                    eventFlyerError ? "block text-red-400" : "hidden"
                  } mt-2`}
                >
                  {eventFlyerError}
                </small>
              </div>
            </div>
          </div>
          <button
            disabled={isNextLoading}
            className={`w-full py-2 rounded-md ${
              isConnected
                ? "bg-[#00A7FF] text-white"
                : "border border-[#00A7FF] text-white"
            }`}
            onClick={nextPage}
          >
            {!isConnected ? (
              "Connect Wallet"
            ) : isNextLoading ? (
              <ButtonLoader />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
