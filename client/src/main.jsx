import { createRoot } from 'react-dom/client'
import './index.css'
import Mainrouter from './routes/MainRoutes.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx'
import { RouterProvider } from 'react-router';

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <RouterProvider router={Mainrouter} />
    </ThemeProvider>
)