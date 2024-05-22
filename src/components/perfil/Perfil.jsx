import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Importa axios para hacer peticiones
import AuthContext from '../Auth/AuthProvider';
import Logout from '../login/Logout';

function Perfil() {
    const { user, setUser, setIsAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/usuarios/detalles/', { // Endpoint de perfil en Django
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    setError('Error al obtener datos del usuario');
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setIsAuthenticated(false); // Si el token es inválido, cierra la sesión
                    setError('Sesión no válida. Por favor, inicia sesión nuevamente.');
                } else {
                    setError('Error al obtener datos del usuario');
                }
            } finally {
                setLoading(false); // Termina la carga
            }
        };

        fetchUserData();
    }, [setIsAuthenticated, setUser]); // Dependencias de useEffect

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"> 
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Perfil de Usuario</h2>

        {loading ? (
          <p className="text-center text-gray-500">Cargando información del usuario...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-4"> {/* Espacio entre elementos */}
            <div>
              <p className="text-gray-700 font-semibold">Nombre:</p>
              <p className="text-gray-600">{user.first_name}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Apellidos:</p>
              <p className="text-gray-600">{user.last_name}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Email:</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Dirección:</p>
              <p className="text-gray-600">{user.direccion}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Ciudad:</p>
              <p className="text-gray-600">{user.ciudad}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">País:</p>
              <p className="text-gray-600">{user.pais}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Código Postal:</p>
              <p className="text-gray-600">{user.codigo_postal}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Teléfono:</p>
              <p className="text-gray-600">{user.telefono}</p>
            </div>
            <button 
              onClick={() => alert(localStorage.getItem('token'))}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Mostrar Token
            </button>
            <Logout />
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;
