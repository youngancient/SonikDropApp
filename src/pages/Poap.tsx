import AirdropLayout from "../components/layout/airdropLayout";
import { PreparePoapComponent } from "../components/poap/preparePoapComponent";
import { SettingsPoapComponent } from "../components/poap/settingsPoapComponent";
import { useAppSelector } from "../store/hooks";
import { selectStep } from "../store/slices/poapStepSlice";

const PoapPage = () => {

    const step = useAppSelector(selectStep);

    return (
        <AirdropLayout showBackButton={true}>
              {step == "prepare" && <PreparePoapComponent />}
              {step == "settings" && <SettingsPoapComponent />}
              {/* {step == "approve" && <ApproveComponent />} */}
            </AirdropLayout>
     );
}
 
export default PoapPage;