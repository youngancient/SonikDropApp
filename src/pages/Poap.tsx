import AirdropLayout from "../components/layout/airdropLayout";
import { PreparePoapComponent } from "../components/poap/preparePoapComponent";
import { useAppSelector } from "../store/hooks";
import { selectStep } from "../store/slices/stepSlice";

const PoapPage = () => {

    const step = useAppSelector(selectStep);

    return (
        <AirdropLayout showBackButton={true}>
              {step == "prepare" && <PreparePoapComponent />}
              {/* {step == "settings" && <SettingsComponent />}
              {step == "approve" && <ApproveComponent />} */}
            </AirdropLayout>
     );
}
 
export default PoapPage;