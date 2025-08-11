import { useNavigate } from "react-router-dom";
import { FooterComponent } from "../components/footerComponent";
import { HeaderComponent } from "../components/headerComponent";
import {
  ButtonLoader,
  CircleCancel,
  CoinIcon,
  ConnectBtnIcon,
  MagnifyingGlass,
} from "../components/icons";
import { DashboardStyles } from "../components/styles/dashboard";
import { AnimatePresence, motion } from "framer-motion";
import { OptionComponent } from "../components/optionComponent";
import { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { tabs } from "../constants/data";
import { ethers } from "ethers";
import { DropListStyle } from "../components/styles/claimpage";
import { DropComp, POAPDropComp } from "../components/claimComponent";
import { SonikNotConnected } from "../components/notConnected";
import { textVariant } from "../animations/animation";
import { useReadTokenFactoryFunctions } from "../hooks/specific/token/useReadTokenFactory";
import { useReadPoapFactoryFunctions } from "../hooks/specific/poap/useReadPoapFactory";
import { IDropComp } from "../interfaces/drop";
import { mapTokenDrops } from "../utils/mapTokenDrop";
import { formatToDDMMYYYY } from "../utils/getPaddedDate";

const Dashboard = () => {
  // Note: Here only the airdrops created by the user are displayed

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [stateTabs, setStateTabs] = useState(tabs);

  const [selectedTabName, setSelectedTabName] = useState("Tokens");

  const { isConnected, address } = useAppKitAccount();

  const [query, setQuery] = useState<string>("");

  const [tokenDrops, setTokenDrops] = useState<IDropComp[] | null>(null);
  const [duplicateTokenDrops, setDuplicateTokenDrops] = useState<
    IDropComp[] | null
  >(null);

  const [poapdrops, setPOAPDrops] = useState<IDropComp[] | null>(null);

  const [duplicatePoapdrops, setDuplicatePOAPDrops] = useState<
    IDropComp[] | null
  >(null);

  const { getOwnerPoapDropsDetails, isLoadingOwnerPoapDrops } =
    useReadPoapFactoryFunctions();

  const { getOwnerTokenDropsDetails, isLoadingOwnerTokenDrops } =
    useReadTokenFactoryFunctions();

  // there's a bug here, if the user doesnt wait for the fetch in the useefect to be complete, the kini here is null
  const handleTabSwitch = (tabName: string) => {
    setSelectedTabName(tabName);
    const newTabs = stateTabs.map((ele) => {
      return { ...ele, isSelected: ele.name === tabName };
    });
    clearForm();
    setStateTabs(newTabs);
  };

  useEffect(() => {
    if (!address) {
      return;
    }
    const fetchData = async () => {
      const allOwnerTokenDropsDetails = await getOwnerTokenDropsDetails();

      if (allOwnerTokenDropsDetails == null) {
        setTokenDrops(null);
        return;
      }

      const drops: IDropComp[] = mapTokenDrops(allOwnerTokenDropsDetails);
      setTokenDrops(drops);
      setDuplicateTokenDrops(drops);
      // get poap
      const asyncPoapDrops = await getOwnerPoapDropsDetails();
      if (asyncPoapDrops == null) {
        setPOAPDrops(null);
        return;
      }
      const poapDrops: IDropComp[] = asyncPoapDrops.map((drop) => ({
        name: drop.name,
        creator: drop.creatorAddress,
        creationDate: formatToDDMMYYYY(new Date(drop.creationTime * 1000)),
        totalRewardPool: BigInt(drop.totalClaimable).toString(),
        totalRewardClaimed: BigInt(drop.totalClaimed).toString(), // since it's 1 mint per user, totalClaims == totalRewardClaimed
        totalParticipants: drop.totalClaimable,
        totalClaims: drop.totalClaimed,
        contractAddress: drop.address,
        hasUserClaimed: drop.hasUserClaimed,
        baseURI: drop.baseURI,
        endDate: drop.endTime
          ? formatToDDMMYYYY(new Date(drop.endTime * 1000))
          : undefined,
      }));
      console.log(poapDrops);
      setPOAPDrops(poapDrops);
      setDuplicatePOAPDrops(poapDrops);
    };
    fetchData();
  }, [address]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query === "" || query.trim() === "") {
      clearForm();
      return;
    }
    if (ethers.isAddress(query)) {
      // search by address
      if (selectedTabName === "Tokens") {
        if (!duplicateTokenDrops) {
          return;
        }
        const filteredTokenDrops = duplicateTokenDrops.filter(
          (drop) => drop.creator.toLowerCase() === query.toLowerCase()
        );
        setTokenDrops(filteredTokenDrops);
      } else if (selectedTabName === "POAPs") {
        if (!duplicatePoapdrops) {
          return;
        }
        const filteredPOAPDrops = duplicatePoapdrops.filter(
          (drop) => drop.creator.toLowerCase() === query.toLowerCase()
        );
        setPOAPDrops(filteredPOAPDrops);
      }
    } else {
      // search by name
      if (selectedTabName === "Tokens") {
        if (!duplicateTokenDrops) {
          return;
        }
        const filteredTokenDrops = duplicateTokenDrops.filter((drop) =>
          drop.name.toLowerCase().includes((query as string).toLowerCase())
        );
        // console.log(filteredTokenDrops.length === 0);
        setTokenDrops(filteredTokenDrops);
      } else if (selectedTabName === "POAPs") {
        if (!duplicatePoapdrops) {
          return;
        }
        const filteredPOAPDrops = duplicatePoapdrops.filter((drop) =>
          drop.name.toLowerCase().includes((query as string).toLowerCase())
        );
        setPOAPDrops(filteredPOAPDrops);
      }
    }
  };

  const clearForm = () => {
    setTokenDrops(duplicateTokenDrops);
    setPOAPDrops(duplicatePoapdrops);
    setQuery("");
  };

  return (
    <div
      style={{
        background: `linear-gradient(180deg, #0B135B 40.24%, rgba(1, 3, 20, 0.00) 100%), 
        radial-gradient(65.08% 85.05% at 50% 50%, rgba(0, 0, 0, 0.00) 37.41%, 
        #2B75FF 75%, #26C6FD 100%)`,
      }}
      className="min-h-screen overflow-auto"
    >
      <HeaderComponent />
      <DashboardStyles className="mt-[1.5rem] md:mt-[2rem] h-fit">
        <div className="top px-[20px] md:px-[100px] lg:px-[200px]">
          <h2>Dashboard Overview</h2>
          <div className="stat-cards grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-[0.25rem] md:gap-[1.5rem] flex-wrap mt-[1rem] pb-[3.4rem] md:pb-[4.4rem] rounded-[1.25rem] md:rounded-[0rem]">
            <div className="flex flex-col justify-start p-[1.35rem] gap-[1.7rem] stat">
              <p className="text-center md:text-left">Airdrops Created</p>
              <h3 className="text-center md:text-left w-full">0</h3>
            </div>
            <div className="flex flex-col justify-start p-[1.35rem] gap-[1.7rem] stat">
              <p className="text-center md:text-left">Airdrops Claimed</p>
              <h3 className="text-center md:text-left">0</h3>
            </div>
            <div className="flex flex-col justify-start p-[1.35rem] gap-[1.7rem] stat">
              <p className="text-center md:text-left">All Token Rewards</p>
              <h3 className="text-center md:text-left">0</h3>
            </div>
            <div className="flex flex-col justify-start p-[1.35rem] gap-[1.7rem] stat">
              <p className="text-center md:text-left">All POAP Rewards</p>
              <h3 className="text-center md:text-left">0</h3>
            </div>
          </div>
        </div>
        <div className="bottom bg-[#050C19] px-2 md:px-[200px] h-full">
          <div className="pt-[2rem]">
            <h2>Quick Actions</h2>
            <div className="quick flex items-center gap-[1rem] justify-start md:justify-start">
              <button
                className="flex flex-col p-[0.625rem] gap-[0.25rem] items-center justify-center rounded-[1.25rem] create h-[8.75rem] w-[10rem] cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <ConnectBtnIcon />
                <p>Create Airdrop</p>
              </button>
              <button
                className="flex flex-col p-[0.625rem] gap-[0.25rem] items-center justify-center rounded-[1.25rem] create h-[8.75rem] w-[10rem] cursor-pointer"
                onClick={() => navigate("/claim")}
              >
                <CoinIcon />
                <p>Claim Drop</p>
              </button>
            </div>
          </div>
          <div className="filters mt-[1.75rem] md:mt-[2.5rem]">
            <div className="tabs overflow-hidden">
              {stateTabs.map((ele) => (
                <button
                  key={ele.name}
                  onClick={() => handleTabSwitch(ele.name)}
                >
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
              <div className="absolute top-[1.155rem] left-[1.5rem] cursor-pointer">
                <MagnifyingGlass />
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="query"
                  value={query}
                  placeholder="Search Airdrop listing/ Creators address"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
              <div
                className="absolute top-[1.155rem] right-[1.5rem] cursor-pointer"
                onClick={() => clearForm()}
              >
                <CircleCancel />
              </div>
            </div>
          </div>

          {isConnected &&
            selectedTabName === "Tokens" &&
            tokenDrops?.length === 0 && (
              <motion.div
                className="h-full w-full flex justify-center items-center mt-[2rem] md:mt-[3rem] min-h-40"
                initial="initial"
                animate="final"
                exit="exit"
                key="empty-tokens"
                variants={textVariant}
              >
                <h1 className="text-center">No Token Drops Found 🧐</h1>
              </motion.div>
            )}
          {isConnected &&
            selectedTabName === "POAPs" &&
            poapdrops?.length === 0 && (
              <motion.div
                className="h-full w-full flex justify-center items-center mt-[2rem] md:mt-[3rem] min-h-40"
                initial="initial"
                animate="final"
                exit="exit"
                key="empty-poaps"
                variants={textVariant}
              >
                <h1 className="text-center">No POAP Drops Found 🧐</h1>
              </motion.div>
            )}

          {isConnected && (
            <DropListStyle className="drop-list mt-[2rem] md:mt-[3rem] pb-[4rem">
              {selectedTabName == "Tokens" &&
                (isLoadingOwnerTokenDrops ? (
                  <ButtonLoader />
                ) : (
                  (tokenDrops ?? []).map((drop, index) => (
                    <DropComp key={index} {...drop} isEditable={true} />
                  ))
                ))}
              {selectedTabName === "POAPs" &&
                (isLoadingOwnerPoapDrops ? (
                  <ButtonLoader />
                ) : (
                  (poapdrops ?? []).map((drop, index) => (
                    <POAPDropComp key={index} {...drop} isEditable={true} />
                  ))
                ))}
            </DropListStyle>
          )}

          <AnimatePresence>
            {!isConnected && (
              <SonikNotConnected classNames="pt-[2rem] md:pt-[3rem] mb-[0rem] pb-[4rem]" />
            )}
          </AnimatePresence>
        </div>
      </DashboardStyles>
      <FooterComponent classNames="bg-[#050C19]" />
      <AnimatePresence>
        {showModal && (
          <OptionComponent closeModal={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
