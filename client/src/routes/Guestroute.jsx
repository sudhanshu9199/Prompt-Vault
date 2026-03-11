import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import VideoLoader from '../components/common/videoLoader/VideoLoader';

const Guestroute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <VideoLoader />
    }
  return user ? <Navigate to="/" replace/> : <Outlet />
}

export default Guestroute;