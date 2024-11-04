import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export function FooterComponent() {
    return (
        <div className="flex justify-center text-white h-[100px] items-center px-2 md:px-[200px]">

            <div className="flex gap-2 items-center">
                <div>Contribute to SonikDrop</div>
                <Link to="https://github.com/youngancient/SonikDropApp"><FaGithub className="text-[20px]" /></Link>
            </div>
        </div>
    );
}