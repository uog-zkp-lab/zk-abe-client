import crypto from 'crypto';

/**
 * Generates a Merkle Root from the given JSON data.
 * @param jsonData - The JSON data to generate the Merkle Root from.
 * @returns The Merkle Root as a hexadecimal string.
 */
export const generateMerkleRoot = (jsonData: any): string => {
  const dataStr = JSON.stringify(jsonData);
  const hash = crypto.createHash('sha256');
  hash.update(dataStr);
  return hash.digest('hex');
};
