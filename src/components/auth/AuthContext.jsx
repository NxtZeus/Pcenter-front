import { createContext, useState, useEffect } from 'react';
import { obtenerUsuario } from '../apis/Api';

// Crear el contexto de autenticación para traerlo en otros componentes
export const AuthContext = createContext();

// Crear el proveedor del contexto de autenticación y todo lo relacionado con la autenticación
export const AuthProvider = ({ children }) => {
    // Estado para verificar si el usuario está logueado
    const [estaLogueado, setEstaLogueado] = useState(false);
    // Estado para verificar si el usuario es superusuario
    const [esSuperusuario, setEsSuperusuario] = useState(false);
    // Estado para almacenar el primer nombre del usuario
    const [primerNombre, setPrimerNombre] = useState('');

    // Efecto que se ejecuta al montar el componente para verificar si el usuario está logueado y obtener los detalles del usuario si lo está para utilizarlos después
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setEstaLogueado(true);
            obtenerDetallesUsuario(token);
        }
    }, []);

    // Función para obtener los detalles del usuario, como el nombre y si es superusuario
    const obtenerDetallesUsuario = async (token) => {
        try {
            const usuario = await obtenerUsuario(token);
            setEsSuperusuario(usuario.is_superuser);
            setPrimerNombre(usuario.first_name);
        } catch (error) {
            console.error('Error al obtener los detalles del usuario:', error);
        }
    };

    // Función para iniciar sesión, almacenar el token en localStorage y obtener los detalles del usuario
    const login = (token) => {
        localStorage.setItem('token', token);
        setEstaLogueado(true);
        obtenerDetallesUsuario(token);
    };

    // Función para cerrar sesión, eliminar el token del localStorage y los detalles del usuario
    const logout = () => {
        localStorage.removeItem('token');
        setEstaLogueado(false);
        setEsSuperusuario(false);
        setPrimerNombre('');
    };

    // Provee el contexto de autenticación a los componentes hijos, para envolver la aplicación y la autenticación esté disponible en toda la aplicación
    return (
        <AuthContext.Provider value={{ estaLogueado, setEstaLogueado, login, logout, esSuperusuario, primerNombre }}>
            {children}
        </AuthContext.Provider>
    );
};