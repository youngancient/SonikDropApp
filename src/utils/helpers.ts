export function formatAddress(walletAddress: string): string {
  const firstPart = walletAddress.slice(0, 4);
  const lastPart = walletAddress.slice(-6);
  return `${firstPart}...${lastPart}`;
}

export function extractChainId(chainString: string): string {
  return chainString.split(":")[1];
}
