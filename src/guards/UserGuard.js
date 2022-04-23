import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';


function UserGuard() {
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to={'/'} /> : <Outlet />
}

export default UserGuard;