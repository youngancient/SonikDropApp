import { useLocation } from "react-router-dom";

export function StepComponent() {
  const loc = useLocation();

  console.log(loc.pathname);

  return (
    <div className="text-center my-2">
      <div className="flex gap-2 md:gap-4 items-center justify-center text-[14px] md:text-[18px]">
        <div
          className={`bg-transparent flex ${
            location.pathname == "/prepare" ||
            location.pathname == "/settings" ||
            location.pathname == "/approve"
              ? "text-white"
              : "text-white/[0.5]"
          }`}
        >
          <div
            className={`rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] mx-1 ${
              location.pathname == "/prepare" ||
              location.pathname == "/settings" ||
              location.pathname == "/approve"
                ? "bg-[#27BBFE]"
                : "bg-white"
            } text-white`}
          >
            1
          </div>{" "}
          Prepare
        </div>
        <div
          className={`w-[20px] md:w-[90px] h-[1px] ${
            location.pathname == "/settings" || location.pathname == "/approve"
              ? "bg-[#27BBFE]/[0.8]"
              : "bg-white/[0.8]"
          }`}
        ></div>
        <div
          className={`bg-transparent flex ${
            location.pathname == "/settings" || location.pathname == "/approve"
              ? "text-white"
              : "text-white/[0.5]"
          }`}
        >
          <div
            className={`rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] mx-1 ${
              location.pathname == "/approve" ||
              location.pathname == "/settings"
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
            location.pathname == "/approve"
              ? "bg-[#27BBFE]/[0.8]"
              : "bg-white/[0.8]"
          }`}
        ></div>
        <div
          className={`bg-transparent flex ${
            location.pathname == "/approve" ? "text-white" : "text-white/[0.5]"
          }`}
        >
          <div
            className={`rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px]] mx-1 ${
              location.pathname == "/approve" ? "bg-[#27BBFE]" : "bg-[#102191]"
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
