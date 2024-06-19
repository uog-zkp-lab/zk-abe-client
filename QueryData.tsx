import React, { useState } from 'react';

interface QueryDataProps {
  onQuery: (uid: string) => void;
}

const QueryData: React.FC<QueryDataProps> = ({ onQuery }) => {
  const [uid, setUid] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUid(event.target.value);
  };

  const handleSubmit = () => {
    onQuery(uid);
  };

  return (
    <div>
      <input type="text" value={uid} onChange={handleChange} placeholder="Enter UID" />
      <button onClick={handleSubmit}>Query Data</button>
    </div>
  );
}

export default QueryData;
