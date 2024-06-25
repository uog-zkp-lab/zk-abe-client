import { useState } from 'react';
import { retrieveACP } from '../utils/api.tsx';

const DPRequestData: React.FC = () => {
  const [uid, setUid] = useState('');
  const [acp, setAcp] = useState<any>(null);

  const handleRequest = async () => {
    const data = await retrieveACP(uid);
    setAcp(data);
    alert(`Received ACP: ${JSON.stringify(data)}`);
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
    </div>
  );
};

export default DPRequestData;
