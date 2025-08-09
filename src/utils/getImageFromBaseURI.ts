export async function getPoapImageFromBaseURI(baseURI: string): Promise<string | null> {
  try {
    // Ensure baseURI is a full IPFS gateway URL
    let metadataUrl = baseURI;
    if (metadataUrl.startsWith("ipfs://")) {
      metadataUrl = metadataUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
    } else if (!metadataUrl.startsWith("http")) {
      // If it's just a CID, prepend gateway URL
      metadataUrl = `https://ipfs.io/ipfs/${metadataUrl}`;
    }

    const res = await fetch(metadataUrl);
    if (!res.ok) return null;

    const metadata = await res.json();
    let imageIpfs = metadata?.image;

    if (!imageIpfs) return null;

    // Convert image CID or ipfs:// link to gateway URL
    if (imageIpfs.startsWith("ipfs://")) {
      imageIpfs = imageIpfs.replace("ipfs://", "https://ipfs.io/ipfs/");
    } else if (!imageIpfs.startsWith("http")) {
      imageIpfs = `https://ipfs.io/ipfs/${imageIpfs}`;
    }

    return imageIpfs;
  } catch (err) {
    console.error("Failed to load image from IPFS:", err);
    return null;
  }
}
