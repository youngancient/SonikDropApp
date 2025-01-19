import { useAppSelector } from "../../store/hooks";
import { selectStep } from "../../store/slices/poapStepSlice";


export function StepPoapComponent() {
  // const loc = useLocation();

  const step = useAppSelector(selectStep);

  console.log("step", step);

  return (
    <div className="text-center my-2">
      <div className="flex gap-2 md:gap-4 items-center justify-center text-[14px] md:text-[18px]">
        <div
          className={`bg-transparent flex ${
            step == "prepare" ||
            step == "settings" ||
            step == "approve"
              ? "text-white"
              : "text-white/[0.5]"
          }`}
        >
          <div
            className={`rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] mx-1 ${
              step == "prepare" ||
              step == "settings" ||
              step == "approve"
                ? "bg-[#27BBFE]"
                : "bg-[#102191]"
            } text-white`}
          >
            1
          </div>{" "}
          Prepare
        </div>
        <div
          className={`w-[20px] md:w-[90px] h-[1px] ${
            step == "settings" || step == "approve"
              ? "bg-[#27BBFE]/[0.8]"
              : "bg-white/[0.8]"
          }`}
        ></div>
        <div
          className={`bg-transparent flex ${
            step == "settings" || step == "approve"
              ? "text-white"
              : "text-white/[0.5]"
          }`}
        >
          <div
            className={`rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] mx-1 ${
              step == "approve" ||
              step == "settings"
                ? "bg-[#27BBFE]"
                : "bg-[#102191]"
            } text-white`}
          >
            2
          </div>
          Settings
        </div>
        <div
          className={`w-[20px] md:w-[90px] h-[1px] ${
            step == "approve"
              ? "bg-[#27BBFE]/[0.8]"
              : "bg-white/[0.8]"
          }`}
        ></div>
        <div
          className={`bg-transparent flex ${
            step == "approve" ? "text-white" : "text-white/[0.5]"
          }`}
        >
          <div
            className={`rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] mx-1 ${
              step == "approve" ? "bg-[#27BBFE]" : "bg-[#102191]"
            } text-white`}
          >
            3
          </div>{" "}
          Approve
        </div>
      </div>
    </div>
  );
}
