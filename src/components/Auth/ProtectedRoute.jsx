import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext'; 

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? children : <Navigate to="/login" />; // Redirige si no está autenticado
}

export default ProtectedRoute;