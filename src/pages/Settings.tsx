import AirdropLayout from "../components/layout/airdropLayout";
import { SettingsComponent } from "../components/airdrop/settingsComponent";

export default function SettingsPage () {
    return (
        <AirdropLayout showBackButton={true}>
            <SettingsComponent />
        </ AirdropLayout>
    );
}