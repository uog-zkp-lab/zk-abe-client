import { useState } from 'react';
import { mintToken } from '../utils/blockchain';

interface MintTokenProps {
  proof: any;
}

const MintToken: React.FC<MintTokenProps> = ({ proof }) => {
  const [tokenHash, setTokenHash] = useState<string>('');

  const handleMint = async () => {
    const hash = await mintToken(proof);
    setTokenHash(hash);
  };

  return (
    <div>
      <button onClick={handleMint}>Mint Token</button>
      {tokenHash && <p>Token Hash: {tokenHash}</p>}
    </div>
  );
};

export default MintToken;
