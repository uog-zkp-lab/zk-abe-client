import { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

const DORegister: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleConnectWallet = async () => {
    const provider: any = await detectEthereumProvider();
    if (provider) {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleRegister = async () => {
    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = '0xSmartContractAddress';
    const contractABI = [ /* Add contract ABI here */ ];
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    let fileHash = '';
    if (file) {
      fileHash = '0xMockFileHash';
    }

    try {
      const tx = await contract.registerDataOwner(data, fileHash);
      await tx.wait();
      setTransactionHash(tx.hash);
      alert(`Transaction Hash: ${tx.hash}`);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <div>
      <h2>Data Owner Registration</h2>
      <button onClick={handleConnectWallet}>Connect MetaMask</button>
      <p>Connected Account: {account}</p>
      <input
        type="text"
        placeholder="Enter data or metadata"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleRegister}>Register</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default DORegister;
