import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/auth/AuthContext';

export default function Login() {
    // Estados para manejar los valores del formulario y los mensajes de error y éxito
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    
    // Contexto de autenticación para iniciar sesión
    const { login } = useContext(AuthContext);
    
    // Hook de navegación para redirigir al usuario después de iniciar sesión
    const navigate = useNavigate();

    // URL de la API de login
    const urlLogin = 'https://pcenter-back-production.up.railway.app/api/login/';

    // Función para manejar el inicio de sesión del usuario 
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Limpiar mensaje de error previo
        setSuccessMessage(null); // Limpiar mensaje de éxito previo

        try {
            // Realizar solicitud de inicio de sesión a la API con los datos del formulario
            const response = await axios.post(urlLogin, { 
                email, 
                password 
            });

            // Verificar la respuesta del servidor
            if (response && response.status === 200 && response.data) {
                // Iniciar sesión y guardar el token
                login(response.data.token);
                setSuccessMessage('¡Inicio de sesión exitoso!');
                navigate('/'); // Redirigir al usuario a la página principal después de iniciar sesión con éxito
            } else {
                setError('Respuesta inesperada del servidor');
            }
        } catch (error) {
            // Manejar errores de red o de credenciales incorrectas
            if (error.response) {
                setError(error.response.data.detail || 'Credenciales incorrectas');
            } else {
                setError('Error de red o servidor no disponible');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-gradient-to-r from-black to-custom-azul rounded-[26px] m-4 w-full max-w-lg">
                <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg p-6 md:p-12 m-2">
                    <h1 className="pt-8 pb-6 font-bold text-4xl md:text-5xl text-center">Iniciar Sesión</h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Mensajes de error y éxito */}
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
                        
                        {/* Campo de email */}
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

                        {/* Campo de contraseña */}
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

                        {/* Botón de inicio de sesión */}
                        <button
                            className="bg-gradient-to-r from-black to-custom-azul shadow-lg mt-6 md:mt-8 p-4 text-white rounded-lg w-full hover:scale-105 hover:from-custom-azul hover:to-black transition duration-300 ease-in-out"
                            type="submit"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    {/* Enlace a la página de registro */}
                    <div className="flex flex-col mt-6 items-center justify-center text-lg">
                        <h3>
                            <span className="cursor-default">¿No tienes una cuenta?</span>
                            <a
                                className="group text-custom-azul transition-all duration-100 ease-in-out"
                                href="/registro"
                            >
                                <span
                                    className="bg-left-bottom ml-1 bg-gradient-to-r from-custom-azul to-custom-azul bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
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
