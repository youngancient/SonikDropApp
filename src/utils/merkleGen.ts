import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { ethers } from "ethers";

// make this function modularized
// so that it can be imported in other scripts
// it should take in as argument, an array of Objects which represent each airdrop entity
//[{address : 0xdead, amount : 1000000000000000}, {}]
// should return the root hash of the merkle tree and the proofs for each entity

export interface AirdropEntity {
  address: string;
  amount: string; // use string for large integers to prevent overflow
}

export function generateMerkleTree(entities: AirdropEntity[]) {
  // Generate leaf nodes
  const leaves = entities.map((entity) =>
    keccak256(
      ethers.solidityPacked(
        ["address", "uint256"],
        [entity.address, entity.amount]
      )
    )
  );

  // Create the Merkle Tree
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  // Get the Merkle Root
  const rootHash = tree.getHexRoot();

  // Generate output which combines proof, amount and merkle proof for each entity
  const output = entities.map((entity, index) => {
    const leaf = leaves[index];
    return {
      address: entity.address,
      amount: entity.amount,
      proofs: tree.getHexProof(leaf),
    };
  });

  return { rootHash, output };
}

export function generateMerkleTreeFromAddresses(addresses: string[]) {
  // Generate leaf nodes (hash only the address)
  const leaves = addresses.map((address) =>
    keccak256(ethers.solidityPacked(["address"], [address]))
  );

  // Create the Merkle Tree
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  // Get the Merkle Root
  const rootHash = tree.getHexRoot();

  // Generate output which includes address and proof
  const output = addresses.map((address, index) => {
    const leaf = leaves[index];
    return {
      address,
      proofs: tree.getHexProof(leaf),
    };
  });

  return { rootHash, output, tree };
}
