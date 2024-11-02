import { ApproveComponent } from "../components/approveComponent";
import AirdropLayout from "../components/layout/airdropLayout";
import { PrepareComponent } from "../components/prepareComponent";
import { SettingsComponent } from "../components/settingsComponent";
import {useAppSelector } from "../store/hooks";

export default function AirdropPage () {

    const step = useAppSelector(value => value.step.value);

    return (
        <AirdropLayout showBackButton={true}>
            {step == "prepare" && <PrepareComponent />}
            {step == "settings" && <SettingsComponent />}
            {step == "approve" && <ApproveComponent />}
        </ AirdropLayout>
    );
}