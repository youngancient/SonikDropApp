import { ToastContentProps } from "react-toastify";

interface CustomToastData {
  text: string;
  onSign: () => void;
}

export const SiginToastMsg: React.FC<
  ToastContentProps & { data: CustomToastData }
> = ({ data }) => {
  return (
    <div className="font-sans">
      <p className="text-sm text-gray-800 mb-3">{data.text}</p>
      <button
        onClick={data.onSign}
        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors duration-200"
      >
        Sign Message
      </button>
    </div>
  );
};
