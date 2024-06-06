// Importaciones necesarias para la aplicación
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Registro from './components/registro/Registro';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/login/Login';
import { AuthProvider } from './components/auth/AuthContext';
import { CarritoProvider } from './components/carritoContext/CarritoContext.jsx';
import MainLayout from './components/layout/MainLayout';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import InfoProducto from './pages/InfoProductos.jsx';
import Perfil from './pages/Perfil.jsx';
import PasarelaPago from './pages/Pago.jsx';

// Define el router con las rutas de la aplicación
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Layout principal que envuelve las rutas anidadas
    children: [
      {
        path: '/',
        element: <Inicio />, // Página de inicio
      },
      {
        path: '/productos',
        element: <Productos />, // Página de productos
      },
      {
        path: '/producto/:id',
        element: <InfoProducto />, // Página de información del producto, recibe un ID de producto
      },
      {
        path: '/pago',
        element: <PasarelaPago />, // Página de pago
      },
      {
        path: '/perfil',
        element: <Perfil />, // Página de perfil del usuario
      }
    ],
  },
  {
    path: '/login',
    element: <Login />, // Página de login
  },
  {
    path: '/registro',
    element: <Registro />, // Página de registro
  },
]);

// Renderiza la aplicación en el elemento con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Proveedor de contexto de autenticación */}
      <CarritoProvider> {/* Proveedor de contexto del carrito */}
        <RouterProvider router={router} /> {/* Proveedor del router */}
      </CarritoProvider>
    </AuthProvider>
  </React.StrictMode>,
);
