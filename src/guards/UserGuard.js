import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const { currentUser } = useAuth();

function UserGuard() {
    return currentUser.uid ? <Navigate to={'/'} /> : <Outlet />
}

export default UserGuard;