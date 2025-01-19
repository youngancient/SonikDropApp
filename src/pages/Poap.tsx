import PoapLayout from "../components/layout/poapLayout";
import { ApprovePoapComponent } from "../components/poap/approvePoapComponent";
import { PreparePoapComponent } from "../components/poap/preparePoapComponent";
import { SettingsPoapComponent } from "../components/poap/settingsPoapComponent";
import { useAppSelector } from "../store/hooks";
import { selectStep } from "../store/slices/poapStepSlice";

const PoapPage = () => {

    const step = useAppSelector(selectStep);

    return (
        <PoapLayout showBackButton={true}>
              {step == "prepare" && <PreparePoapComponent />}
              {step == "settings" && <SettingsPoapComponent />}
              {step == "approve" && <ApprovePoapComponent />}
            </PoapLayout>
     );
}
 
export default PoapPage;