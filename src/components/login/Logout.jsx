import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../components/auth/AuthContext';

function Logout() {
    // Estados para manejar los mensajes de error y éxito al cerrar sesión
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Contexto de autenticación
    const { logout } = useContext(AuthContext);

    // URL de la API de logout
    const urlLogout = 'http://127.0.0.1:8000/api/logout/';

    // Función para manejar el cierre de sesión del usuario
    const handleLogout = async () => {
        setError(null); // Reinicia el error al intentar cerrar sesión previo

        try {
            const token = localStorage.getItem('token'); // Obtiene el token de localStorage

            if (!token) {
                setError('No se encontró el token de autenticación');
                return;
            }

            const response = await axios.post(urlLogout, null, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            if (response.status === 200) {
                logout(); // Llama a la función logout del contexto de autenticación
                setSuccessMessage('¡Cierre de sesión exitoso!'); // Mensaje de éxito al cerrar sesión
                console.log('Token eliminado:', token);
            } else {
                setError('Error inesperado al cerrar sesión');
            }
        } catch (err) {
            if (err.response) {
                // El servidor respondió con un error de estado 
                setError(err.response.data.detail || 'Error al cerrar sesión');
            } else if (err.request) {
                // La solicitud se hizo pero no hubo respuesta
                setError('Error de conexión con el servidor');
            } else {
                // Algo más sucedió al configurar la solicitud que provocó un error
                setError('Error al procesar la solicitud de cierre de sesión');
            }
        }
    };

    return (
        <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200">
            Cerrar sesión
        </button>
    );
}

export default Logout;
