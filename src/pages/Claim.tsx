import { useState } from "react";
import { FooterComponent } from "../components/footerComponent";
import { HeaderComponent } from "../components/headerComponent";
import { ClaimPageStyle, DropListStyle } from "../components/styles/claimpage";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCancel, MagnifyingGlass } from "../components/icons";
import { DropComp, POAPDropComp } from "../components/claimComponent";
import { POAPDrops, TokenDrops } from "../constants/data.ts";
import { useAppKitAccount } from "@reown/appkit/react";
import { textVariant } from "../animations/animation";
import { SonikNotConnected } from "../components/notConnected.tsx";
import { ethers } from "ethers";

interface TabSwitch {
  name: "Tokens" | "POAPs";
  isSelected: boolean;
}
const tabs: TabSwitch[] = [
  { name: "Tokens", isSelected: true },
  { name: "POAPs", isSelected: false },
];

const ClaimPage = () => {
  const [stateTabs, setStateTabs] = useState(tabs);

  const [selectedTabName, setSelectedTabName] = useState("Tokens");

  const { isConnected } = useAppKitAccount();

  const handleTabSwitch = (tabName: string) => {
    setSelectedTabName(tabName);
    const newTabs = stateTabs.map((ele) => {
      return { ...ele, isSelected: ele.name === tabName };
    });
    setStateTabs(newTabs);
  };

  const [query, setQuery] = useState<string>("");

  const [tokendrops, setTokenDrops] = useState(TokenDrops);
  const [poapdrops, setPOAPDrops] = useState(POAPDrops);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query === "" || query.trim() === "") {
      clearForm();
      return;
    }
    if (ethers.isAddress(query)) {
      // search by address
      if (selectedTabName === "Tokens") {
        const filteredTokenDrops = TokenDrops.filter(
          (drop) => drop.creator.toLowerCase() === query.toLowerCase()
        );
        setTokenDrops(filteredTokenDrops);
      } else if (selectedTabName === "POAPs") {
        const filteredPOAPDrops = POAPDrops.filter(
          (drop) => drop.creator.toLowerCase() === query.toLowerCase()
        );
        setPOAPDrops(filteredPOAPDrops);
      }
    } else {
      // search by name
      if (selectedTabName === "Tokens") {
        const filteredTokenDrops = TokenDrops.filter((drop) =>
          drop.name.toLowerCase().includes((query as string).toLowerCase())
        );
        // console.log(filteredTokenDrops.length === 0);
        setTokenDrops(filteredTokenDrops);
      } else if (selectedTabName === "POAPs") {
        const filteredPOAPDrops = POAPDrops.filter((drop) =>
          drop.name.toLowerCase().includes((query as string).toLowerCase())
        );
        setPOAPDrops(filteredPOAPDrops);
      }
    }
    console.log(query);
  };

  const clearForm = () => {
    setTokenDrops(TokenDrops);
    setPOAPDrops(POAPDrops);
    setQuery("");
  };
  return (
    <div
      style={{ backgroundColor: "#050C19" }}
      className="h-screen overflow-auto"
    >
      <HeaderComponent showBackButton={false} />
      <ClaimPageStyle className="px-2 md:px-[200px] mt-[2.5rem] md:mt-[3rem]">
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
        {isConnected && (
          <DropListStyle className="drop-list mt-[2rem] md:mt-[3rem]">
            {selectedTabName == "Tokens" &&
              tokendrops.map((drop, index) => (
                <DropComp key={index} {...drop} />
              ))}
            {selectedTabName == "POAPs" &&
              poapdrops.map((drop, index) => (
                <POAPDropComp key={index} {...drop} />
              ))}

            {/* fix this later */}
            {tokendrops.length === 0 ||
              (poapdrops.length === 0 && (
                <div>
                  <h2 className="border-2 border-[red]">No Drops Found</h2>
                </div>
              ))}
          </DropListStyle>
        )}
        <AnimatePresence>
          {!isConnected && <SonikNotConnected />}
        </AnimatePresence>
      </ClaimPageStyle>
      <FooterComponent />
    </div>
  );
};

export default ClaimPage;
