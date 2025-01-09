import { FooterComponent } from "../footerComponent";
import { HeaderComponent } from "../headerComponent";
import { StepPoapComponent } from "../poap/stepPoapComponent";
import { useNavigate } from "react-router-dom";

export default function PoapLayout(props: any) {
    const navigate = useNavigate(); 
    return (
        <div style={{backgroundColor: "#0F195B"}} className="h-screen overflow-auto">
            <HeaderComponent formType="poap" />
            <StepPoapComponent />
            {props.children}
            <div className="flex items-center mt-[1rem] gap-[0.875rem] justify-center">
                <p>Already a User?</p>
                <button type="button" onClick={() => navigate("/dashboard")} className="px-[1rem] rounded-[1.5rem] bg-[#01A7FF] h-[2.25rem]">Go to Dashboard</button>
            </div>
            <FooterComponent />
        </div>
    );

}