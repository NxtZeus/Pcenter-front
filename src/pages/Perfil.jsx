import { useState, useEffect, useContext } from 'react';
import UsuarioInfo from '../components/usuarios/UsuarioInfo';
import UsuarioPedidos from '../components/usuarios/UsuarioPedidos';
import { fetchPedidos, getUsuario, updateUsuario } from '../components/apis/Api';
import { AuthContext } from '../components/auth/AuthContext';
import { Navigate } from 'react-router-dom';

const Perfil = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [usuario, setUsuario] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuarioData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const usuarioData = await getUsuario(token);
                    setUsuario(usuarioData);
                    const pedidosData = await fetchPedidos();
                    setPedidos(pedidosData);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarioData();
    }, [setIsLoggedIn]);

    const handleUpdateUsuario = async (updatedData) => {
        try {
            const updatedUsuario = await updateUsuario(updatedData);
            setUsuario(updatedUsuario);
        } catch (error) {
            console.error('Error al actualizar los datos del usuario:', error);
        }
    };

    if (!isLoggedIn && !loading) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container mt-4 mx-auto px-4 py-8 bg-gray-200 rounded-lg shadow-lg">
            {loading ? (
                <p>Loading...</p>
            ) : (
                usuario && (
                    <>
                        <UsuarioInfo usuario={usuario} onUpdateUsuario={handleUpdateUsuario} />
                        <UsuarioPedidos pedidos={pedidos} setPedidos={setPedidos} />
                    </>
                )
            )}
        </div>
    );
};

export default Perfil;
