import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './admin-loginpage/login/Login';
import { StrictMode } from 'react';
import ProtectedRoute from './ProtectedRoute';
import Forgot from './admin-loginpage/forgot/Forgot';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/forgot',
    element: <Forgot />,
  },
  {
    path: 'content',
    element: <ProtectedRoute />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
