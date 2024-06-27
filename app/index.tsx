import type { NextPage } from 'next';
import ContractComponent from '../components/ContractComponent';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Welcome to the Contract Interaction Page</h1>
      <ContractComponent />
    </div>
  );
};

export default Home;
