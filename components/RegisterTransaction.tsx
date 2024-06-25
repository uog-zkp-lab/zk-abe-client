import { useState } from 'react';
import { registerDP } from '../utils/blockchain';

interface RegisterTransactionProps {
  merkleRoot: string;
}

const RegisterTransaction: React.FC<RegisterTransactionProps> = ({ merkleRoot }) => {
  const [txHash, setTxHash] = useState<string>('');

  const handleRegister = async () => {
    const hash = await registerDP(merkleRoot);
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
