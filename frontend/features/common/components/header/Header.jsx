import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function Header() {
  const { user } = useAuth();
  return (
    <div>
      {user ? (
        <NavLink>add new car</NavLink>
      ) : (
        <>
          <NavLink to={'/login'}>login</NavLink>
          <NavLink to={'/register'}>register</NavLink>
        </>
      )}
    </div>
  );
}

export default Header;