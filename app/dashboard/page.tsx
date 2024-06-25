import React, { useState } from 'react';
import FileUpload from '@components/FileUpload';
import MerkleRootGenerator from '@components/MerkleRootGenerator';
import RegisterTransaction from '@components/RegisterTransaction';
import DPRequestData from '@components/DPRequestData';

const Dashboard: React.FC = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [merkleRoot, setMerkleRoot] = useState<string>('');

  const handleFileUpload = (data: any) => {
    setJsonData(data);
  };

  const handleMerkleRootGenerated = (root: string) => {
    setMerkleRoot(root);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <MerkleRootGenerator jsonData={jsonData} onMerkleRootGenerated={handleMerkleRootGenerated} />
      {merkleRoot && <RegisterTransaction merkleRoot={merkleRoot} />}
      <DPRequestData />
    </div>
  );
};

export default Dashboard;
