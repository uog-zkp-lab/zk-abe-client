import { useState } from 'react';
import { generateMerkleRoot } from '@/utils/merkle';

interface MerkleRootGeneratorProps {
  jsonData: any;
  onMerkleRootGenerated: (root: string) => void;
}

const MerkleRootGenerator: React.FC<MerkleRootGeneratorProps> = ({ jsonData, onMerkleRootGenerated }) => {
  const [merkleRoot, setMerkleRoot] = useState<string>('');

  const handleGenerate = () => {
    const root = generateMerkleRoot(jsonData);
    setMerkleRoot(root);
    onMerkleRootGenerated(root);
  };

  return (
    <div>
      <button onClick={handleGenerate}>Generate Merkle Root</button>
      {merkleRoot && <p>Merkle Root: {merkleRoot}</p>}
    </div>
  );
};

export default MerkleRootGenerator;
