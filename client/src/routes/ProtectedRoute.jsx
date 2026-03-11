import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import VideoLoader from '../components/common/videoLoader/VideoLoader';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <VideoLoader />;
    }

    if (!user) {
        return (
            <Navigate 
            to="/login"
            state={{ from: location.pathname }}
            replace />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;