import crypto from 'crypto';

/**
 * Generates a Merkle Root from the given JSON data.
 * @param jsonData - The JSON data to generate the Merkle Root from.
 * @returns The Merkle Root as a hexadecimal string.
 */
export const generateMerkleRoot = (jsonData: any[]): string => {
  // Flatten the JSON data and sort the items to ensure consistent Merkle root generation
  const flattenedData = jsonData.map((item: any): string => JSON.stringify(item)).sort();
  
  // Create leaf nodes by hashing each item
  const leafNodes = flattenedData.map((item: string): string => crypto.createHash('sha256').update(item).digest('hex'));
  
  // Build the Merkle tree and generate the root
  const merkleRoot = buildMerkleTree(leafNodes);
  
  return merkleRoot;
};

/**
 * Builds a Merkle Tree from the leaf nodes and returns the root.
 * @param leaves - The leaf nodes as hexadecimal strings.
 * @returns The Merkle Root as a hexadecimal string.
 */
const buildMerkleTree = (leaves: string[]): string => {
  if (leaves.length === 1) return leaves[0];
  
  // Pair up the leaves and hash their concatenations to form the next level
  const nextLevel: string[] = [];
  for (let i = 0; i < leaves.length; i += 2) {
    const left = leaves[i];
    const right = leaves[i + 1] || leaves[i]; // Duplicate last item if odd number of leaves
    const combinedHash = crypto.createHash('sha256').update(left + right).digest('hex');
    nextLevel.push(combinedHash);
  }
  
  // Recursively build the tree until we reach the root
  return buildMerkleTree(nextLevel);
};
