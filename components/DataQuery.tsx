import { useState } from 'react';

interface DataQueryProps {
  uid: string;
}

const DataQuery: React.FC<DataQueryProps> = ({ uid }) => {
  const [data, setData] = useState<any>(null);

  const handleQuery = async () => {
    const result = await fetch(`/api/query?uid=${uid}`);
    const data = await result.json();
    setData(data);
  };

  return (
    <div>
      <button onClick={handleQuery}>Query Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default DataQuery;
