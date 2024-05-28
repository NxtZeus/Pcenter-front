import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/auth/AuthContext';
import Header from '../Header';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const urlLogin = 'http://127.0.0.1:8000/api/login/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post(urlLogin, { 
                email, 
                password 
            });

            if (response && response.status === 200 && response.data) {
                login(response.data.token);
                setSuccessMessage('¡Inicio de sesión exitoso!');
                navigate('/');
            } else {
                setError('Respuesta inesperada del servidor');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.detail || 'Credenciales incorrectas');
            } else {
                setError('Error de red o servidor no disponible');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-gradient-to-r from-black to-yellow-500 rounded-[26px] m-4 w-full max-w-lg">
                <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg p-8 md:p-12 m-2">
                    <h1 className="pt-8 pb-6 font-bold text-5xl text-center">Iniciar Sesión</h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
                        
                        <div>
                            <label htmlFor="email" className="block mb-2 text-lg">Email</label>
                            <input
                                id="email"
                                className="border p-4 shadow-md border-gray-300 rounded-lg w-full"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-lg">Contraseña</label>
                            <input
                                id="password"
                                className="border p-4 shadow-md border-gray-300 rounded-lg w-full"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className="bg-gradient-to-r from-black to-yellow-500 shadow-lg mt-8 p-4 text-white rounded-lg w-full hover:scale-105 hover:from-yellow-500 hover:to-black transition duration-300 ease-in-out"
                            type="submit"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <div className="flex flex-col mt-6 items-center justify-center text-lg">
                        <h3>
                            <span className="cursor-default">¿No tienes una cuenta?</span>
                            <a
                                className="group text-yellow-400 transition-all duration-100 ease-in-out"
                                href="/registro"
                            >
                                <span
                                    className="bg-left-bottom ml-1 bg-gradient-to-r from-yellow-400 to-yellow-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                >
                                    Regístrate
                                </span>
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
