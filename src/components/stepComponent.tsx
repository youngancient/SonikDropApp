import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function StepComponent() {

    const loc = useLocation();

    console.log(loc.pathname);

    return (
        <div className="text-center">
            <div>
                <div className={`${location.pathname == "/prepare" ? "block" : "hidden"} text-white`}>1. Prepare</div>
                <div className={`${location.pathname == "/approve" ? "block" : "hidden"} text-white`}>2. Approve</div>
            </div>
            <div className="flex items-center justify-center">
                <div className={`h-[8px] w-[8px] rounded-full ${location.pathname == "/prepare" || location.pathname == "/approve" ? "bg-[#27BBFE]" : "bg-white"}`}></div>
                <div className={`w-[200px] h-[1px] ${location.pathname == "/approve" ? "bg-[#27BBFE]" : "bg-white"}`}></div>
                <div className={`h-[8px] w-[8px] rounded-full ${location.pathname == "/approve" ? "bg-[#27BBFE]" : "bg-white"}`}></div>
            </div>
        </div>
    );
}