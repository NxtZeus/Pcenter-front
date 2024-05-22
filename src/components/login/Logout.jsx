import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Auth/AuthProvider';

function Logout() {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const urlLogout = 'http://127.0.0.1:8000/api/logout/';

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(urlLogout, null, { // Envío del token en la cabecera
        headers: {
          'Authorization': `Token ${token}`
        }
      });

      if (response.status === 200) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null); // Limpia los datos del usuario en el contexto
        // Opcional: redirige al usuario a la página de inicio de sesión
        setSuccessMessage('¡Cierre de sesión exitoso!');
        navigate('/login')
      } else {
        setError('Error inesperado al cerrar sesión'); // Mensaje de error más genérico
      }
    } catch (err) {
      if (err.response) {
        // El servidor respondió con un error
        setError(err.response.data.result || 'Error al cerrar sesión');
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
    </div>
  );
}

export default Logout;