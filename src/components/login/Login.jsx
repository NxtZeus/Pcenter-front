import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../Auth/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
    const { setIsAuthenticated, setUser, isAuthenticated, user } = useContext(AuthContext);
    const [email, setEmail] = useState(''); // Cambiamos username por email
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [token, setToken] = useState(null);

    const urlRegistro = 'http://127.0.0.1:8000/api/login/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        axios.post(urlRegistro, {
            email,
            password
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    setUser(response.data.user);
                    setSuccessMessage('¡Inicio de sesión exitoso!');
                    console.log('Token:', response.data.token);
                }
            })
            .catch(error => {
                setError(error.response.data.detail || 'Credenciales incorrectas');
            });
    };

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        if (token) {
            setIsAuthenticated();
        }
    },[]);

    if (isAuthenticated) {
        return <Navigate to="/perfil" replace={true} />;
    }
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}  // Usamos email en lugar de username
                        onChange={(e) => setEmail(e.target.value)} // Actualizamos el estado de email
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Contraseña:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </div>
    );
}