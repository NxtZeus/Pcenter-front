import React, { useState } from 'react';
import axios from 'axios';

export default function Registro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Campo para confirmar contraseña
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');

    const handleRegistro = async (e) => {
        e.preventDefault();
        setError(null);

        // Validación básica de contraseñas
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const urlRegistro = 'http://127.0.0.1:8000/api/registro/';

        try {
            const response = await axios.post(urlRegistro, {
                email,
                password // Enviamos solo la contraseña, no es necesario confirmPassword
            });

            if (response.status === 201) { // 201 Created para registro exitoso
                setSuccessMessage('¡Registro exitoso!');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
                // Aquí podrías redirigir al usuario a la página de inicio de sesión
            } else {
                setError(response.data.detail || 'Error al registrar usuario');
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Error de conexión con el servidor');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleRegistro}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="apellidos" className="block text-gray-700 text-sm font-bold mb-2">Apellidos:</label>
                    <input
                        type="text"
                        id="apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="direccion" className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
                    <input
                        type="text"
                        id="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="ciudad" className="block text-gray-700 text-sm font-bold mb-2">Ciudad:</label>
                    <input
                        type="text"
                        id="ciudad"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="pais" className="block text-gray-700 text-sm font-bold mb-2">País:</label>
                    <input
                        type="text"
                        id="pais"
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="codigoPostal" className="block text-gray-700 text-sm font-bold mb-2">Código Postal:</label>
                    <input
                        type="text"
                        id="codigoPostal"
                        value={codigoPostal}
                        onChange={(e) => setCodigoPostal(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                        Confirmar Contraseña:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Registrarse
                    </button>
                </div>

            </form>
        </div>
    );
}
