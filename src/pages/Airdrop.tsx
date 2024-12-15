import { ApproveComponent } from "../components/airdrop/approveComponent";
import AirdropLayout from "../components/layout/airdropLayout";
import { PrepareComponent } from "../components/airdrop/prepareComponent";
import { SettingsComponent } from "../components/airdrop/settingsComponent";
import { useAppSelector } from "../store/hooks";
import { selectStep } from "../store/slices/stepSlice";

export default function AirdropPage() {
  const step = useAppSelector(selectStep);

  return (
    <AirdropLayout showBackButton={true}>
      {step == "prepare" && <PrepareComponent />}
      {step == "settings" && <SettingsComponent />}
      {step == "approve" && <ApproveComponent />}
    </AirdropLayout>
  );
}
