import Papa from "papaparse";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export function PrepareComponent() {

    const navigate = useNavigate();

    const [tokenAddress, setTokenAddress] = useState("");
    const [csvData, setCsvData] = useState("");
    const [csvToJSONData, setCsvToJSONData] = useState<any>([]);
    const [tokenAddressError, setTokenAddressError] = useState("");
    const [csvDataError, setCsvDataError] = useState("");

    const handleChange = (event: any) => {
        const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results: any) => {
            const stringResult = results.data.map((result: any[any]) => {
                return `${result.address},${result.amount}`;
            }).join(`\n`);

            console.log(stringResult);
            setCsvData(stringResult);
            setCsvToJSONData(results.data);
        },
        header: true, // Set to true if your CSV has headers
      });
    }
    }

    const nextPage = () => {
        if(!tokenAddress || !csvData) {

            if(!tokenAddress) {
                setTokenAddressError("Kindly enter a token address");
            }

            if(tokenAddress.length < 42) {
                setTokenAddressError("Invalid address");
            }
            
            if (!csvData) {
                setCsvDataError("Kindly upload a csv");
            }
            return;
        }

        sessionStorage.setItem("tokenAddress", tokenAddress);
        sessionStorage.setItem("csvData", JSON.stringify(csvToJSONData));

        navigate("/approve");
         
    }

    return (
        <div className="w-full flex justify-center items-center text-white p-2">
            <div className="p-8 w-full lg:w-[400px] xl:w-[600px] border-[1px] border-[#FFFFFF17] rounded-xl" style={{background: "#8989890D", backdropFilter: "blur(150px)"}}>
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="text-left">Token address</div>
                        <input className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1" placeholder="Ethereum Native Currency" onChange={(e) => {setTokenAddress(e.target.value)}} />
                        <small className={`${tokenAddressError ? "block text-red-400" : "hidden"} mt-2`}>{tokenAddressError}</small>
                    </div>
                    <div>
                        <div>List of addresses in CSV</div>
                        <textarea className="w-full p-2 h-[200px] overflow-y-auto border-2 border-[2px] border-[#FFFFFF17] rounded-md bg-transparent" value={csvData}></textarea>
                        <div className="text-right py-4">
                            <input className="hidden" type="file" accept=".csv" id="upload-button" onChange={handleChange} />
                            <label className="border-[2px] border-[#FFFFFF17] rounded-md px-8 py-2" htmlFor="upload-button">Upload CSV</label>
                            <small className={`${csvDataError ? "block text-red-400" : "hidden"} mt-2 text-center`}>{csvDataError}</small>
                        </div>
                    </div>
                </div>
                <button className="w-full bg-black text-white py-2 rounded-md" onClick={nextPage}>Continue</button>
            </div>
        </div>
    );
}