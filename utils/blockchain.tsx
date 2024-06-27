import { ethers } from 'ethers';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS';
const contractABI = [
  // Your contract ABI here
];

export const registerDP = async (merkleRoot: string, signer: ethers.Signer): Promise<string> => {
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const transaction = await contract.register(merkleRoot);
  await transaction.wait();

  return transaction.hash;
};

export const mintToken = async (proof: any, signer: ethers.Signer): Promise<string> => {
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const transaction = await contract.mintToken(proof);
  await transaction.wait();

  return transaction.hash;
};

export const requestSecretKey = async (signer: ethers.Signer): Promise<string> => {
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const secretKey = await contract.requestSecretKey();
  return secretKey;
};
