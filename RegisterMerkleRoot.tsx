import React from 'react';

interface RegisterMerkleRootProps {
  merkleRoot: string;
  onRegister: (root: string) => void;
}

const RegisterMerkleRoot: React.FC<RegisterMerkleRootProps> = ({ merkleRoot, onRegister }) => {
  const handleRegister = () => {
    onRegister(merkleRoot);
  };

  return (
    <div>
      <h3>Merkle Root: {merkleRoot}</h3>
      <button onClick={handleRegister}>Register Merkle Root</button>
    </div>
  );
}

export default RegisterMerkleRoot;
