import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
    // Estados para manejar los valores del formulario y los mensajes de error y éxito al registrarse
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
    const navigate = useNavigate();

    // Función para validar la contraseña del usuario al registrarse
    const validatePassword = (password) => {
        const minLength = 8;
        const maxLength = 30;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-]/.test(password);

        if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || password.length > maxLength) {
            return 'La contraseña debe tener al menos 8 caracteres y 30 de máximo, una mayúscula, una minúscula, un número y un carácter especial.';
        }
        return null;
    };

    // Función para manejar el registro de usuario
    const handleRegistro = async (e) => {
        e.preventDefault();
        setError(null);

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const urlRegistro = 'https://tfg-backend-production-5a6a.up.railway.app/api/registro/';

        try {
            // Realizar la solicitud de registro a la API con los datos del formulario
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

            // Manejar la respuesta del servidor al registro de usuario exitoso o fallido
            if (response.status === 201) {
                setSuccessMessage('¡Registro exitoso!');
                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión después de registrarse con éxito
                }, 3000);
            } else {
                setError(response.data.detail || 'Error al registrar usuario');
            }
        } catch (err) {
            // Manejar errores de conexión con el servidor o errores en los datos del formulario, como un email ya registrado
            if (err.response?.data?.email) {
                setError('El email ya está registrado');
            }
            else {
                setError(err.response?.data?.detail || 'Error de conexión con el servidor');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-gradient-to-r from-black to-custom-azul rounded-[26px] m-4 w-full max-w-4xl">
                <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg p-6 md:p-10 m-2">
                    <h1 className="pt-8 pb-6 text-custom-azul font-bold text-4xl md:text-5xl text-center">Registrarse</h1>
                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">Registrado correctamente.</span>
                        </div>
                    )}
                    {error && 
                        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</p>
                    }
                    <form onSubmit={handleRegistro} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="nombre" className="block mb-2 text-lg">Nombre</label>
                            <input
                                id="nombre"
                                className="border p-3 shadow-md border-custom-azul rounded-lg w-full"
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
                                className="border p-3 shadow-md border-custom-azul rounded-lg w-full"
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
                                className="border p-3 shadow-md border-custom-azul rounded-lg w-full"
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
                                className="border p-3 shadow-md border-custom-azul rounded-lg w-full"
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
                                className="border p-3 shadow-md border-custom-azul rounded-lg w-full"
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
                                className="border p-3 shadow-md border-custom-azul rounded-lg w-full"
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
                                className="border p-3 shadow-md border-custom-azul rounded-lg w-full"
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
                                className="border p-3 shadow-md border-custom-azul rounded-lg w-full"
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
                                className="border p-3 shadow-md border-custom-azul rounded-lg w-full"
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
                                className="border p-3 shadow-md border-custom-azul rounded-lg w-full"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <button
                                className="bg-gradient-to-r from-black to-custom-azul shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-custom-azul hover:to-black transition duration-300 ease-in-out"
                                type="submit"
                            >
                                REGISTRARSE
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col mt-4 items-center justify-center text-md col-span-1 md:col-span-2">
                        <h3>
                            <span className="cursor-default">¿Ya tienes una cuenta?</span>
                            <a
                                className="group text-custom-azul transition-all duration-100 ease-in-out"
                                href="/login"
                            >
                                <span
                                    className="bg-left-bottom ml-1 bg-gradient-to-r from-custom-azul to-custom-azul bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                >
                                    Iniciar Sesión
                                </span>
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
