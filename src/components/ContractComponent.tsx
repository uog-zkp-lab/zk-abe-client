import { useReadContract, useWriteContract } from 'wagmi';
import pdtk from '../contracts/PrivateDataToken.json'; // Adjust the path contract ABI
import { useState } from 'react';

const abi = pdtk.abi;
// const contractAddress = (process.env.PDTK_ADDRESS as string) || '';
const contractAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b";

const ContractComponent = () => {
  const [uri, setUri] = useState('')

  const { write } = useWriteContract({
    address: contractAddress,
    abi: abi,
    functionName: 'setURI',
    args: ['localhost:1234'],
  });

  const handleSetURI = async ( ) => {
    write();
  }

  const handleReadURI = async () => {
    // const { data, isError, isLoading } = useReadContract({
    //   address: contractAddress,
    //   abi: abi,
    //   functionName: 'uri',
    //   args: ['123'],
    // });

    const { data: balance } = useReadContract({
      ...wagmiContractConfig,
      functionName: 'balanceOf',
      args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
    })

    console.log(data);     
    // setUri(data);
  }

  return (
    <div>
      {/* {isLoading && <div>Loading...</div>} */}
      <button onClick={() => handleSetURI()}>Write to Contract</button>
      <button onClick={() => handleReadURI()}>Write to Contract</button>
    </div>
  );
};

export default ContractComponent;
