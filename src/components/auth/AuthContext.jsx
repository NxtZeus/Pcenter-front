import { createContext, useState, useEffect } from 'react';
import { getUsuario } from '../apis/Api';

// Crear el contexto
export const AuthContext = createContext();

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSuperuser, setIsSuperuser] = useState(false);
    const [firstNombre, setFirstNombre] = useState('');

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
            setIsSuperuser(user.is_superuser);
            setFirstNombre(user.first_name);
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
        setFirstNombre('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, isSuperuser, firstNombre }}>
            {children}
        </AuthContext.Provider>
    );
};
