import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const { currentuser } = useAuth();

function RoutGuard() {
    return currentuser.uid ? <Outlet /> : <Navigate to={'/login'} />
}

export default RoutGuard