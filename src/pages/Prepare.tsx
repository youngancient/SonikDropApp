import AirdropLayout from "../components/layout/airdropLayout";
import { PrepareComponent } from "../components/airdrop/prepareComponent";

export default function PreparePage () {
    return (
        <AirdropLayout showBackButton={true}>
            <PrepareComponent />
        </AirdropLayout>
    );
}