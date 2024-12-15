import { ApproveComponent } from "../components/airdrop/approveComponent";
import AirdropLayout from "../components/layout/airdropLayout";

export default function ApprovePage () {
    return (
        <AirdropLayout showBackButton={true}>
            <ApproveComponent />
        </ AirdropLayout>
    );
}