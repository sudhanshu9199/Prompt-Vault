import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';
import VideoLoader from '../components/common/videoLoader/VideoLoader';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <VideoLoader />;
    }

    return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;