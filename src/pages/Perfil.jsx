import { useState, useEffect, useContext } from 'react';
import InfoUsuario from '../components/usuarios/InfoUsuario';
import PedidosUsuario from '../components/usuarios/PedidosUsuario';
import { obtenerPedidos, obtenerUsuario, actualizarUsuario } from '../components/apis/Api';
import { AuthContext } from '../components/auth/AuthContext';
import { Navigate } from 'react-router-dom';

const Perfil = () => {
    const { estaLogueado, setEstaLogueado } = useContext(AuthContext);
    const [usuario, setUsuario] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);

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

    const manejarActualizarUsuario = async (datosActualizados) => {
        try {
            const usuarioActualizado = await actualizarUsuario(datosActualizados);
            setUsuario(usuarioActualizado);
        } catch (error) {
            console.error('Error al actualizar los datos del usuario:', error);
        }
    };

    if (!estaLogueado && !cargando) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container mt-4 mx-auto px-4 py-8 bg-gray-200 rounded-lg shadow-lg">
            {cargando ? (
                <p>Cargando...</p>
            ) : (
                usuario && (
                    <>
                        <InfoUsuario usuario={usuario} onActualizarUsuario={manejarActualizarUsuario} />
                        <PedidosUsuario pedidos={pedidos} setPedidos={setPedidos} />
                    </>
                )
            )}
        </div>
    );
};

export default Perfil;