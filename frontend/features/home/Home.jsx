import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return <div className='bg-black'>Home , {user}</div>;
}

export default Home;