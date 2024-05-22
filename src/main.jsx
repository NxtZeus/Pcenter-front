import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './components/login/Login.jsx'
import Registro from './components/registro/Registro.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import AuthProvider from './components/Auth/AuthProvider.jsx'
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx'
import Perfil from './components/perfil/Perfil.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/perfil",
    element: <ProtectedRoute><Perfil /></ProtectedRoute>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {/* HEADER */}
      <RouterProvider router={router} />
      {/* FOOTER */}
    </AuthProvider>
  </React.StrictMode>,
)
