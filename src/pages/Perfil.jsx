import { useState, useEffect, useContext } from 'react';
import InfoUsuario from '../components/usuarios/InfoUsuario';
import PedidosUsuario from '../components/usuarios/PedidosUsuario';
import { obtenerPedidos, obtenerUsuario, actualizarUsuario } from '../components/apis/Api';
import { AuthContext } from '../components/auth/AuthContext';
import { Navigate } from 'react-router-dom';

const Perfil = () => {
    // Contexto de autenticación para verificar si el usuario está logueado y establecer el estado de logueo
    const { estaLogueado, setEstaLogueado } = useContext(AuthContext);
    
    // Estados para manejar la información del usuario, pedidos, y estado de carga al obtener los datos del usuario y pedidos
    const [usuario, setUsuario] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Efecto para obtener datos del usuario y pedidos al montar el componente y actualizar los estados de usuario y pedidos
    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const datosUsuario = await obtenerUsuario(token);
                    setUsuario(datosUsuario);
                    const datosPedidos = await obtenerPedidos();
                    setPedidos(datosPedidos);
                    setEstaLogueado(true);
                } else {
                    setEstaLogueado(false);
                }
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
                setEstaLogueado(false);
            } finally {
                setCargando(false);
            }
        };

        obtenerDatosUsuario();
    }, [setEstaLogueado]);

    // Función para manejar la actualización de los datos del usuario y actualizar el estado del usuario con los datos actualizados al enviar el formulario de usuario con los nuevos datos ingresados por el usuario
    const manejarActualizarUsuario = async (datosActualizados) => {
        try {
            const usuarioActualizado = await actualizarUsuario(datosActualizados);
            setUsuario(usuarioActualizado);
        } catch (error) {
            console.error('Error al actualizar los datos del usuario:', error);
        }
    };

    // Redirige al usuario a la página de login si no está logueado y no está cargando
    if (!estaLogueado && !cargando) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container mb-8 mt-4 mx-auto px-4 py-8 bg-gray-200 rounded-lg shadow-lg">
            {cargando ? (
                <p>Cargando...</p>
            ) : (
                usuario && (
                    <>
                        {/* Componente para mostrar y actualizar la información del usuario */}
                        <InfoUsuario usuario={usuario} onActualizarUsuario={manejarActualizarUsuario} />
                        
                        {/* Componente para mostrar los pedidos del usuario */}
                        <PedidosUsuario pedidos={pedidos} setPedidos={setPedidos} />
                    </>
                )
            )}
        </div>
    );
};

export default Perfil;
