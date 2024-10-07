import { useEffect, useState } from "react";

export function ApproveComponent() {

    interface ICSV {
        address: string;
        amount: number
    }

    // const [tokenAddress, setTokenAddress] = useState("");
    const [csvToJSONData, setCsvToJSONData] = useState<ICSV[]>([]);

    useEffect(() => {
        // setTokenAddress(sessionStorage.getItem("tokenAddress")  as string);
        setCsvToJSONData(JSON.parse(sessionStorage.getItem("csvData") as string));
    }, []);

    return (
        <div className="w-full flex justify-center items-center text-white p-2">
            <div className="p-8 w-full lg:w-[400px] xl:w-[600px] border-[1px] border-[#FFFFFF17] rounded-xl" style={{background: "#8989890D", backdropFilter: "blur(150px)"}}>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 lg:flex gap-4 text-center">
                        <div className="border-2 border-[#D0D5DD bg-[#EAF0FF] rounded-[20px] p-4">
                            <div className="font-bold text-black text-[20px]">{csvToJSONData.length}</div>
                            <div className="text-sm text-[#7A7A7A]">Current approval</div>
                        </div>
                        <div className="border-2 border-[#D0D5DD] bg-[#EAF0FF] rounded-[20px] p-4">
                            <div className="font-bold text-black text-[20px]">{csvToJSONData.reduce((accumulator: number, current: any) => {
                                return accumulator + parseInt(current.amount);
                            }, 0)}</div>
                            <div className="text-sm text-[#7A7A7A]">Total tokens to send</div>
                        </div>
                        <div className="border-2 border-[#D0D5DD] bg-[#EAF0FF] rounded-[20px] p-4">
                            <div className="font-bold text-black text-[20px]">50</div>
                            <div className="text-sm text-[#7A7A7A]">Token balance</div>
                        </div>
                        <div className="border-2 border-[#D0D5DD] bg-[#EAF0FF] rounded-[20px] p-4">
                            <div className="font-bold text-black text-[20px]">50</div>
                            <div className="text-sm text-[#7A7A7A]">Base balance</div>
                        </div>
                    </div>
                    <div>
                        <div>List of recipients</div>
                        <div className="my-8 h-[200px] overflow-y-auto">
                            {csvToJSONData.map((recepients: any) => {
                                return (
                                    <div className="flex flex-col md:flex-row justify-between border-b-2 border-b-[#D0D5DD] py-4">
                                        <div>{recepients.address}</div>
                                        <div>{recepients.amount} Base</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <button className="w-full bg-[#00A7FF] text-white py-2 rounded-[6px]">Continue</button>
            </div>
        </div>
    );
}