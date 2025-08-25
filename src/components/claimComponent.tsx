import { useEffect, useMemo, useState } from "react";
import {
  claimCardVariants,
  moodVariant,
  parentVariant,
} from "../animations/animation";
import { copyToClipboard, formatAddress } from "../utils/helpers";
import ThreeDHoverWrapper from "./3dhover";
import {
  BackArrow,
  ButtonLoader,
  CalendarIcon,
  CheckedIcon,
  CopyIcon,
  FilledCopyIcon,
  InfoIcon,
} from "./icons";
import {
  ClaimModalStyles,
  DropCompStyle,
  FlexAbsoluteModalStyles,
} from "./styles/claimpage";
import ClickOutsideWrapper from "./outsideClick";
import { AnimatePresence } from "framer-motion";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { getPoapImageFromBaseURI } from "../utils/getImageFromBaseURI";
import { useReadPoapFunctions } from "../hooks/specific/poap/useReadPoapAirdrop";
import useCalculateGasCost, {
  GasInfo,
} from "../hooks/specific/useCalculateGas";
import { IDropComp } from "../interfaces/drop";
import { usePoapDropFunctions } from "../hooks/specific/poap/usePoapAirdrop";
import { ClaimDropToastMsg } from "./customToast";
import { toast } from "react-toastify";
import { generateTxExplorerLink } from "../utils/generateTxLink";
import { useAppDispatch } from "../store/hooks";
import { updateAllPoapsAfterClaim } from "../store/slices/poapDropDataSlice";
import { ethers } from "ethers";
import { useReadTokenFunctions } from "../hooks/specific/token/useReadTokenAirdrop";
import { useTokenDropFunctions } from "../hooks/specific/token/useTokenAirdrop";
import { updateAllTokenDropsAfterClaim } from "../store/slices/tokenDropDataSlice";
import { ITokenDetails, useTokenDetail } from "../hooks/specific/useERC20";
import { ITokenClaimDetails } from "../interfaces/tokenUserClaimDetails";

