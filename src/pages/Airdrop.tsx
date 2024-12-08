import { ApproveComponent } from "../components/approveComponent";
import AirdropLayout from "../components/layout/airdropLayout";
import { PrepareComponent } from "../components/prepareComponent";
import { SettingsComponent } from "../components/settingsComponent";
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
