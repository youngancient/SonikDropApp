import { FooterComponent } from "../footerComponent";
import { HeaderComponent } from "../headerComponent";
import { StepComponent } from "../stepComponent";

export default function AirdropLayout(props: any) {

    return (
        <div style={{backgroundColor: "#0F195B"}} className="h-screen overflow-auto">
            <HeaderComponent />
            <StepComponent />
            {props.children}
            <FooterComponent />
        </div>
    );

}