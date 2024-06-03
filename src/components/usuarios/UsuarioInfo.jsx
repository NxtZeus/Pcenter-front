import { useState } from 'react';

const UsuarioInfo = ({ usuario, onUpdateUsuario }) => {
    const [formData, setFormData] = useState({
        nombre: usuario.first_name || '',
        apellido: usuario.last_name || '',
        email: usuario.email || '',
        direccion: usuario.direccion || '',
        ciudad: usuario.ciudad || '',
        pais: usuario.pais || '',
        codigo_postal: usuario.codigo_postal || '',
        telefono: usuario.telefono || '',
        current_password: '',
        new_password: ''
    });

    const [changePassword, setChangePassword] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        setChangePassword(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { current_password, new_password, ...updateData } = formData;
        if (changePassword && current_password && new_password) {
            updateData.password = new_password;
        }
        // Mapear los nombres de los campos al formato que espera el backend
        const backendData = {
            first_name: updateData.nombre,
            last_name: updateData.apellido,
            email: updateData.email,
            direccion: updateData.direccion,
            ciudad: updateData.ciudad,
            pais: updateData.pais,
            codigo_postal: updateData.codigo_postal,
            telefono: updateData.telefono,
        };
        if (updateData.password) {
            backendData.password = updateData.password;
        }
        await onUpdateUsuario(backendData);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);  // Mensaje de éxito desaparece después de 3 segundos
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
            {showSuccessMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">Los cambios se han guardado correctamente.</span>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(formData).map((key) => (
                        key !== 'current_password' && key !== 'new_password' && (
                            <div key={key} className="mb-4">
                                <label htmlFor={key} className="block text-gray-700 font-medium mb-2">
                                    {key === 'nombre' ? 'Nombre' : 
                                     key === 'apellido' ? 'Apellido' : 
                                     key === 'direccion' ? 'Dirección' : 
                                     key === 'codigo_postal' ? 'Código Postal' : 
                                     key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                                </label>
                                <input
                                    type="text"
                                    id={key}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        )
                    ))}
                    <div className="mb-4 col-span-1 md:col-span-2">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={changePassword}
                                onChange={handleCheckboxChange}
                            />
                            <span className="ml-2">Cambiar Contraseña</span>
                        </label>
                    </div>
                    {changePassword && (
                        <>
                            <div className="mb-4 col-span-1 md:col-span-2">
                                <label htmlFor="current_password" className="block text-gray-700 font-medium mb-2">
                                    Contraseña Actual
                                </label>
                                <input
                                    type="password"
                                    id="current_password"
                                    name="current_password"
                                    value={formData.current_password}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4 col-span-1 md:col-span-2">
                                <label htmlFor="new_password" className="block text-gray-700 font-medium mb-2">
                                    Nueva Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="new_password"
                                    name="new_password"
                                    value={formData.new_password}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </>
                    )}
                </div>
                <button
                    type="submit"
                    className="text-white bg-custom-azul px-4 py-2 rounded-md hover:bg-custom-naranja transition duration-300"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default UsuarioInfo;
