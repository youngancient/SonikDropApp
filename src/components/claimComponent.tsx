import { formatAddress } from "../utils/helpers";
import ThreeDHoverWrapper from "./3dhover";
import { CalendarIcon } from "./icons";
import { DropCompStyle } from "./styles/claimpage";

export interface IDropComp {
  name: string;
  creator: string; //address
  date: string;
  totalRewardPool: number;
  totalRewardClaimed: number;
  totalParticipants: number;
}

export const DropComp: React.FC<IDropComp> = ({
  name,
  creator,
  date,
  totalParticipants,
  totalRewardClaimed,
  totalRewardPool,
}) => {
  return (
    <ThreeDHoverWrapper>
      <DropCompStyle className="w-full h-full">
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
            <div className="rounded-md bg-[#283245] h-[0.75rem]">
              <div
                className="rounded-md inner h-[0.75rem]"
                style={{
                  width: `${(totalRewardClaimed * 100) / totalRewardPool}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="btn">
          <button>Claim Airdrop</button>
        </div>
      </DropCompStyle>
    </ThreeDHoverWrapper>
  );
};
