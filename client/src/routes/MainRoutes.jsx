import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
const Home = lazy(() => import('../pages/Home/Home'));

const Mainrouter = createBrowserRouter([
    {
        path: '/',
        element: <></>
    }
])