import AirdropLayout from "../components/layout/airdropLayout";
import { PrepareComponent } from "../components/prepareComponent";

export default function PreparePage () {
    return (
        <AirdropLayout showBackButton={true}>
            <PrepareComponent />
        </AirdropLayout>
    );
}