import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [...]; // ABI of the smart contract

export const registerDP = async (merkleRoot: string): Promise<string> => {
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const transaction = await contract.methods.register(merkleRoot).send({ from: accounts[0] });
  return transaction.transactionHash;
};

export const mintToken = async (proof: any): Promise<string> => {
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const transaction = await contract.methods.mintToken(proof).send({ from: accounts[0] });
  return transaction.transactionHash;
};
