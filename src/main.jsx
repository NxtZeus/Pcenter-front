// src/main.jsx
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
import { CarritoProvider } from './components/carritoContext/CarritoContext.jsx';
import MainLayout from './components/layout/MainLayout';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Header from './components/layout/Header';
import InfoProducto from './pages/InfoProductos.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Inicio />,
      },
      {
        path: '/productos',
        element: <Productos />,
      },
      {
        path: '/producto/:id',
        element: <InfoProducto />,
      },
      {
        path: '/contacto',
        element: <Header />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registro',
    element: <Registro />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <RouterProvider router={router} />
      </CarritoProvider>
    </AuthProvider>
  </React.StrictMode>,
);