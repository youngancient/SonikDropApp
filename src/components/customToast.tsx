import { ToastContentProps } from "react-toastify";

interface CustomToastData {
  text: string;
  url: string;
}

export const ClaimDropToastMsg: React.FC<
  ToastContentProps & { data: CustomToastData }
> = ({ data }) => {
  return (
    <div className="font-sans">
        <p className="text-sm text-gray-800 mb-3">{data.text}</p>
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        View Transaction
      </a>
    </div>
  );
};
