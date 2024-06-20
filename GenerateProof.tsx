import React from 'react';

interface GenerateProofProps {
  acpKeys: any;
  onGenerateProof: (keys: any) => void;
}

const GenerateProof: React.FC<GenerateProofProps> = ({ acpKeys, onGenerateProof }) => {
  const handleGenerate = () => {
    onGenerateProof(acpKeys);
  };

  return (
    <div>
      <h3>ACP Keys: {JSON.stringify(acpKeys)}</h3>
      <button onClick={handleGenerate}>Generate Proof</button>
    </div>
  );
}

export default GenerateProof;
