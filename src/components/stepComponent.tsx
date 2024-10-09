import { useLocation } from "react-router-dom";


export function StepComponent() {

    const loc = useLocation();

    console.log(loc.pathname);



    return (
        <div className="text-center">
            <div className="flex gap-4 items-center justify-center">
                <div className={`bg-transparent flex ${location.pathname == "/prepare" || location.pathname == "/approve" ? "text-[#27BBFE]" : "text-white"}`}>
                    <div className={`rounded-full w-[25px] h-[25px] mx-2 ${location.pathname == "/prepare" || location.pathname == "/approve" ? "bg-[#27BBFE]" : "bg-white"} text-white`}>1</div> Prepare
                </div>
                <div className={`w-[110px] md:w-[200px] h-[1px] ${location.pathname == "/approve" ? "bg-[#27BBFE]/[0.8]" : "bg-white/[0.8]"}`}></div>
                <div className={`bg-transparent flex ${location.pathname == "/approve" ? "text-[#27BBFE]" : "text-white"}`}>
                <div className={`rounded-full w-[25px] h-[25px] mx-2 ${location.pathname == "/approve" ? "bg-[#27BBFE]" : "bg-[#102191]"} text-white`}>2</div> Approve
                </div>
            </div>
        </div>
    );
}