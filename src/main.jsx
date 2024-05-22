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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
      {/* HEADER */}
      <RouterProvider router={router} />
      {/* FOOTER */}
  </React.StrictMode>,
);
