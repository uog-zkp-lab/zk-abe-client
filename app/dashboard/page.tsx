import { useState } from 'react';
import FileUpload from 'components/FileUpload.tsx';
import MerkleRootGenerator from '../components/MerkleRootGenerator';
import RegisterTransaction from '../components/RegisterTransaction';
import DataQuery from '../components/DataQuery';
import MintToken from '../components/MintToken';

const Dashboard: React.FC = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [merkleRoot, setMerkleRoot] = useState<string>('');
  const [uid, setUid] = useState<string>('');

  return (
    <div>
      <h1>DP Dashboard</h1>
      <FileUpload onFileUpload={(data) => { setJsonData(data); setUid(data.uid); }} />
      {jsonData && (
        <MerkleRootGenerator
          jsonData={jsonData}
          onMerkleRootGenerated={setMerkleRoot}
        />
      )}
      {merkleRoot && (
        <RegisterTransaction merkleRoot={merkleRoot} />
      )}
      <DataQuery uid={uid} />
      <MintToken proof={merkleRoot} />
    </div>
  );
};

export default Dashboard;
