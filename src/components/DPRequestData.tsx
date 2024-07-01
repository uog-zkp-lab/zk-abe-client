import { useState } from 'react';
import { retrieveACP } from '../utils/api';
import { mintToken } from '../utils/blockchain';

const DPRequestData: React.FC = () => {
  const [uid, setUid] = useState('');
  const [acp, setAcp] = useState<any>(null);
  const [tokenHash, setTokenHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRequest = async () => {
    try {
      const data = await retrieveACP(uid);
      setAcp(data);
      if (data) {
        const hash = await mintToken(data.proof);
        setTokenHash(hash);
        alert(`Received ACP: ${JSON.stringify(data)}\nMinted Token Hash: ${hash}`);
      }
    } catch (err) {
      setError('Error retrieving ACP or minting token. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h2>DP Request Data</h2>
      <input
        type="text"
        placeholder="Enter UID"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
      />
      <button onClick={handleRequest}>Request ACP</button>
      {acp && <pre>{JSON.stringify(acp, null, 2)}</pre>}
      {tokenHash && <p>Minted Token Hash: {tokenHash}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DPRequestData;