export const DropComp: React.FC<IDropComp> = ({
  name,
  creator,
  creationDate,
  endDate,
  totalParticipants,
  totalRewardClaimed,
  totalRewardPool,
  nftAddress,
  totalClaims,
  contractAddress,
  isEditable,
  hasUserClaimed,
  tokenContractAddress,
}) => {
  const [showModal, setShowModal] = useState(false);
  // Calculate percentage using BigInt to handle large values
  const percentClaimed = useMemo(() => {
    try {
      const claimed = BigInt(totalRewardClaimed);
      const pool = BigInt(totalRewardPool);
      if (pool === 0n) return 0; // Avoid division by zero
      return Number((claimed * 1000n) / pool) / 10; // Multiply by 1000 for 1 decimal precision
    } catch (error) {
      console.error("Error calculating percentClaimed:", error);
      return 0;
    }
  }, [totalRewardClaimed, totalRewardPool]);

  const formattedPercent =
    percentClaimed % 1 === 0
      ? percentClaimed.toFixed(0)
      : percentClaimed.toFixed(1);

  const { address } = useAppKitAccount();

  const [gasInfo, setGasInfo] = useState<GasInfo | null>(null);
  const [isEligible, setIsEligible] = useState(false);
  const [userClaimDetails, setUserClaimDetails] =
    useState<ITokenClaimDetails | null>(null);

  const { checkTokenDropEligibility, isChecking } =
    useReadTokenFunctions(contractAddress);

  const { estimate, loadingGas } = useCalculateGasCost();

  const handleCheckEligibiltyOrView = async () => {
    if (isEditable) {
      setShowModal(true);
      return;
    }
    const { isEligible, gasToMint, claimDetails } =
      await checkTokenDropEligibility();
    if (!isEligible) {
      setShowModal(true);
      return;
    }
    if (!gasToMint) {
      setShowModal(true);
      return;
    }
    setUserClaimDetails(claimDetails);
    setIsEligible(isEligible); // user is eligible
    const gasData = await estimate(gasToMint);
    setGasInfo(gasData);
    setShowModal(true);
  };

  if (!tokenContractAddress) return;

  const { fetchDetailsWithoutRedux, isLoadingDetails } =
    useTokenDetail(tokenContractAddress);
  const [tokenDetails, setTokenDetails] = useState<ITokenDetails | null>(null);

  useEffect(() => {
    const fetchDeet = async () => {
      if (!tokenContractAddress) {
        setTokenDetails(null);
        return;
      }
      try {
        const details = await fetchDetailsWithoutRedux();
        setTokenDetails(details);
      } catch (error) {
        console.error("Error fetching token details:", error);
        setTokenDetails(null);
      }
    };
    fetchDeet();
  }, [tokenContractAddress, fetchDetailsWithoutRedux]);

  return (
    <>
      <ThreeDHoverWrapper>
        <DropCompStyle
          className="w-full h-full"
          variants={claimCardVariants}
          initial="initial"
          viewport={{ once: true }}
          whileInView="final"
        >
          <div className="top">
            <div className="one">
              <div className="deet flex gap-[0.5rem]">
                <div className="img w-[2.5rem] h-[2.5rem]">
                  <img
                    src="/avatar.svg"
                    className="w-full h-full"
                    alt="random image"
                  />
                </div>
                <div className="flex flex-col">
                  <h4>{name}</h4>
                  <p>{formatAddress(creator)}</p>
                </div>
              </div>
              <div className="mt-[0.75rem] blu">
                <p>{totalParticipants.toLocaleString()} Participants</p>
              </div>
            </div>
            <div className="two flex justify-between gap-[1rem] flex-wrap">
              <div className="">
                <p className="">Reward Pool</p>
                {isLoadingDetails ? (
                  <ButtonLoader />
                ) : (
                  <h3>
                    {tokenDetails
                      ? ethers.formatUnits(
                          totalRewardPool,
                          tokenDetails.decimals
                        )
                      : "N/A"}{" "}
                    {tokenDetails?.symbol || ""}
                  </h3>
                )}
              </div>
              <div>
                <p>{endDate ? "ENDING DATE" : "CREATION DATE"}</p>
                <div className="flex items-center gap-[0.625rem] justify-end">
                  <CalendarIcon />
                  <h3>{endDate || creationDate}</h3>
                </div>
              </div>
            </div>

            <div className="three">
              <div
                className={`rounded-md h-[0.75rem] flex items-center gap-[0.25rem] ${
                  parseInt(formattedPercent) !== 100
                    ? "bg-[#283245]"
                    : "bg-[rgba(157,211,175,0.28)] p-[0.25rem]"
                }`}
              >
                {parseInt(formattedPercent) !== 100 && (
                  <div
                    className="rounded-md inner h-[0.75rem] flex items-center justify-end pr-[0.75rem]"
                    style={{
                      width: `${formattedPercent}%`,
                    }}
                  >
                    {parseInt(formattedPercent) > 80 &&
                      parseInt(formattedPercent) !== 100 && (
                        <p className="mini">{formattedPercent}%</p>
                      )}
                  </div>
                )}
                {parseInt(formattedPercent) < 80 && (
                  <p className="tiny">{formattedPercent}%</p>
                )}
                {parseInt(formattedPercent) === 100 && (
                  <>
                    <CheckedIcon />
                    <p className="text-completed">Completed</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="btn">
            <button
              onClick={handleCheckEligibiltyOrView}
              disabled={!isEditable && (hasUserClaimed || isChecking)}
              className={`px-4 py-2 rounded text-white font-medium transition
    ${!isEditable && hasUserClaimed ? "cursor-not-allowed" : ""}
    ${!isEditable && (isChecking || loadingGas) ? "opacity-60 cursor-wait" : ""}
  `}
              style={
                !isEditable && hasUserClaimed
                  ? { backgroundColor: "#244b36" }
                  : undefined
              }
            >
              {!isEditable && (isChecking || loadingGas) ? (
                <ButtonLoader />
              ) : !isEditable && hasUserClaimed ? (
                "Claimed!"
              ) : isEditable ? (
                "View Airdrop"
              ) : (
                "Check Eligibility"
              )}
            </button>
          </div>
        </DropCompStyle>
      </ThreeDHoverWrapper>
      <AnimatePresence>
        {showModal && (
          <ClaimModal
            {...{
              name,
              creator,
              creationDate,
              endDate,
              totalParticipants,
              totalRewardClaimed,
              totalRewardPool,
              nftAddress,
              totalClaims,
              contractAddress,
              type: "token",
              isCreator:
                creator.toLowerCase() === address?.toLowerCase() && isEditable,
            }}
            closeModal={() => setShowModal(false)}
            gasInfo={gasInfo}
            isEligible={isEligible}
            tokenDetails={tokenDetails}
            userClaimDetails={userClaimDetails}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export const POAPDropComp: React.FC<IDropComp> = ({
  name,
  creator,
  creationDate,
  endDate,
  totalParticipants,
  totalRewardClaimed,
  totalRewardPool,
  totalClaims,
  contractAddress,
  isEditable,
  baseURI,
  hasUserClaimed,
}) => {
  const [showModal, setShowModal] = useState(false);

  // Calculate percentage using BigInt to handle large values safely
  const percentClaimed = useMemo(() => {
    try {
      const claimed = BigInt(totalRewardClaimed);
      const pool = BigInt(totalRewardPool);
      if (pool === 0n) return 0; // Avoid division by zero
      return Number((claimed * 1000n) / pool) / 10; // Multiply by 1000 for 1 decimal precision
    } catch (error) {
      console.error("Error calculating percentClaimed:", error);
      return 0;
    }
  }, [totalRewardClaimed, totalRewardPool]);

  const formattedPercent =
    percentClaimed % 1 === 0
      ? percentClaimed.toFixed(0)
      : percentClaimed.toFixed(1);

  const { address } = useAppKitAccount();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [gasInfo, setGasInfo] = useState<GasInfo | null>(null);
  const [isEligible, setIsEligible] = useState(false);

  const [userPoapClaimDetails, setUserPoapClaimDetails] = useState<
    string[] | null
  >(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!baseURI) {
        setImageUrl(null);
        return;
      }
      try {
        const image = await getPoapImageFromBaseURI(baseURI);

        setImageUrl(image || null);
      } catch (error) {
        console.error("Error fetching POAP image:", error);
        setImageUrl(null);
      }
    };
    fetchImage();
  }, [baseURI]);

  const { checkEligibility, isChecking } =
    useReadPoapFunctions(contractAddress);
  const { estimate, loadingGas } = useCalculateGasCost();

  const handleCheckEligibiltyOrView = async () => {
    if (isEditable) {
      setShowModal(true);
      return;
    }
    const { isEligible, gasToMint, claimDetails } = await checkEligibility();
    if (!isEligible) {
      setShowModal(true);
      return;
    }
    if (!gasToMint) {
      setShowModal(true);
      return;
    }
    setUserPoapClaimDetails(claimDetails);
    setIsEligible(isEligible); // user is eligible
    const gasData = await estimate(gasToMint);
    setGasInfo(gasData);
    setShowModal(true);
  };

  return (
    <>
      <ThreeDHoverWrapper>
        <DropCompStyle
          className="w-full h-full"
          variants={claimCardVariants}
          initial="initial"
          viewport={{ once: true }}
          whileInView="final"
        >
          <div className="poap-img">
            <img
              src={imageUrl ?? "/poap.avif"}
              className="w-full h-full"
              alt="POAP image"
            />
          </div>
          <div className="top">
            <div className="one">
              <div className="deet flex gap-[0.5rem]">
                <div className="img w-[2.5rem] h-[2.5rem]">
                  <img
                    src="/avatar.svg"
                    className="w-full h-full"
                    alt="random image"
                  />
                </div>
                <div className="flex flex-col">
                  <h4>{name}</h4>
                  <p>{formatAddress(creator)}</p>
                </div>
              </div>
              <div className="mt-[0.75rem] blu">
                <p>{totalParticipants.toLocaleString()} Participants</p>
              </div>
            </div>
            <div className="two flex justify-between gap-[1rem] flex-wrap">
              <div className="">
                <p className="">Reward Pool</p>
                <h3>
                  {" "}
                  {totalRewardPool === "0"
                    ? "0"
                    : Number(totalRewardPool).toLocaleString() || "N/A"}
                </h3>
              </div>
              <div>
                <p>{endDate ? "ENDING DATE" : "CREATION DATE"}</p>
                <div className="flex items-center gap-[0.625rem] justify-end">
                  <CalendarIcon />
                  <h3>{endDate || creationDate}</h3>
                </div>
              </div>
            </div>

            <div className="three">
              <div
                className={`rounded-md h-[0.75rem] flex items-center gap-[0.25rem] ${
                  parseInt(formattedPercent) !== 100
                    ? "bg-[#283245]"
                    : "bg-[rgba(157,211,175,0.28)] p-[0.25rem]"
                }`}
              >
                {parseInt(formattedPercent) !== 100 && (
                  <div
                    className="rounded-md inner h-[0.75rem] flex items-center justify-end pr-[0.75rem]"
                    style={{
                      width: `${percentClaimed}%`,
                    }}
                  >
                    {parseInt(formattedPercent) > 80 &&
                      parseInt(formattedPercent) !== 100 && (
                        <p className="mini">{percentClaimed}%</p>
                      )}
                  </div>
                )}
                {parseInt(formattedPercent) < 80 && (
                  <p className="tiny">{formattedPercent}%</p>
                )}
                {parseInt(formattedPercent) === 100 && (
                  <>
                    <CheckedIcon />
                    <p className="text-completed">Completed</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="btn">
            <button
              onClick={handleCheckEligibiltyOrView}
              disabled={!isEditable && (hasUserClaimed || isChecking)}
              className={`px-4 py-2 rounded text-white font-medium transition
    ${!isEditable && hasUserClaimed ? "cursor-not-allowed" : ""}
    ${!isEditable && (isChecking || loadingGas) ? "opacity-60 cursor-wait" : ""}
  `}
              style={
                !isEditable && hasUserClaimed
                  ? { backgroundColor: "#244b36" }
                  : undefined
              }
            >
              {!isEditable && (isChecking || loadingGas) ? (
                <ButtonLoader />
              ) : !isEditable && hasUserClaimed ? (
                "Claimed!"
              ) : isEditable ? (
                "View POAP"
              ) : (
                "Check Eligibility"
              )}
            </button>
          </div>
        </DropCompStyle>
      </ThreeDHoverWrapper>
      <AnimatePresence>
        {showModal && (
          <ClaimModal
            {...{
              name,
              creator,
              creationDate,
              endDate,
              totalParticipants,
              totalRewardClaimed,
              totalRewardPool,
              totalClaims,
              contractAddress,
              type: "poap",
              isCreator:
                creator.toLowerCase() === address?.toLowerCase() && isEditable,
            }}
            closeModal={() => setShowModal(false)}
            poapImg={imageUrl ?? undefined}
            gasInfo={gasInfo}
            isEligible={isEligible}
            userClaimDetails={userPoapClaimDetails}
          />
        )}
      </AnimatePresence>
    </>
  );
};

interface IClaimModal extends IDropComp {
  closeModal: () => void;
  type: "token" | "poap";
  isCreator?: boolean;
  poapImg?: string;
  gasInfo: GasInfo | null;
  isEligible: boolean;
  tokenDetails?: ITokenDetails | null;
  userClaimDetails: ITokenClaimDetails | string[] | null;
}
export const ClaimModal: React.FC<IClaimModal> = ({
  closeModal,
  contractAddress,
  name,
  creator,
  nftAddress,
  creationDate,
  endDate,
  totalParticipants,
  totalRewardClaimed,
  totalRewardPool,
  totalClaims,
  type,
  isCreator,
  poapImg,
  isEligible,
  gasInfo,
  tokenDetails,
  userClaimDetails,
}) => {
  // Calculate participant percentage, always returning a string
  const participantPercentClaimed = useMemo((): string => {
    if (totalParticipants === 0) return "0"; // Return string "0" to avoid type mismatch
    const percentage = (totalClaims * 100) / totalParticipants;
    return percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(1);
  }, [totalClaims, totalParticipants]);

  // Calculate reward percentage using BigInt for large values
  const rewardPercentageClaimed = useMemo(() => {
    try {
      const claimed = BigInt(totalRewardClaimed);
      const pool = BigInt(totalRewardPool);
      if (pool === 0n) return 0; // Avoid division by zero
      return Number((claimed * 1000n) / pool) / 10; // 1 decimal precision
    } catch (error) {
      console.error("Error calculating rewardPercentageClaimed:", error);
      return 0;
    }
  }, [totalRewardClaimed, totalRewardPool]);

  const formattedRewardPercent =
    rewardPercentageClaimed % 1 === 0
      ? rewardPercentageClaimed.toFixed(0)
      : rewardPercentageClaimed.toFixed(1);

  const { mintPoap, isMinting } = usePoapDropFunctions(contractAddress);
  const { claimTokenDrop, isClaiming } = useTokenDropFunctions(contractAddress);
  const { chainId } = useAppKitNetwork();

  const [isCreatorAddressCopied, setIsCreatorAddressCopied] = useState(false);
  const [isNftAddressCopied, setIsNftAddressCopied] = useState(false);

  // Reset copied states after 3 seconds
  useEffect(() => {
    if (isCreatorAddressCopied || isNftAddressCopied) {
      const timer = setTimeout(() => {
        setIsCreatorAddressCopied(false);
        setIsNftAddressCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isCreatorAddressCopied, isNftAddressCopied]);

  const popMsg = (txHash: string, msg: string) => {
    if (!chainId) {
      return;
    }
    const url = generateTxExplorerLink(chainId, txHash);

    toast((props) => <ClaimDropToastMsg {...props} />, {
      data: {
        text: msg,
        url: url,
      },
    });
  };

  useEffect(() => {
    console.log(userClaimDetails, tokenDetails);
  }, []);
  const dispatch = useAppDispatch();

  const handleClaim = async (dropType: "token" | "poap") => {
    if (dropType === "token") {
      // handle token claim
      console.log("claim the token drop");
      if (!userClaimDetails || Array.isArray(userClaimDetails)) {
        toast.error("invalid claim details!");
        return;
      }
      const { success, transactionHash, amountClaimed } = await claimTokenDrop(
        userClaimDetails
      );

      if (!success || !transactionHash || !amountClaimed) {
        toast.error("Token claim failed");
        return;
      }
      dispatch(
        updateAllTokenDropsAfterClaim({ contractAddress, amountClaimed })
      );
      popMsg(transactionHash, "Claimed Successfully");
      closeModal();
    } else if (dropType === "poap") {
      // handle poap claim
      console.log("mint the poap");
      if (!Array.isArray(userClaimDetails)) {
        toast.error("Invalid claim details!");
        return;
      }
      const { success, transactionHash } = await mintPoap(userClaimDetails);

      if (!success) {
        return;
      }
      if (!transactionHash) {
        return;
      }
      dispatch(updateAllPoapsAfterClaim(contractAddress));

      popMsg(transactionHash, "Minted Successfully");
      closeModal();
    }
  };
  const editAirdrop = (dropType: "token" | "poap") => {
    if (dropType === "token") {
      // handle edit token airdrop
    } else if (dropType === "poap") {
      // handle edit poap airdrop
    }
  };
  const endAirdrop = (dropType: "token" | "poap") => {
    if (dropType === "token") {
      // handle token airdrop end
    } else if (dropType === "poap") {
      // handle poap airdrop end
    }
  };

  // Format reward values
  const formattedPool =
    type === "token" && tokenDetails
      ? ethers.formatUnits(totalRewardPool, tokenDetails.decimals)
      : totalRewardPool === "0"
      ? "0"
      : Number(totalRewardPool).toLocaleString() || "N/A";
  const formattedClaimed =
    type === "token" && tokenDetails
      ? ethers.formatUnits(totalRewardClaimed, tokenDetails.decimals)
      : totalRewardClaimed === "0"
      ? "0"
      : Number(totalRewardClaimed).toLocaleString() || "N/A";

  return (
    <FlexAbsoluteModalStyles
      variants={parentVariant}
      initial="initial"
      animate="final"
    >
      <ClaimModalStyles
        key="inoske"
        variants={moodVariant}
        initial="initial"
        animate="final"
        exit="exit"
      >
        <ClickOutsideWrapper onClickOutside={closeModal}>
          <div className="modal overflow-y-auto max-h-[80vh] w-full max-w-[90vw] mx-auto px-4">
            <BackButton action={closeModal} />
            {type === "token" && (
              <div className="reward-pool flex flex-col items-center justify-center w-full">
                <p>Reward Pool</p>
                <h1>
                  {formattedPool}
                  {tokenDetails?.symbol || ""}
                </h1>
              </div>
            )}
            {type === "poap" && (
              <div className="poap-img h-[12.625rem] md:h-[11.25rem] w-full rounded-[0.625rem]">
                <img
                  src={poapImg ?? "/poap.avif"}
                  className="w-full h-full rounded-[0.625rem]"
                  alt="POAP image"
                />
              </div>
            )}
            <div className="flex flex-col gap-[1rem] w-full">
              <div className="deet flex gap-[0.5rem]">
                <div className="img w-[2.5rem] h-[2.5rem]">
                  <img
                    src="/avatar.svg"
                    className="w-full h-full"
                    alt="random image"
                  />
                </div>
                <div className="flex flex-col">
                  <h4>{name}</h4>
                  <p>{formatAddress(creator)}</p>
                </div>
              </div>
              <div className="cards flex gap-[1rem] justify-between items-stretch">
                <div className="flex flex-col rounded-md bg-[#1E2430] gap-[0.625rem] p-[1rem] w-full">
                  <div className="flex flex-col">
                    <p>No Of Recipients</p>
                    <h4>{totalParticipants.toLocaleString()}</h4>
                  </div>
                  <div
                    className={`rounded-md h-[0.75rem] flex items-center gap-[0.25rem] ${
                      parseInt(participantPercentClaimed) !== 100
                        ? "bg-[#283245]"
                        : "bg-[rgba(157,211,175,0.28)] p-[0.25rem]"
                    }`}
                  >
                    {parseInt(participantPercentClaimed) !== 100 && (
                      <div
                        className="rounded-md inner h-[0.75rem] flex items-center justify-end pr-[0.75rem]"
                        style={{
                          width: `${participantPercentClaimed}%`,
                        }}
                      >
                        {parseInt(participantPercentClaimed) > 80 &&
                          parseInt(participantPercentClaimed) !== 100 && (
                            <p className="mini">{participantPercentClaimed}%</p>
                          )}
                      </div>
                    )}
                    {parseInt(participantPercentClaimed) < 80 && (
                      <p className="tiny">{participantPercentClaimed}%</p>
                    )}
                    {parseInt(participantPercentClaimed) === 100 && (
                      <>
                        <CheckedIcon />
                        <p className="text-completed">Completed</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col rounded-md bg-[#1E2430] gap-[0.625rem] p-[1rem] w-full">
                  <div className="flex flex-col">
                    <p>Rewards Claimed</p>
                    <h4>
                      {formattedClaimed}
                      {type === "token" && tokenDetails?.symbol}
                    </h4>
                  </div>
                  {isCreator && (
                    <div
                      className={`rounded-md h-[0.75rem] flex items-center gap-[0.25rem] ${
                        parseInt(formattedRewardPercent) !== 100
                          ? "bg-[#283245]"
                          : "bg-[rgba(157,211,175,0.28)] p-[0.25rem]"
                      }`}
                    >
                      {parseInt(formattedRewardPercent) !== 100 && (
                        <div
                          className="rounded-md inner h-[0.75rem] flex items-center justify-end pr-[0.75rem]"
                          style={{
                            width: `${rewardPercentageClaimed}%`,
                          }}
                        >
                          {parseInt(formattedRewardPercent) > 80 &&
                            parseInt(formattedRewardPercent) !== 100 && (
                              <p className="mini">{formattedRewardPercent}%</p>
                            )}
                        </div>
                      )}
                      {parseInt(formattedRewardPercent) < 80 && (
                        <p className="tiny">{formattedRewardPercent}%</p>
                      )}
                      {parseInt(formattedRewardPercent) === 100 && (
                        <>
                          <CheckedIcon />
                          <p className="text-completed">Completed</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="addy flex items-center justify-between gap-[1rem]">
                <div className="flex flex-col w-[70%]">
                  <h4>Creator Address</h4>
                  <p className="break-words">{creator}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={() =>
                      copyToClipboard(creator, () =>
                        setIsCreatorAddressCopied(true)
                      )
                    }
                  >
                    {isCreatorAddressCopied ? <FilledCopyIcon /> : <CopyIcon />}
                  </button>
                </div>
              </div>
              {nftAddress && (
                <div className=" addy flex items-center justify-between">
                  <div className="flex flex-col w-[70%]">
                    <h4>NFT Address</h4>
                    <p className="break-words">{nftAddress}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <button
                      onClick={() =>
                        copyToClipboard(nftAddress, () =>
                          setIsNftAddressCopied(true)
                        )
                      }
                    >
                      {isNftAddressCopied ? <FilledCopyIcon /> : <CopyIcon />}
                    </button>
                  </div>
                </div>
              )}
              {nftAddress && (
                <div className="required flex items-center gap-[0.25rem]">
                  <InfoIcon />
                  <p>NFT is required to claim Airdrop</p>
                </div>
              )}
              {tokenDetails && (
                <div className="flex items-stretch justify-between gap-[1rem]">
                  <div className="flex flex-col addy">
                    <h4>Token Name</h4>
                    <div className="flex items-center gap-[0.25rem]">
                      <p className="whitespace-normal">{tokenDetails.name}</p>
                    </div>
                  </div>
                  <div className="flex flex-col addy">
                    <h4>Token Symbol</h4>
                    <div className="flex items-center justify-end gap-[0.25rem]">
                      <p className="whitespace-normal">{tokenDetails.symbol}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-stretch justify-between gap-[1rem]">
                <div className="flex flex-col addy">
                  <h4>{endDate ? "End Date" : "Creation Date"}</h4>
                  <div className="flex items-center gap-[0.25rem]">
                    <CalendarIcon />
                    <p className="whitespace-normal">
                      {endDate ? endDate : creationDate}
                    </p>
                  </div>
                </div>
                {isEligible &&
                  type === "token" &&
                  userClaimDetails &&
                  tokenDetails && (
                    <div className="flex flex-col addy">
                      <h4>Your Allocation</h4>
                      <div className="flex items-center justify-end gap-[0.25rem]">
                        <p className="whitespace-normal">
                          {typeof userClaimDetails === "object" &&
                          userClaimDetails !== null &&
                          "amount" in userClaimDetails
                            ? ethers.formatUnits(
                                userClaimDetails.amount,
                                tokenDetails.decimals
                              ) + tokenDetails.symbol
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  )}
                {isEligible && type === "poap" && userClaimDetails && (
                  <div className="flex flex-col addy">
                    <h4>Your Allocation</h4>
                    <div className="flex items-center justify-end gap-[0.25rem]">
                      <p className="whitespace-normal">{"1"}</p>
                    </div>
                  </div>
                )}
              </div>
              {!isCreator && (
                <div className=" addy flex items-center justify-between w-full">
                  <div className="flex items-center justify-between w-full">
                    <h4>Estimated Gas Fee</h4>
                    {gasInfo ? (
                      <p className="break-words">
                        {gasInfo.nativeWithToken} &asymp; {gasInfo.usd}
                      </p>
                    ) : (
                      <p className="break-words">N/A</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {!isCreator && (
              <div className="btn flex w-full justify-center items-center gap-[1rem]">
                <button
                  onClick={() => handleClaim(type)}
                  disabled={!isEligible || isMinting || isClaiming}
                  className={`transition
                  ${!isEligible ? "bg-red-500 cursor-not-allowed" : ""}
                  ${isMinting || (isClaiming && "opacity-60 cursor-wait")}`}
                >
                  {isMinting ? (
                    <ButtonLoader />
                  ) : isClaiming ? (
                    <ButtonLoader />
                  ) : !isEligible ? (
                    "Not Eligible!"
                  ) : type === "token" ? (
                    "Claim Airdrop"
                  ) : (
                    "Mint POAP"
                  )}
                </button>
              </div>
            )}
            {isCreator && (
              <div className="btn flex w-full justify-between items-center gap-[1rem]">
                <button onClick={() => editAirdrop(type)}>
                  {type === "token" ? "Edit Airdrop" : "Edit POAP"}
                </button>
                <button onClick={() => endAirdrop(type)} className="second-btn">
                  {type === "token" ? "End Airdrop" : "End POAP"}
                </button>
              </div>
            )}
          </div>
        </ClickOutsideWrapper>
      </ClaimModalStyles>
    </FlexAbsoluteModalStyles>
  );
};

interface IFunctionComp {
  action: () => void;
}
export const BackButton: React.FC<IFunctionComp> = ({ action }) => {
  return (
    <button onClick={action} className="flex items-center gap-[0.25rem]">
      <BackArrow />
      <p>Back</p>
    </button>
  );
};
