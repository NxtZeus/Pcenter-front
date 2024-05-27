import React, { useState } from 'react';
import axios from 'axios';

export default function Registro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleRegistro = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const urlRegistro = 'http://127.0.0.1:8000/api/registro/';

        try {
            const response = await axios.post(urlRegistro, {
                username: email,
                email: email,
                password: password,
                first_name: nombre,
                last_name: apellidos,
                direccion: direccion,
                ciudad: ciudad,
                pais: pais,
                codigo_postal: codigoPostal,
                telefono: telefono
            });

            if (response.status === 201) {
                setSuccessMessage('¡Registro exitoso!');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } else {
                setError(response.data.detail || 'Error al registrar usuario');
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Error de conexión con el servidor');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-gradient-to-r from-black to-yellow-500 rounded-[26px] m-4 w-full max-w-4xl">
                <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg p-6 md:p-10 m-2">
                    <h1 className="pt-8 pb-6 font-bold text-5xl text-center">Registrarse</h1>
                    <form onSubmit={handleRegistro} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {error && <p className="text-red-500 text-sm mb-2 col-span-1 md:col-span-2">{error}</p>}
                        {successMessage && <p className="text-green-500 text-sm mb-2 col-span-1 md:col-span-2">{successMessage}</p>}
                        
                        <div>
                            <label htmlFor="nombre" className="block mb-2 text-lg">Nombre</label>
                            <input
                                id="nombre"
                                className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="apellidos" className="block mb-2 text-lg">Apellidos</label>
                            <input
                                id="apellidos"
                                className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                                type="text"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="direccion" className="block mb-2 text-lg">Dirección</label>
                            <input
                                id="direccion"
                                className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                                type="text"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="ciudad" className="block mb-2 text-lg">Ciudad</label>
                            <input
                                id="ciudad"
                                className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                                type="text"
                                value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="pais" className="block mb-2 text-lg">País</label>
                            <input
                                id="pais"
                                className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                                type="text"
                                value={pais}
                                onChange={(e) => setPais(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="codigoPostal" className="block mb-2 text-lg">Código Postal</label>
                            <input
                                id="codigoPostal"
                                className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                                type="text"
                                value={codigoPostal}
                                onChange={(e) => setCodigoPostal(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="telefono" className="block mb-2 text-lg">Nº Teléfono</label>
                            <input
                                id="telefono"
                                className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                                type="text"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-lg">Email</label>
                            <input
                                id="email"
                                className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
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
                                className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-lg">Confirmar Contraseña</label>
                            <input
                                id="confirmPassword"
                                className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <button
                                className="bg-gradient-to-r from-black to-yellow-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-yellow-500 hover:to-black transition duration-300 ease-in-out"
                                type="submit"
                            >
                                REGISTRARSE
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col mt-4 items-center justify-center text-sm col-span-1 md:col-span-2">
                        <h3>
                            <span className="cursor-default">¿Ya tienes una cuenta?</span>
                            <a
                                className="group text-yellow-400 transition-all duration-100 ease-in-out"
                                href="/login"
                            >
                                <span
                                    className="bg-left-bottom ml-1 bg-gradient-to-r from-yellow-400 to-yellow-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                >
                                    Iniciar Sesión
                                </span>
                            </a>
                        </h3>
                    </div>

                    <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm col-span-1 md:col-span-2">
                        <p className="cursor-default">
                            Al registrarte, aceptas nuestros
                            <a className="group text-yellow-400 transition-all duration-100 ease-in-out" href="#">
                                <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-yellow-400 to-yellow-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                    Términos
                                </span>
                            </a>
                            y
                            <a className="group text-yellow-400 transition-all duration-100 ease-in-out" href="#">
                                <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-yellow-400 to-yellow-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                    Política de Privacidad
                                </span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
