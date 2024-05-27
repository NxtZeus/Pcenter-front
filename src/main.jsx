import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Registro from './components/registro/Registro';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './components/login/Login';
import { AuthProvider } from './components/auth/AuthContext';
import Header from './components/header/Header.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: 
    <Login />,
  },
  {
    path: '/registro',
    element: <Registro />,
  },
  {
    path: '/contacto',
    element: <Header />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
