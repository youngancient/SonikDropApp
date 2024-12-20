import { useState } from "react";
import { FooterComponent } from "../components/footerComponent";
import { HeaderComponent } from "../components/headerComponent";
import { ClaimPageStyle, DropListStyle } from "../components/styles/claimpage";
import { motion } from "framer-motion";
import { CircleCancel, MagnifyingGlass } from "../components/icons";
import { DropComp, IDropComp } from "../components/claimComponent";

import { v4 as uuidv4 } from 'uuid';

interface TabSwitch {
  name: string;
  isSelected: boolean;
}
const tabs: TabSwitch[] = [
  { name: "Tokens", isSelected: true },
  { name: "POAPs", isSelected: false },
];
const Drops: IDropComp[] = [
  {
    name: "Pengu",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "24.10.24",
    totalRewardPool: 20000,
    totalRewardClaimed: 1500,
    totalParticipants: 2000,
  },
  {
    name: "Sonik",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "24.10.24",
    totalRewardPool: 100000,
    totalRewardClaimed: 50000,
    totalParticipants: 6000,
  },
  {
    name: "Align",
    creator: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
    date: "24.10.24",
    totalRewardPool: 5000000,
    totalRewardClaimed: 250000,
    totalParticipants: 500,
  },
  {
    name: "MonBebe",
    creator: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
    date: "24.10.24",
    totalRewardPool: 15000000,
    totalRewardClaimed: 1000000,
    totalParticipants: 64000,
  },
  {
    name: "ChillGuy",
    creator: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
    date: "24.11.24",
    totalRewardPool: 1500000000,
    totalRewardClaimed: 100000000,
    totalParticipants: 64000,
  },
  {
    name: "Dogs",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "24.11.24",
    totalRewardPool: 1500000,
    totalRewardClaimed: 900000,
    totalParticipants: 640000,
  },
  {
    name: "ChillGirl",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "28.11.24",
    totalRewardPool: 18000000,
    totalRewardClaimed: 1900000,
    totalParticipants: 164000,
  },
  {
    name: "Sonik",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "28.11.24",
    totalRewardPool: 8000000,
    totalRewardClaimed: 1900000,
    totalParticipants: 14000,
  },
  {
    name: "Santa",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "28.11.24",
    totalRewardPool: 5000000000,
    totalRewardClaimed: 1500000,
    totalParticipants: 16000,
  },
];

const ClaimPage = () => {
  const [stateTabs, setStateTabs] = useState(tabs);
  const handleTabSwitch = (tab: string) => {
    const newTabs = stateTabs.map((ele) => {
      return { ...ele, isSelected: ele.name === tab };
    });
    setStateTabs(newTabs);
  };

  // const [drops, set]
  return (
    <div
      style={{ backgroundColor: "#050C19" }}
      className="h-screen overflow-auto"
    >
      <HeaderComponent showBackButton={false} />
      <ClaimPageStyle className="px-2 md:px-[200px] mt-[2.5rem] md:mt-[3rem]">
        <div className="banner relative">
          <h1>Airdrops made specially for you</h1>
          <p>
            Here you can get the latest and hottest airdrop deals for yourself
          </p>
          <div className="absolute right-0 hidden md:block">
            <img src="/bannerIc.svg" alt="banner icon" />
          </div>
          <div className="absolute bottom-0 right-0 block md:hidden">
            <img src="/mobilebannerIc.svg" alt="banner icon" />
          </div>
        </div>
        <div className="filters mt-[1.75rem] md:mt-[2.5rem]">
          <div className="tabs">
            {stateTabs.map((ele) => (
              <button key={ele.name} onClick={() => handleTabSwitch(ele.name)}>
                <p
                  className={`z-[5] ${
                    ele.isSelected
                      ? "text-black font-[500] leading-[1.25rem]"
                      : "text-white"
                  }`}
                >
                  {ele.name}
                </p>
                {ele.isSelected && (
                  <motion.div
                    layoutId="slider"
                    className="absolute z-0 w-full h-full bg-[#fff] rounded-[0.4375rem]"
                  ></motion.div>
                )}
              </button>
            ))}
          </div>
          <div className="inp relative">
            <div className="absolute top-[1.125rem] left-[0.5rem]">
              <MagnifyingGlass />
            </div>
            <input
              type="text"
              name="query"
              placeholder="Search Airdrop listing/ Creators address"
            />
            <div className="absolute top-[1.125rem] right-[0.5rem]">
              <CircleCancel />
            </div>
          </div>
        </div>
        <DropListStyle className="drop-list mt-[2rem] md:mt-[3rem]">
          {Drops.map((drop) => (
            <DropComp
              key={uuidv4()}
              {...drop}
            />
          ))}
        </DropListStyle>
      </ClaimPageStyle>
      <FooterComponent />
    </div>
  );
};

export default ClaimPage;
