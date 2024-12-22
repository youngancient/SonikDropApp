import { useState } from "react";
import { claimCardVariants } from "../animations/animation";
import { formatAddress } from "../utils/helpers";
import ThreeDHoverWrapper from "./3dhover";
import { CalendarIcon, CheckedIcon } from "./icons";
import {
  ClaimModalStyles,
  DropCompStyle,
  FlexAbsoluteModalStyles,
} from "./styles/claimpage";

export interface IDropComp {
  name: string;
  creator: string; //address
  date: string;
  totalRewardPool: number;
  totalRewardClaimed: number;
  totalParticipants: number;
  // img ?: string; havent figure how best to get this
}

export const DropComp: React.FC<IDropComp> = ({
  name,
  creator,
  date,
  totalParticipants,
  totalRewardClaimed,
  totalRewardPool,
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
                  <h3>{date}</h3>
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
      {showModal && (
        <ClaimModal
          {...{
            name,
            creator,
            date,
            totalParticipants,
            totalRewardClaimed,
            totalRewardPool,
          }}
          closeModal={() => setShowModal(false)}
        />
      )}
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
                  <h3>{date}</h3>
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
      {showModal && (
        <ClaimModal
          {...{
            name,
            creator,
            date,
            totalParticipants,
            totalRewardClaimed,
            totalRewardPool,
          }}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

interface IClaimModal extends IDropComp {
  closeModal: () => void;
}
export const ClaimModal: React.FC<IClaimModal> = ({ closeModal }) => {
  return (
    <FlexAbsoluteModalStyles>
      <ClaimModalStyles>
        <button onClick={closeModal}>Close!</button>
        <h1>We're cooking</h1>
      </ClaimModalStyles>
    </FlexAbsoluteModalStyles>
  );
};
