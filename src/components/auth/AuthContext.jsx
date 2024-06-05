import { createContext, useState, useEffect } from 'react';
import { obtenerUsuario } from '../apis/Api';

// Crear el contexto
export const AuthContext = createContext();

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [estaLogueado, setEstaLogueado] = useState(false);
    const [esSuperusuario, setEsSuperusuario] = useState(false);
    const [primerNombre, setPrimerNombre] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setEstaLogueado(true);
            obtenerDetallesUsuario(token);
        }
    }, []);

    const obtenerDetallesUsuario = async (token) => {
        try {
            const usuario = await obtenerUsuario(token);
            setEsSuperusuario(usuario.is_superuser);
            setPrimerNombre(usuario.first_name);
        } catch (error) {
            console.error('Error al obtener los detalles del usuario:', error);
        }
    };

    const login = (token) => {
        localStorage.setItem('token', token);
        setEstaLogueado(true);
        obtenerDetallesUsuario(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setEstaLogueado(false);
        setEsSuperusuario(false);
        setPrimerNombre('');
    };

    return (
        <AuthContext.Provider value={{ estaLogueado, setEstaLogueado, login, logout, esSuperusuario, primerNombre }}>
            {children}
        </AuthContext.Provider>
    );
};
