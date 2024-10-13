import { useNavigate } from "react-router-dom";

export function HeaderComponent() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between text-white h-[100px] items-center px-2 md:px-[200px]">
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate("/")}><img src="/Sonik_Drop.png" className="w-[40px] h-[40px]" /> SonikDrop</div>
            <div>
                <button className="border-[2px] px-4 py-1 rounded-md border-[#FFFFFF17]">Connect wallet</button>
            </div>
        </div>
    );
}
