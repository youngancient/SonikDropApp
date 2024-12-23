export const formatAddress = (walletAddress: string): string => {
  const firstPart = walletAddress.slice(0, 4);
  const lastPart = walletAddress.slice(-6);
  return `${firstPart}...${lastPart}`;
};

export const extractChainId = (chainString: string): string => {
  return chainString.split(":")[1];
};

export const copyToClipboard = (text: string, onSuccess: () => void): void => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard!");
      onSuccess(); // Call the provided function
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
};
