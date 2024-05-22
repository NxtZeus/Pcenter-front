import React, { useState } from 'react';
import axios from 'axios';

function Logout() {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const urlLogout = 'http://127.0.0.1:8000/api/logout/';

    const handleLogout = async () => {
        setError(null); // Reinicia el error al intentar cerrar sesión

        try {
            const token = localStorage.getItem('token');

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
                localStorage.removeItem('token');
                setSuccessMessage('¡Cierre de sesión exitoso!'); // Mensaje de éxito
                console.log('Token eliminado:', token);
            } else {
                setError('Error inesperado al cerrar sesión');
            }
        } catch (err) {
            if (err.response) {
                // El servidor respondió con un error
                setError(err.response.data.detail || 'Error al cerrar sesión');
            } else if (err.request) {
                // La solicitud se hizo pero no hubo respuesta
                setError('Error de conexión con el servidor');
            } else {
                // Algo más sucedió al configurar la solicitud
                setError('Error al procesar la solicitud de cierre de sesión');
            }
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Cerrar Sesión</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
}

export default Logout;
