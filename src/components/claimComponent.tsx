import { useState } from "react";
import {
  claimCardVariants,
  moodVariant,
  parentVariant,
} from "../animations/animation";
import { copyToClipboard, formatAddress } from "../utils/helpers";
import ThreeDHoverWrapper from "./3dhover";
import {
  BackArrow,
  CalendarIcon,
  CheckedIcon,
  CopyIcon,
  InfoIcon,
} from "./icons";
import {
  ClaimModalStyles,
  DropCompStyle,
  FlexAbsoluteModalStyles,
} from "./styles/claimpage";
import ClickOutsideWrapper from "./outsideClick";
import { AnimatePresence } from "framer-motion";

export interface IDropComp {
  name: string;
  creator: string; //address
  date?: string;
  totalRewardPool: number;
  totalRewardClaimed: number;
  totalParticipants: number;
  totalClaims: number;
  nftAddress?: string;
  // img ?: string; havent figure how best to get this
}

export const DropComp: React.FC<IDropComp> = ({
  name,
  creator,
  date,
  totalParticipants,
  totalRewardClaimed,
  totalRewardPool,
  nftAddress,
  totalClaims,
}) => {
  const [showModal, setShowModal] = useState(false);
  const percentageRaw = (totalRewardClaimed * 100) / totalRewardPool;
  const [percentClaimed] = useState(
    percentageRaw % 1 === 0
      ? percentageRaw.toFixed(0)
      : percentageRaw.toFixed(1)
  );

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
                <h3>{totalRewardPool.toLocaleString()}ETH</h3>
              </div>
              <div>
                <p>ENDING DATE</p>
                <div className="flex items-center gap-[0.625rem] justify-end">
                  <CalendarIcon />
                  <h3>{date ? date : "none"}</h3>
                </div>
              </div>
            </div>

            <div className="three">
              <div
                className={`rounded-md h-[0.75rem] flex items-center gap-[0.25rem] ${
                  parseInt(percentClaimed) !== 100
                    ? "bg-[#283245]"
                    : "bg-[rgba(157,211,175,0.28)] p-[0.25rem]"
                }`}
              >
                {parseInt(percentClaimed) !== 100 && (
                  <div
                    className="rounded-md inner h-[0.75rem] flex items-center justify-end pr-[0.75rem]"
                    style={{
                      width: `${percentClaimed}%`,
                    }}
                  >
                    {parseInt(percentClaimed) > 80 &&
                      parseInt(percentClaimed) !== 100 && (
                        <p className="mini">{percentClaimed}%</p>
                      )}
                  </div>
                )}
                {parseInt(percentClaimed) < 80 && (
                  <p className="tiny">{percentClaimed}%</p>
                )}
                {parseInt(percentClaimed) === 100 && (
                  <>
                    <CheckedIcon />
                    <p className="text-completed">Completed</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="btn">
            <button onClick={() => setShowModal(true)}>View Airdrop</button>
          </div>
        </DropCompStyle>
      </ThreeDHoverWrapper>
      <AnimatePresence>
        {showModal && (
          <ClaimModal
            {...{
              name,
              creator,
              date,
              totalParticipants,
              totalRewardClaimed,
              totalRewardPool,
              nftAddress,
              totalClaims,
              type: "token",
            }}
            closeModal={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export const POAPDropComp: React.FC<IDropComp> = ({
  name,
  creator,
  date,
  totalParticipants,
  totalRewardClaimed,
  totalRewardPool,
  totalClaims,
}) => {
  const [showModal, setShowModal] = useState(false);
  const percentageRaw = (totalRewardClaimed * 100) / totalRewardPool;
  const [percentClaimed] = useState(
    percentageRaw % 1 === 0
      ? percentageRaw.toFixed(0)
      : percentageRaw.toFixed(1)
  );
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
            <img src="/poap.avif" className="w-full h-full" alt="POAP image" />
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
                <h3>{totalRewardPool.toLocaleString()}</h3>
              </div>
              <div>
                <p>ENDING DATE</p>
                <div className="flex items-center gap-[0.625rem] justify-end">
                  <CalendarIcon />
                  <h3>{date ? date : "none"}</h3>
                </div>
              </div>
            </div>

            <div className="three">
              <div
                className={`rounded-md h-[0.75rem] flex items-center gap-[0.25rem] ${
                  parseInt(percentClaimed) !== 100
                    ? "bg-[#283245]"
                    : "bg-[rgba(157,211,175,0.28)] p-[0.25rem]"
                }`}
              >
                {parseInt(percentClaimed) !== 100 && (
                  <div
                    className="rounded-md inner h-[0.75rem] flex items-center justify-end pr-[0.75rem]"
                    style={{
                      width: `${percentClaimed}%`,
                    }}
                  >
                    {parseInt(percentClaimed) > 80 &&
                      parseInt(percentClaimed) !== 100 && (
                        <p className="mini">{percentClaimed}%</p>
                      )}
                  </div>
                )}
                {parseInt(percentClaimed) < 80 && (
                  <p className="tiny">{percentClaimed}%</p>
                )}
                {parseInt(percentClaimed) === 100 && (
                  <>
                    <CheckedIcon />
                    <p className="text-completed">Completed</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="btn">
            <button onClick={() => setShowModal(true)}>View POAP</button>
          </div>
        </DropCompStyle>
      </ThreeDHoverWrapper>
      <AnimatePresence>
        {showModal && (
          <ClaimModal
            {...{
              name,
              creator,
              date,
              totalParticipants,
              totalRewardClaimed,
              totalRewardPool,
              totalClaims,
              type: "poap",
            }}
            closeModal={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

interface IClaimModal extends IDropComp {
  closeModal: () => void;
  type: "token" | "poap";
}
export const ClaimModal: React.FC<IClaimModal> = ({
  closeModal,
  name,
  creator,
  nftAddress,
  date,
  totalParticipants,
  totalRewardClaimed,
  totalRewardPool,
  totalClaims,
  type,
}) => {
  const percentageRaw = (totalClaims * 100) / totalParticipants;
  const [percentClaimed] = useState(
    percentageRaw % 1 === 0
      ? percentageRaw.toFixed(0)
      : percentageRaw.toFixed(1)
  );
  const handleClaim = (dropType: "token" | "poap") => {
    if (dropType === "token") {
      // handle token claim
    } else if (dropType === "poap") {
      // handle poap claim
    }
  };
  const [isCreatorAddressCopied, setIsCreatorAddressCopied] = useState(false);
  const [isNftAddressCopied, setIsNftAddressCopied] = useState(false);

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
          <div className="modal overflow-y-auto overflow-x-hidden max-h-[80vh]">
            <BackButton action={closeModal} />
            {type === "token" && (
              <div className="reward-pool flex flex-col items-center justify-center w-full">
                <p>Reward Pool</p>
                <h1>{totalRewardPool.toLocaleString()}ETH</h1>
              </div>
            )}
            {type === "poap" && (
              <div className="poap-img h-[12.625rem] md:h-[11.25rem] w-full rounded-[0.625rem]">
                <img
                  src="/poap.avif"
                  className="w-full h-full rounded-[0.625rem]"
                  alt="POAP image"
                />
              </div>
            )}
            <div className="flex flex-col gap-[1rem]">
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
                <div className="flex flex-col rounded-md bg-[#1E2430] gap-[0.75rem] p-[1rem] w-full">
                  <div className="flex flex-col">
                    <p>No Of Recipients</p>
                    <h4>{totalParticipants.toLocaleString()}</h4>
                  </div>
                  <div
                    className={`rounded-md h-[0.75rem] flex items-center gap-[0.25rem] ${
                      parseInt(percentClaimed) !== 100
                        ? "bg-[#283245]"
                        : "bg-[rgba(157,211,175,0.28)] p-[0.25rem]"
                    }`}
                  >
                    {parseInt(percentClaimed) !== 100 && (
                      <div
                        className="rounded-md inner h-[0.75rem] flex items-center justify-end pr-[0.75rem]"
                        style={{
                          width: `${percentClaimed}%`,
                        }}
                      >
                        {parseInt(percentClaimed) > 80 &&
                          parseInt(percentClaimed) !== 100 && (
                            <p className="mini">{percentClaimed}%</p>
                          )}
                      </div>
                    )}
                    {parseInt(percentClaimed) < 80 && (
                      <p className="tiny">{percentClaimed}%</p>
                    )}
                    {parseInt(percentClaimed) === 100 && (
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
                      {totalRewardClaimed.toLocaleString()}
                      {type === "token" && "ETH"}
                    </h4>
                  </div>
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
                    {isCreatorAddressCopied ? <CopyIcon /> : <CopyIcon />}
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
                      {isNftAddressCopied ? <CopyIcon /> : <CopyIcon />}
                    </button>
                  </div>
                </div>
              )}
              <div className="required flex items-center gap-[0.25rem]">
                <InfoIcon />
                <p>NFT is required to claim Airdrop</p>
              </div>
              <div className="flex flex-col addy">
                <h4>End Date</h4>
                <div className="flex items-center gap-[0.25rem]">
                  <CalendarIcon />
                  <p className="w-[70%] whitespace-normal">
                    {date ? date : "No End date"}
                  </p>
                </div>
              </div>
            </div>
            <div className="btn flex w-full justify-center items-center">
              <button onClick={() => handleClaim(type)}>
                {type === "token" ? "Claim Airdrop" : "Mint POAP"}
              </button>
            </div>
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
