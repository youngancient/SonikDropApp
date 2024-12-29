import { motion } from "framer-motion";
import { moodVariant, parentVariant } from "../animations/animation";
import ClickOutsideWrapper from "./outsideClick";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

interface IOption {
    name: string;
    isSelected: boolean;
  }
  
const Options: IOption[] = [
    { name: "Airdrop", isSelected: false },
    { name: "POAP", isSelected: false },
  ];


interface IOptionComp{
    closeModal : () => void;
}
export const OptionComponent:React.FC<IOptionComp> =({closeModal})=>{
    const [options, setOptions] = useState(Options);
    const navigate = useNavigate();

  const handleSelectOption = (index: number) => {
    if (index === 0) {
      navigate("/airdrop");
    } else if (index === 1) {
      navigate("/poap");
    }
    setOptions(options);
  };

    return(
        <motion.div
            className="h-screen w-full flex justify-center items-center bg-[transparent] absolute top-[0] left-[0] backdrop-blur-lg p-4"
            variants={parentVariant}
            style={{ zIndex: 5 }}
            initial="initial"
            animate="final"
            // onClick={handleClickOutside}
          >
            <ClickOutsideWrapper onClickOutside={closeModal}>
              <motion.div
                className="w-full md:w-[600px] border-[3px] border-[#FFFFFF17] p-4 pb-16 rounded-[2rem] flex flex-col gap-8 bg-[#050C19]"
                variants={moodVariant}
                initial="initial"
                animate="final"
                exit="exit"
                key="kagura"
              >
                <div>
                  <CgClose
                    className="ml-auto cursor-pointer text-xl focus:outline-none focus:ring-2 focus:ring-[#2b75ff]"
                    onClick={closeModal}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        closeModal();
                      }
                    }}
                    tabIndex={0}
                    role="button"
                  />
                </div>
                <h3 className="text-white text-center text-2xl font-normal font-bold leading-6">
                  Choose Option
                </h3>
                <div className="flex justify-center items-center gap-[2.375rem] relative">
                  <h3 className="opacity-60 mix-blend-difference text-[#272D37] font-sans text-6xl font-semibold leading-[2.375rem] tracking-tight absolute inset-0 flex justify-center items-center">
                    ⚡
                  </h3>
                  {options.map((option, index) => (
                    <OptionStyles
                      key={index}
                      $isSelected={option.isSelected}
                      onClick={() => handleSelectOption(index)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleSelectOption(index);
                        }
                      }}
                    >
                      <p className="text-white text-lg font-normal font-bold leading-6">
                        {option.name}
                      </p>
                    </OptionStyles>
                  ))}
                </div>
              
              </motion.div>
            </ClickOutsideWrapper>
          </motion.div>
    )
}

interface OptionProps {
    $isSelected: boolean;
  }
  const OptionStyles = styled.div<OptionProps>`
    border-radius: 1.5rem;
    border-top: 1px solid rgba(204, 215, 246, 0.58);
    border-bottom: 1px solid rgba(204, 215, 246, 0.58);
    background: #060d29;
    display: flex;
    width: 8.125rem;
    padding: 3.375rem 2.75rem 3.375rem 2.75rem;
    justify-content: center;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
    cursor: pointer;
    z-index: 5;
  
    @media (min-width: 768px) {
      border-radius: 2.375rem;
      display: flex;
      width: 12.5rem;
      padding: 4.125rem 4.625rem 4.0625rem 5.25rem;
    }
    ${(props) =>
      props.$isSelected &&
      css`
        background: var(
          --kk,
          linear-gradient(180deg, #0b135b 40.24%, rgba(1, 3, 20, 0) 100%),
          radial-gradient(
            65.08% 85.05% at 50% 50%,
            rgba(0, 0, 0, 0) 37.41%,
            #2b75ff 75%,
            #26c6fd 100%
          )
        );
      `}
    &:hover {
      background: var(
        --kk,
        linear-gradient(180deg, #0b135b 40.24%, rgba(1, 3, 20, 0) 100%),
        radial-gradient(
          65.08% 85.05% at 50% 50%,
          rgba(0, 0, 0, 0) 37.41%,
          #2b75ff 75%,
          #26c6fd 100%
        )
      );
    }
  `;
  