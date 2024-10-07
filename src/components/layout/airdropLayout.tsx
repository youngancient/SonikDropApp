import { FooterComponent } from "../footerComponent";
import { HeaderComponent } from "../headerComponent";
import { StepComponent } from "../stepComponent";

export default function AirdropLayout(props: any) {

    return (
        <div style={{background: "linear-gradient(90deg, #0F195B 0%, #233BD7 100%)"}} className="h-screen overflow-auto">
            <HeaderComponent />
            <StepComponent />
            {props.children}
            <FooterComponent />
        </div>
    );

}