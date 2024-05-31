import { createContext, useState, useEffect } from 'react';
import { getUsuario } from '../apis/Api';

// Crear el contexto
export const AuthContext = createContext();

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSuperuser, setIsSuperuser] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            fetchUserDetails(token);
        }
    }, []);

    const fetchUserDetails = async (token) => {
        try {
            const user = await getUsuario(token);
            console.log('Fetched user details:', user);  // Log para verificar los detalles del usuario
            setIsSuperuser(user.is_superuser);  // Verifica que 'user' contiene 'is_superuser'
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        fetchUserDetails(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsSuperuser(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isSuperuser }}>
            {children}
        </AuthContext.Provider>
    );
};