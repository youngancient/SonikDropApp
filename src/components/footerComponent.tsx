import { FaFacebook, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export function FooterComponent() {
    return (
        <div className="flex justify-between text-white h-[100px] items-center px-8 md:px-[200px]">
            <div>Footer</div>
            <div>Footer</div>
            <div className="flex gap-4">
                <Link to=""><FaFacebook className="text-[20px]" /></Link>
                <Link to=""><FaTwitter className="text-[20px]" /></Link>
            </div>
        </div>
    );
}