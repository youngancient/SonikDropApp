import { useEffect, useState } from "react";
import { FooterComponent } from "../components/footerComponent";
import { HeaderComponent } from "../components/headerComponent";
import { ClaimPageStyle, DropListStyle } from "../components/styles/claimpage";
import { AnimatePresence, motion } from "framer-motion";
import {
  ButtonLoader,
  CircleCancel,
  MagnifyingGlass,
} from "../components/icons";
import { DropComp, POAPDropComp } from "../components/claimComponent";
import { tabs } from "../constants/data.ts";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { textVariant } from "../animations/animation";
import { SonikNotConnected } from "../components/notConnected.tsx";
import { ethers } from "ethers";
import { useReadPoapFactoryFunctions } from "../hooks/specific/poap/useReadPoapFactory.ts";
import { IDropComp } from "../interfaces/drop.ts";
import { formatToDDMMYYYY } from "../utils/getPaddedDate.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import {
  setPOAPDrops,
  setDuplicatePOAPDrops,
  selectAllDuplicatePoapDrops,
  selectAllPoapDrops,
} from "../store/slices/poapDropDataSlice.ts";
import { useReadTokenFactoryFunctions } from "../hooks/specific/token/useReadTokenFactory.ts";
import {
  selectAllDuplicateTokenDrops,
  selectAllTokenDrops,
  setDuplicateTokenDrops,
  setTokenDrops,
} from "../store/slices/tokenDropDataSlice.ts";
import { mapTokenDrops } from "../utils/mapTokenDrop.ts";

export interface TabSwitch {
  name: "Tokens" | "POAPs";
  isSelected: boolean;
}

const ClaimPage = () => {
  // Note: all airdrops are listed for users to connect wallet and check for eligibility
  const [stateTabs, setStateTabs] = useState(tabs);

  const [selectedTabName, setSelectedTabName] = useState<"Tokens" | "POAPs">(
    "Tokens"
  );

  const { isConnected, address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState<string>("");

  const duplicatePoapdrops = useAppSelector(selectAllDuplicatePoapDrops);
  const poapdrops = useAppSelector(selectAllPoapDrops);
  const duplicateTokenDrops = useAppSelector(selectAllDuplicateTokenDrops);
  const tokenDrops = useAppSelector(selectAllTokenDrops);

  const { getAllPoapDropsDetails, isLoadingAllPoapDrops } =
    useReadPoapFactoryFunctions();

  const { getAllTokenDropsDetails, isLoadingAllTokenDrops } =
    useReadTokenFactoryFunctions();

  const handleTabSwitch = (tabName: "Tokens" | "POAPs") => {
    setSelectedTabName(tabName);
    const newTabs = stateTabs.map((ele) => {
      return { ...ele, isSelected: ele.name === tabName };
    });
    clearForm();
    setStateTabs(newTabs);
  };

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
        dispatch(setPOAPDrops(filteredPOAPDrops));
      }
    } else {
      // search by name
      if (selectedTabName === "Tokens" && duplicateTokenDrops) {
        const filteredTokenDrops = duplicateTokenDrops.filter((drop) =>
          drop.name.toLowerCase().includes((query as string).toLowerCase())
        );
        console.log("got here", filteredTokenDrops);
        // console.log(filteredTokenDrops.length === 0);
        dispatch(setTokenDrops(filteredTokenDrops));
      } else if (selectedTabName === "POAPs" && duplicatePoapdrops) {
        const filteredPOAPDrops = duplicatePoapdrops.filter((drop) =>
          drop.name.toLowerCase().includes((query as string).toLowerCase())
        );
        dispatch(setPOAPDrops(filteredPOAPDrops));
      }
    }
  };

  const clearForm = () => {
    dispatch(setTokenDrops(duplicateTokenDrops));
    dispatch(setPOAPDrops(duplicatePoapdrops));
    setQuery("");
  };

  useEffect(() => {
    if (!address) {
      return;
    }
    const fetchData = async () => {
      const allTokenDropsDetails = await getAllTokenDropsDetails();

      if (allTokenDropsDetails == null) {
        dispatch(setTokenDrops(null));
        return;
      }

      const drops: IDropComp[] = mapTokenDrops(allTokenDropsDetails);
      dispatch(setTokenDrops(drops));
      dispatch(setDuplicateTokenDrops(drops));
      // get poap
      const asyncPoapDrops = await getAllPoapDropsDetails();
      if (asyncPoapDrops == null) {
        dispatch(setPOAPDrops(null));
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
      dispatch(setPOAPDrops(poapDrops));
      dispatch(setDuplicatePOAPDrops(poapDrops));
    };
    fetchData();
  }, [address,chainId]);

  return (
    <div
      style={{ backgroundColor: "#050C19" }}
      className="h-screen overflow-auto"
    >
      <HeaderComponent />
      <ClaimPageStyle className="px-[20px] md:px-[100px] lg:px-[200px] mt-[2.5rem] md:mt-[3rem]">
        <div className="banner relative">
          <motion.h1
            initial="initial"
            whileInView="final"
            variants={textVariant}
            viewport={{ once: true }}
          >
            Airdrops made specially for you
          </motion.h1>
          <motion.p
            initial="initial"
            whileInView="final2"
            variants={textVariant}
            viewport={{ once: true }}
          >
            Here you can get the latest and hottest airdrop deals for yourself
          </motion.p>
          <div className="absolute right-0 hidden md:block">
            <img src="/bannerIc.svg" alt="banner icon" />
          </div>
          <div className="absolute bottom-0 right-0 block md:hidden">
            <img src="/mobilebannerIc.svg" alt="banner icon" />
          </div>
        </div>
        <div className="filters mt-[1.75rem] md:mt-[2.5rem]">
          <div className="tabs overflow-hidden">
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

        {isConnected && selectedTabName === "Tokens" && tokenDrops?.length === 0 && (
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
        {isConnected && selectedTabName === "POAPs" && poapdrops?.length === 0 && (
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
          <DropListStyle className="drop-list mt-[2rem] md:mt-[3rem] mb-[4rem]">
            {selectedTabName == "Tokens" &&
              (isLoadingAllTokenDrops ? (
                <ButtonLoader />
              ) : (
                (tokenDrops ?? []).map((drop, index) => (
                  <DropComp key={index} {...drop} />
                ))
              ))}
            {selectedTabName === "POAPs" &&
              (isLoadingAllPoapDrops ? (
                <ButtonLoader />
              ) : (
                (poapdrops ?? []).map((drop, index) => (
                  <POAPDropComp key={index} {...drop} />
                ))
              ))}
          </DropListStyle>
        )}

        <AnimatePresence>
          {!isConnected && (
            <SonikNotConnected classNames="pt-[2rem] md:mt-[0rem] md:pt-[3rem] pb-[4rem]" />
          )}
        </AnimatePresence>
      </ClaimPageStyle>
      <FooterComponent />
    </div>
  );
};

export default ClaimPage;
