

export async function getPoapImageFromBaseURI(baseURI: string): Promise<string | null> {
    try {
      const metadataUrl = baseURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const res = await fetch(metadataUrl);
      if (!res.ok) return null;
  
      const metadata = await res.json();
      const imageIpfs = metadata.image;
  
      return imageIpfs?.replace("ipfs://", "https://ipfs.io/ipfs/") || null;
    } catch (err) {
      console.error("Failed to load image from IPFS:", err);
      return null;
    }
  }
  