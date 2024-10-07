export function HeaderComponent() {
    return (
        <div className="flex justify-between text-white h-[100px] items-center px-8 md:px-[200px]">
            <div className="flex gap-2 items-center"><img src="/Sonik_Drop.png" className="w-[40px] h-[40px]" /> Sonik Airdrop</div>
            <div>
                <button className="border-[2px] px-4 py-1 rounded-md border-[#FFFFFF17]">Connect wallet</button>
            </div>
        </div>
    );
}