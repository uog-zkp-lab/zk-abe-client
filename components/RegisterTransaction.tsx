import { useState } from 'react';
import { registerOnChain } from '../utils/blockchain';

interface RegisterTransactionProps {
  merkleRoot: string;
}

const RegisterTransaction: React.FC<RegisterTransactionProps> = ({ merkleRoot }) => {
  const [txHash, setTxHash] = useState<string>('');

  const handleRegister = async () => {
    const hash = await registerOnChain(merkleRoot);
    setTxHash(hash);
  };

  return (
    <div>
      <button onClick={handleRegister}>Register on Chain</button>
      {txHash && <p>Transaction Hash: {txHash}</p>}
    </div>
  );
};

export default RegisterTransaction;
