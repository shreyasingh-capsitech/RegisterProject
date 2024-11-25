import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth(); // Get the token from context
  if (!token) {
    // If no token, redirect to the login page
    return <Link to="/" />;
  }
  return children;
};

export default PrivateRoute;
